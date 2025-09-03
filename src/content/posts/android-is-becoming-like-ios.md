---
title: 当 Android 开始长得越来越像 iOS...
published: 2025-09-03
description: 震惊！Google 宣布自 2026 年起，Android 认证设备上安装的所有应用都必须来自实名验证的开发者...
image: ./imgs/20250903-1.png
tags:
  - 科技
category: 思考
draft: false
---

最近看 Google 这几年的新闻，越来越有一种“门越关越严”的感觉：一个以“开放”起家的系统，正在把自由变成选配，把限制写进默认。继 [AOSP](https://source.android.com/docs/core/ota/ab) 的核心能力逐步转向闭源 GMS（FCM、Fused Location、[Play Integrity](https://developer.android.com/google/play/integrity)）、系统 API 持续收紧、[Project Mainline](https://source.android.com/docs/core/ota/modular-system) 把系统模块纳入 Play 更新、以及 Play Integrity 成为事实“通行证” 以来，Google 又补上了一道门闩：

以往在 Android 上装未经验证的 APK，系统会弹出一个警告：“来源不明的应用可能有风险”。你只要在系统里允许，就依旧能安装。这一直以来是 Android 相比 iOS 的一个很大的优势。但是从 **2026 年开始**，Google 觉得光提醒不够了，它要替你做决定：**系统层面会直接限制**——只有“**通过实名验证**”的开发者签名才能被安装器放行，别的通通不行。先在 **巴西、印尼、新加坡、泰国** 落地，随后扩到全球。[^1]

Google 的官方说法是提升安全、方便追责；但实际上呢，你说是为什么呢 🤔

---

## 这个改变会影响到什么人

- 🕵️**匿名 / 业余开发者**  
   很多开源软件的开发者并不愿意透露身份。但在新规之后，如果他们的软件想要被别人使用，就只能：要么交证件、承担隐私与合规风险，要么**失去在认证设备上的分发能力**。受制裁地区的作者甚至可能被卡在门外。
- 📦**F-Droid 生态**  
   F-Droid 是一个开源版本的 Google Play Store，提供很多开源软件的下载和更新。但上面的许多 App 没有“已验证开发者”的签名。在新规之后，这类软件基本就被判了死刑，用户即使愿意自担风险，也装不进去。[F-Droid 的论坛](https://forum.f-droid.org/t/google-will-require-developer-verification-to-install-android-apps-including-sideloading/33123)的讨论已经吵翻了。
- 🚫 **“灰色软件”与去广告工具**  
   像 **NewPipe/PipePipe**（第三方 YouTube/Bilibili 客户端）、**ReVanced**（YouTube 去广告补丁）、**AdAway**（系统级去广告），以及自己用 LSPatch 打包的 TikTok 破解版，本来就和平台条款冲突。想在官方生态拿“合法签名”？几乎不可能。
- 👤**普通用户**  
   表面上更安全；现实是**自由变少**。就算你只使用 Play Store 的软件，但比如朋友发你一个小工具，或者自己写了一个小游戏想测试，如果你或你的朋友没有花 25 美元注册一个开发者账号，你也没法安装使用。

---

## 一些可能的“绕过方法”

- ✍️**自己签、自己用**
  **Play [开发者账号](https://support.google.com/googleplay/android-developer/answer/6112435)一次性 25 美元**。理论上，你可以用自己的账号把开源 App **本地重签名**，再在自己的手机上装：满足“已验证开发者”的安装要求，又不用把私钥交给任何第三方。
- 🤝**代理人代签**
  社区有人提议由志愿者/机构用实名账号帮匿名项目签名。技术上可行，但风险集中在代理人身上：一旦某个 App 触雷，账号被封，这个账号签名的所有应用都会瞬间失效。
- 🚀**把手机“去 Google 化”**
  这套规则只对**Google 认证设备**生效（带 Play 服务、通过兼容性测试的那类）。刷第三方 ROM（LineageOS、GrapheneOS、CalyxOS）或使用本就不含 GMS 的设备，就**不受此限**。

---

## 如果那一天真的到来

因为现在新规还没生效，所以我现在还在观望，说不定未来会有变化。对我来说，像是 PipePipe 这一类的软件都是我必备的软件。假如这套机制落到我所在地区、彻底影响我的用机方式，我会动手换 ROM。

我现在用的手机是一台 Pixel 9a，Pixel 刷机相对来说算是比较容易的：解锁/回刷流程成熟、社区体量大、文档齐全。很多第三方 ROM 都优先支持 Pixel。

**我考虑的 ROM 大致有三类：**

- **[GrapheneOS](https://grapheneos.org/releases)**：我的首选。安全隐私取向，提供“**沙箱化的 Google Play**”（当普通 App 用，用完能卸）。**OTA 更新**走 A/B 无缝机制，节奏快且稳。此外它对 Pixel 支持非常好，eSIM 和相机都能正常用。
- **[CalyxOS](https://calyxos.org/)**：隐私友好，但兼容性更照顾日常用户。
- **[LineageOS](https://lineageos.org/)**：机型覆盖广，个性化强；具体到 eSIM/相机等细节，要看机型维护质量。

---

总之，Android 不是一天变成今天这样的。AOSP 没有“关门”，但门把手的权力正在集中。如果你也在意这个变化，不妨先从一次认真备份开始；当你发现“安装”的权利轮不到你做主时，或许就是该换 ROM 的时候了。

[^1]: [Android Developers Blog: A new layer of security for certified Android devices](https://android-developers.googleblog.com/2025/08/elevating-android-security.html)
