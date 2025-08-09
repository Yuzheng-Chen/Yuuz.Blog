import rss from "@astrojs/rss";
import { getSortedPosts } from "@utils/content-utils";
import { url as toUrl } from "@utils/url-utils";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { siteConfig } from "@/config";

const md = new MarkdownIt();

function stripInvalidXmlChars(str: string): string {
	return str.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: https://www.w3.org/TR/xml/#charsets
		/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]/g,
		"",
	);
}

export async function GET(context: APIContext) {
	const blog = await getSortedPosts();
	const site = String(context.site ?? "https://yuuz.blog");

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site,
		items: blog.map((post) => {
			const pageLink = toUrl(`/posts/${post.slug}/`);
			const contentRaw =
				typeof post.body === "string" ? post.body : String(post.body || "");
			const html = md.render(stripInvalidXmlChars(contentRaw));

			// 允许图文 HTML，并把 <img> 的相对路径改为绝对路径
			const sanitized = sanitizeHtml(html, {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat([
					"figure",
					"figcaption",
					"div",
					"span",
					"section",
					"picture",
					"source",
					"img",
				]),
				allowedAttributes: {
					...sanitizeHtml.defaults.allowedAttributes,
					// 允许常见属性
					img: [
						"src",
						"alt",
						"title",
						"width",
						"height",
						"loading",
						"decoding",
						"srcset",
						"sizes",
					],
					figure: ["class", "id"],
					figcaption: ["class", "id"],
					div: ["class", "id"],
					span: ["class", "id"],
					section: ["class", "id"],
					picture: ["class"],
					source: ["srcset", "sizes", "type", "media"],
				},
				// 把 <img> 的 src 变成绝对地址
				transformTags: {
					img: (tagName, attribs) => {
						try {
							const src = attribs.src || "";
							// 以 http(s) 或 data: 开头的保持不变；其它都按“相对文章页链接”解析
							if (src && !/^(https?:|data:)/.test(src)) {
								const abs = new URL(src, new URL(pageLink, site)).toString();
								return { tagName, attribs: { ...attribs, src: abs } };
							}
						} catch {
							// 忽略解析错误，按原样返回
						}
						return { tagName, attribs };
					},
				},
			});

			return {
				title: post.data.title,
				pubDate: post.data.published,
				description: post.data.description || "",
				link: pageLink,
				content: sanitized, // 保留 figure/figcaption 等 HTML
			};
		}),
		customData: `<language>${siteConfig.lang}</language>`,
	});
}
