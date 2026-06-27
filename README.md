# Gomensensei AKB Fan Tools Hub | AKB48 Fan Tools Landing Page

![Version](https://img.shields.io/badge/Version-2026.06.28-pink)
![License](https://img.shields.io/badge/License-Non--Commercial-blue)
![Platform](https://img.shields.io/badge/Platform-Web-orange)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-ff69b4)

---

## Project Overview | 專案概要

**[ZH]**  
Gomensensei AKB Fan Tools Hub 係非官方 AKB48 fan-made 工具入口頁。  
佢負責將 ticket generator、penlight list、seatmap、資料筆記同 mini games 集中整理，令 fan 可以快速搵到需要嘅工具。  
呢個 repo 而家只維護兩個真正內容頁：`index.html` 同 `privacy.html`。其他 HTML 只係為舊連結保留 redirect，避免 404。

**[EN]**  
Gomensensei AKB Fan Tools Hub is an unofficial fan-made launcher for AKB48-related fan tools.  
It collects ticket-style images, penlight colors, seat references, data notes, and mini games under one compact entry point.  
Only `index.html` and `privacy.html` are real maintained content pages; other HTML files are redirects for old links.

---

## Features | 功能

### Compact Tool Launcher | 精簡工具入口

* **[ZH]** 首頁 hero、說明同 quick preview 已收細，手機版唔需要 scroll 好耐先見到工具。
* **[EN]** The hero, copy, and quick preview are compact so tools appear early on mobile.

### Visual Tool Cards | 圖像化工具卡

* **[ZH]** 每個工具卡都有細 infographic cue，方便一眼分辨 ticket、penlight、seatmap、data 同 games。
* **[EN]** Each tool card includes a small visual cue for quicker scanning.

### Fan-facing Notes | 一般 fan 會明嘅說明

* **[ZH]** 首頁只講用途、資料處理同聯絡方式，不再放技術架構重點。
* **[EN]** The page explains usage and data handling, not internal technical architecture.

### Account / Public Data Direction | 帳戶同公開資料方向

* **[ZH]** 私隱頁已寫明未來 seatmap、garapon 等工具可能支援開帳戶儲存自己資料；不記名公開資料必須係用戶主動 tick opt-in。
* **[EN]** The privacy page covers future account-saved seatmap/garapon data and opt-in anonymous public data.

---

## Quick Start | 快速開始

### Open Directly

1. Keep all project files in the same folder.
2. Open `index.html`.
3. Choose a language and open a tool.

### Local Server

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

---

## Built With | 使用技術

* HTML5
* CSS3
* JavaScript
* JSON i18n dictionary
* Static hosting compatible structure

---

## File Structure | 檔案結構

* `index.html`  
  **[ZH]** 主 landing page：hero、quick links、工具卡、使用前知道、contact anchor。  
  **[EN]** Main landing page: hero, quick links, tool cards, user notes, and contact anchor.

* `privacy.html`  
  **[ZH]** 唯一政策頁：關於、私隱、免責、未來帳戶資料同不記名公開資料說明。  
  **[EN]** Only maintained policy page: about, privacy, disclaimer, future account data, and anonymous public-data notes.

* `contact.html`, `guide.html`, `terms.html`, `about.html`, `disclaimer.html`, `updates.html`  
  **[ZH]** 舊連結 redirect stub，保留只係避免舊 URL 失效。  
  **[EN]** Redirect stubs kept only so old URLs do not break.

* `assets/css/core.css`  
  **[ZH]** 共用 base style。  
  **[EN]** Shared base styles.

* `assets/css/app.css`  
  **[ZH]** Landing page layout、tool cards、mobile density、infographic styles。  
  **[EN]** Landing layout, tool cards, mobile density, and infographic styles.

* `assets/js/app.js`  
  **[ZH]** 語言切換、右側 6 格工具入口 render、頁面文字注入。  
  **[EN]** Language switching, six-card launcher rendering, and page text injection.

* `assets/data/langs.json`  
  **[ZH]** 多語言文字、工具 URL、描述、visual key。  
  **[EN]** Translation text, tool URLs, descriptions, and visual keys.

* `sitemap.xml`  
  **[ZH]** 只列真正公開頁同工具 URL。  
  **[EN]** Lists only real public pages and tool URLs.

---

## Maintenance | 維護

### Updating Tool Links | 更新工具連結

Edit the `tools` array in:

```text
assets/data/langs.json
```

### Updating Text | 更新文字

Most page text lives in:

```text
assets/data/langs.json
```

### Updating Mobile Layout | 更新手機版

Mobile-specific rules are mainly in:

```text
assets/css/app.css
```

### Adding Google AdSense | 加入 Google 廣告

After AdSense approval, add the ownership meta tag to real pages:

```html
<meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxxxx">
```

Use top or bottom horizontal ad bars first. Do not place ads between the hero and tool cards unless testing shows it does not slow down tool access.

### Moving to a Custom Domain | 搬去自訂 domain

Update:

* `sitemap.xml`
* Open Graph URLs in HTML
* absolute URLs in `TOOL_FOOTER_SNIPPET.html`

---

## Disclaimer | 免責

**[ZH]**  
本專案係非官方、非商業 fan-made project，只供 fan creation、資料整理、個人紀錄同參考用途。  
本站與 AKB48、DH、場地、主辦、票務平台或任何官方組織無關。  
Ticket-style 圖片唔係真票、官方文件或入場證明；seatmap、penlight、MBTI 或其他資料只係 fan reference。

**[EN]**  
This project is an unofficial, non-commercial fan-made work for fan creation, information organisation, personal records, and reference use only.  
It is not affiliated with AKB48, DH, venues, organisers, ticketing platforms, or any official organisation.  
Ticket-style images are not real tickets, official documents, or entry passes. Seat maps, penlight colors, MBTI notes, and other data are fan references only.

---

## Created by | 製作

**gomensensei**

Contact: X / Twitter [`@sorrysir_gomen`](https://x.com/sorrysir_gomen)
