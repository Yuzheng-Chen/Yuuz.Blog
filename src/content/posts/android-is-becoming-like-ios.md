---
title: 就连 Android 也开始慢慢变得封闭，以及可能的应对办法
published: 2025-09-03
description: 震惊！Google 宣布自 2026 年起，Android 认证设备上安装的所有应用都必须来自实名验证的开发者（
image: ./imgs/20250903-1.png
tags:
  - 科技
category: 思考
draft: false
---
以往，在 Android 上安装未经验证的 APK，系统警告你来源不明的应用可能有风险，但是只要勾选允许，还是可以安装。这一直以来是 Android 相比 iOS 的一个很大的优势，也是 Android 起家的资本。

但是从 2026 年开始，Google 觉得光提醒你还不够，它还打算替你做决定：系统层面会直接进行限制，使得只有“通过实名验证”的开发者开发的 App 才能被用户安装，先在巴西、印尼、新加坡、泰国落地，随后扩到全球。[^1]

如果真的最后在全球推行，那这将是继 [AOSP](https://source.android.com/docs/core/ota/ab) 的核心能力逐步转向闭源 GMS（FCM、Fused Location、[Play Integrity](https://developer.android.com/google/play/integrity)）、系统 API 持续收紧、[Project Mainline](https://source.android.com/docs/core/ota/modular-system) 把系统模块纳入 Play 更新，以及 Play Integrity 成为事实“通行证”以来，Google 又补上的一道门闩。

Google 的官方说法是提升安全、方便追责；但实际上呢，你说是为什么呢 🤔

## 这个改变会影响到什么人

- 🕵️ **匿名 / 业余开发者**  
  很多开源软件的开发者并不愿意透露身份。但在新规之后，如果他们想要自己的软件被别人使用，就只能要么向验证妥协，交出自己的隐私，要么就只能放弃传播性，转战一些更开放的小众系统做开发，或是甚至放弃自己的项目。

- 📦 **F-Droid 生态**  
  [F-Droid](https://f-droid.org/en/) 是一个开源版本的 Google Play Store，提供很多开源软件的下载和更新。但上面的许多 App 没有“已验证开发者”的签名。在新规之后，这类软件基本就被判了死刑，用户即使愿意自担风险，也装不进去。[F-Droid 的论坛](https://forum.f-droid.org/t/google-will-require-developer-verification-to-install-android-apps-including-sideloading/33123) 的讨论已经吵翻了。  
  P.s. 今天发现 F-Droid 的网页上放了 [Keep Android Open](https://keepandroidopen.org/) 网站的链接，号召大家一起反对 Google 对 Android 应用安装的收紧。

- 🚫 **“灰色软件”与去广告工具**  
  像 **NewPipe / PipePipe**（第三方 YouTube / Bilibili 客户端）、**ReVanced**（YouTube 去广告补丁）、**AdAway**（系统级去广告），以及自己用 [LSPatch](https://github.com/LSPosed/LSPatch) 打包的 TikTok 破解版，本来就和平台条款冲突。想在官方生态拿“合法签名”？想得美。

- 👤 **普通用户**  
  看上去好像更安全了。不过就算你只使用 Play Store 的软件，但比如朋友发你一个小工具，或者自己写了一个小游戏想测试，如果你或你的朋友没有花 25 美元注册一个开发者账号，你也没法安装使用。

## 社区可能如何应对

那么既然这个新规影响这么广泛，那社区总会有一些应对措施。以下是我想到的一些可能性：

- ✍️ **自己签、自己用**  
  **Play [开发者账号](https://support.google.com/googleplay/android-developer/answer/6112435) 一次性 25 美元**。理论上，你可以用自己的账号把开源 App **本地重签名**，再在自己的手机上装：满足“已验证开发者”的安装要求，又不用把私钥交给任何第三方，不过需要自己承担被封账户的风险。

- 🤝 **代理人代签**  
  社区有人提议由志愿者 / 机构用实名账号帮匿名项目签名。技术上可行，但风险集中在代理人身上：一旦某个 App 触雷，账号被封，这个账号签名的所有应用都会瞬间失效。

- 🚀 **把手机“去 Google 化”**  
  这应该是最好、也是最后的办法了。这套规则只会对 **Google 认证设备** 生效（带 Play 服务、通过兼容性测试的那类）。刷第三方 ROM（LineageOS、GrapheneOS、CalyxOS）或使用本就不含 GMS 的设备，就 **不受此限**。

## 如果那一天真的到来

因为现在新规还没生效，所以我现在还在观望，说不定未来会有变化。对我来说，像 PipePipe 这一类的软件都是我必备的软件。所以假如这套机制落到我这儿、彻底影响我的用机方式，我也许会考虑刷 ROM。

好在我现在用的手机是一台 Pixel 9a 和一台小米 14 Pro。Pixel 刷机相对来说算是比较容易的：解锁 / 回刷流程成熟、社区体量大、文档齐全。很多第三方 ROM 都优先支持 Pixel。

**我考虑的 ROM 大致有三类：**

- **[GrapheneOS](https://grapheneos.org/releases)**：我的首选。安全隐私取向，提供“**沙箱化的 Google Play**”（当普通 App 用，用完能卸）。**OTA 更新**走 A/B 无缝机制，节奏快且稳。此外它对 Pixel 支持非常好，eSIM 和相机都能正常用。

- **[CalyxOS](https://calyxos.org/)**：隐私友好，但兼容性更照顾日常用户。

- **[LineageOS](https://lineageos.org/)**：机型覆盖广，个性化强；具体到 eSIM / 相机等细节，要看机型维护质量。

而我的另一台小米 14 Pro，就留着回国的时候当国内备用机吧。

我 Pixel 里面因为资安疑虑没有装任何的国产软件，但是身为中国人，很多时候还是不得不面对强制登录、强制使用 App 的场合，还有因为各种原因没有办法离开的微信。这些就统统物理隔离在我的国产手机里就好。

什么，你说你想刷机小米手机？那还是先想想怎么应对有关部门的 [威胁](https://web.archive.org/web/20260313185539/https://nitter.tiekoetter.com/whyyoutouzhele/status/2032222607224029378#m) 吧。

---

总之，Android 不是一天变成今天这样的。如果你也在意这个变化，不妨先从一次认真备份开始；当你发现“安装”的权利轮不到你做主时，或许就是该换 ROM 的时候了。

[^1]: [Android Developers Blog: A new layer of security for certified Android devices](https://android-developers.googleblog.com/2025/08/elevating-android-security.html)