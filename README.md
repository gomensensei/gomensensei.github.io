# Gomensensei AKB Fan Tools Hub | AKB48 Fan Tools Landing Page | AKB48 Fan Tools Hub

![Version](https://img.shields.io/badge/Version-2026.06.28-pink)
![License](https://img.shields.io/badge/License-Non--Commercial-blue)
![Platform](https://img.shields.io/badge/Platform-Web-orange)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-ff69b4)

---

## Project Overview | 專案概要 | プロジェクト概要

**[ZH]**  
Gomensensei AKB Fan Tools Hub 係一個非官方 AKB48 fan-made 工具入口頁。  
呢個頁面負責將票券風圖片、penlight 顏色、seatmap、資料筆記同小遊戲集中整理，令 fan 可以用手機或 desktop 快速搵到需要嘅工具。  
佢唔係技術展示頁，而係之後搬去 custom domain、加入 Google 廣告位、同整合多個 fan tools 前嘅主入口。

**[EN]**  
Gomensensei AKB Fan Tools Hub is an unofficial fan-made landing page for AKB48-related fan tools.  
It collects ticket-style image generation, penlight color references, seat map tools, data notes, and mini games under one clear entry point.  
The page is designed as a fan-facing launcher, not as a technical architecture showcase.

**[JP]**  
Gomensensei AKB Fan Tools Hub は、AKB48 ファン向け非公式ツールの入口ページです。  
チケット風画像、ペンライト色、座席参考、データメモ、ミニゲームをひとつの場所にまとめています。  
公式情報ではなく、ファン活動と個人利用のためのハブです。

---

## Technical Highlights | 技術重點 | 技術ポイント

### 1. Compact Fan-facing Landing Page | 精簡首頁 | コンパクトな入口

* **[ZH]** 首頁縮短 hero 高度，手機版第一屏已經可以見到工具入口，避免成頁都係大標題同大空位。
* **[EN]** The hero area is kept compact so tool access appears early, especially on mobile.
* **[JP]** モバイルでも早い段階でツール入口が見えるよう、ヒーロー部分を短くしています。

### 2. Clickable Quick Tool Preview | 可點擊工具預覽 | クリック可能なプレビュー

* **[ZH]** 原本似 window 裝飾嘅區塊已改成真 quick links，避免用戶以為可以㩒但冇反應。
* **[EN]** The decorative preview tiles now work as real quick links.
* **[JP]** 装飾だけに見えるプレビューを、実際に押せるリンクに変更しています。

### 3. Infographic Tool Cards | 圖像化工具卡 | ビジュアル付きカード

* **[ZH]** 每張工具卡有獨立 infographic hint，唔再淨係靠大按鈕同文字描述。
* **[EN]** Each tool card includes a small visual cue so the purpose is easier to scan.
* **[JP]** 各ツールカードに小さな視覚ヒントを追加しています。

### 4. Combined About, Privacy, and Disclaimer | 合併說明頁 | 説明ページ統合

* **[ZH]** 「關於」、「私隱」、「免責」集中到 `privacy.html`，減少重複頁面同導覽負擔。
* **[EN]** About, privacy, and disclaimer wording are combined into a single page.
* **[JP]** About、Privacy、Disclaimer をひとつのページにまとめています。

### 5. Future Data Direction | 未來資料方向 | 今後のデータ方針

* **[ZH]** 私隱文案已預留未來 account、seatmap、garapon、個人資料儲存同不記名公開資料 opt-in 嘅方向。
* **[EN]** The privacy copy now leaves room for future accounts, saved user data, and opt-in anonymous public data.
* **[JP]** 将来のアカウント機能、保存データ、匿名公開データの opt-in を想定した表現にしています。

---

## Features | 功能 | 機能

### Tool Launcher | 工具入口 | ツール入口

* **[ZH]** 集中連去現有工具 URL，包括 ticket generator、penlight list、seatmap、MBTI/data notes 同 mini games。
* **[EN]** Links to the existing public tool URLs without breaking shared links.
* **[JP]** 既存の公開ツール URL を維持したまま、入口を整理しています。

### Multi-language UI | 多語言介面 | 多言語 UI

* 繁中
* English
* 日本語
* 한국어

### Mobile-first Layout | 手機優先排版 | モバイル優先

* **[ZH]** 工具卡、導覽、hero、notice 都重新壓縮，手機上唔需要 scroll 太深先開始用。
* **[EN]** Header, hero, notice, and cards are tuned for quick mobile scanning.
* **[JP]** モバイルで素早く使えるよう、各セクションを詰めています。

### AdSense-ready Placement | 廣告位預備 | 広告配置対応

* **[ZH]** README 同頁面 head 保留 AdSense ownership meta 加入位置；將來建議用頁面上方或下方橫向廣告 bar，唔阻擋工具入口。
* **[EN]** The layout is prepared for future top or bottom horizontal ad bars.
* **[JP]** 今後の広告バー追加を想定した構成です。

---

## Quick Start | 快速開始 | クイックスタート

### Open Directly | 直接打開 | 直接開く

1. Keep all project files in the same folder.
2. Open `index.html`.
3. Choose a language and open a tool.

### Local Server | 本機測試 | ローカルサーバー

If browser behavior differs when opening local files directly, start a simple server inside the project folder:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

---

## Built With | 使用技術 | 使用技術

* HTML5
* CSS3
* JavaScript
* JSON i18n dictionary
* Static GitHub Pages / custom-domain compatible structure
* Pure front-end architecture

---

## File Structure | 檔案結構 | ファイル構成

* `index.html`  
  **[ZH]** 主 landing page、hero、quick links、工具列表同 fan-facing notice。  
  **[EN]** Main landing page, hero, quick links, tool list, and fan-facing notice.  
  **[JP]** メイン入口ページ、ヒーロー、クイックリンク、ツール一覧。

* `guide.html`  
  **[ZH]** 簡短使用指南，解釋各類工具嘅用途同分享注意事項。  
  **[EN]** Short usage guide for public users.  
  **[JP]** 簡単な使い方ガイド。

* `privacy.html`  
  **[ZH]** 合併關於、私隱同免責說明。  
  **[EN]** Combined about, privacy, and disclaimer page.  
  **[JP]** About、Privacy、Disclaimer をまとめたページ。

* `terms.html`  
  **[ZH]** 使用條款。  
  **[EN]** Terms of use.  
  **[JP]** 利用規約。

* `contact.html`  
  **[ZH]** 聯絡方式，只保留 X / Twitter: `@sorrysir_gomen`。  
  **[EN]** Contact page with X / Twitter DM only.  
  **[JP]** 連絡先ページ。

* `about.html`, `disclaimer.html`, `updates.html`  
  **[ZH]** 舊連結 redirect，避免舊 URL 失效。  
  **[EN]** Redirect pages kept for old links.  
  **[JP]** 古いリンク用のリダイレクト。

* `assets/css/core.css`  
  **[ZH]** 共用背景、glass effect、hover feel 同 base UI。  
  **[EN]** Shared base UI, background, glass effects, and motion feel.  
  **[JP]** 共通 UI ベース。

* `assets/css/app.css`  
  **[ZH]** landing page 專用排版、工具卡、mobile density 同 infographic styles。  
  **[EN]** Landing-page layout, tool cards, mobile density, and infographic styles.  
  **[JP]** ランディングページ専用スタイル。

* `assets/js/core.js`  
  **[ZH]** 共用 ripple、glass interaction、canvas helper 等 UI 行為。  
  **[EN]** Shared interaction helpers and UI effects.  
  **[JP]** 共通インタラクション処理。

* `assets/js/app.js`  
  **[ZH]** 語言切換、工具卡 render、導覽狀態同頁面內容注入。  
  **[EN]** Language switching, tool-card rendering, active navigation, and page text rendering.  
  **[JP]** 言語切替、カード描画、ページ文言の反映。

* `assets/data/langs.json`  
  **[ZH]** 多語言文字、工具 URL、工具描述同 card visual key。  
  **[EN]** Translation text, tool URLs, descriptions, and card visual keys.  
  **[JP]** 翻訳文言、ツール URL、説明文。

* `sitemap.xml`  
  **[ZH]** 搜尋引擎用 sitemap，只保留主要公開頁同工具 URL。  
  **[EN]** Sitemap for the main public pages and tools.  
  **[JP]** 主要公開ページ用 sitemap。

* `TOOL_FOOTER_SNIPPET.html`  
  **[ZH]** 可貼落其他工具頁嘅共用 footer snippet。  
  **[EN]** Shared footer snippet for separate tool pages.  
  **[JP]** 他ツール用の共通 footer snippet。

---

## Maintenance | 維護 | メンテナンス

### Updating Tool Links | 更新工具連結 | ツールリンク更新

* **[ZH]** 修改 `assets/data/langs.json` 入面每個語言嘅 `tools` array，保持 `url` 一致。
* **[EN]** Edit the `tools` array in `assets/data/langs.json`.
* **[JP]** `assets/data/langs.json` の `tools` 配列を更新します。

### Updating Text | 更新文字 | 文言更新

* **[ZH]** 主要文字都喺 `assets/data/langs.json`，HTML 只保留 fallback。
* **[EN]** Most page text lives in `assets/data/langs.json`; HTML contains fallback text.
* **[JP]** 主な文言は `assets/data/langs.json` にあります。

### Updating Mobile Layout | 更新手機版 | モバイル調整

* **[ZH]** 手機版主要喺 `assets/css/app.css` 嘅 `@media (max-width: 680px)`。
* **[EN]** Mobile-specific rules are mainly under `@media (max-width: 680px)` in `assets/css/app.css`.
* **[JP]** モバイル調整は主に `assets/css/app.css` の media query です。

### Adding Google AdSense | 加入 Google 廣告 | AdSense 追加

After AdSense approval, add the ownership meta tag to each real page:

```html
<meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxxxx">
```

* **[ZH]** 建議先放上方或下方 horizontal ad bar，唔好插喺 hero 同工具列表中間，以免阻住工具入口。
* **[EN]** Prefer top or bottom horizontal ad bars so the launcher remains easy to use.
* **[JP]** ツール入口を邪魔しない上部または下部の横長広告が無難です。

### Moving to a Custom Domain | 搬去自訂 domain | カスタムドメイン移行

* **[ZH]** 搬 domain 時要同步更新 `sitemap.xml`、OG URL、footer snippet 入面嘅 absolute links。
* **[EN]** When moving domains, update `sitemap.xml`, Open Graph URLs, and absolute footer links.
* **[JP]** ドメイン移行時は sitemap、OG URL、footer の絶対リンクを更新します。

---

## Disclaimer | 免責聲明 | 免責

**[ZH]**  
本專案係非官方、非商業 fan-made project，只供 fan creation、資料整理、個人紀錄同參考用途。  
本站與 AKB48、DH、場地、主辦、票務平台或任何官方組織無關。  
Ticket-style 圖片唔係真票、官方文件或入場證明；seatmap、penlight、MBTI 或其他資料只係 fan reference。  
所有名稱、商標、圖片、標誌及相關權利屬於各自權利人。

**[EN]**  
This project is an unofficial, non-commercial fan-made work for fan creation, information organisation, personal records, and reference use only.  
It is not affiliated with, endorsed by, partnered with, or representative of AKB48, DH, venues, organisers, ticketing platforms, or any official organisation.  
Ticket-style images are not real tickets, official documents, or entry passes. Seat maps, penlight colors, MBTI notes, and other data are fan references only.  
All names, trademarks, logos, images, and related rights belong to their respective rights holders.

**[JP]**  
このプロジェクトは非公式・非商業の fan-made project です。  
AKB48、DH、会場、主催、チケットサービス、その他公式組織とは関係ありません。  
チケット風画像は本物のチケットや公式書類ではありません。  
名称、商標、画像、ロゴなどの権利は各権利者に帰属します。

---

## Created by | 製作 | 制作

**gomensensei**

Contact: X / Twitter [`@sorrysir_gomen`](https://x.com/sorrysir_gomen)

---

## Note | 備註 | ノート

**[ZH]**  
呢個唔只係一個 landing page。  
佢係所有小工具嘅入口，亦係之後 custom domain、廣告、account、seatmap、garapon 同更多 fan utilities 可以慢慢接上去嘅地方。

**[EN]**  
This is more than a landing page.  
It is the front door for the fan tools, and the place where future custom-domain hosting, ads, accounts, seatmap records, garapon logs, and more fan utilities can connect.

**[JP]**  
これは単なるランディングページではありません。  
今後のツール、カスタムドメイン、広告、アカウント機能、seatmap、garapon をつなぐ入口です。
