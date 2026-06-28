# Tool48 | AKB48 Theater Day Logbook & Fan Tools

![Version](https://img.shields.io/badge/Version-2026.06.28-pink)
![License](https://img.shields.io/badge/License-Non--Commercial-blue)
![Platform](https://img.shields.io/badge/Platform-Web-orange)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-ff69b4)

---

## Project Overview | 項目概覽

**[ZH]**  
Tool48 是非官方 AKB48 fan-made 工具入口頁，定位為 **AKB48 Theater Day Logbook & Fan Tools**。  
首頁集中整理劇場日前後常用工具：Penlight List、Garapon Log、Seatmap、Ticket Generator、MBTI Test 及 Mini Games。  
本 repo 的 Phase 0 只處理公開 landing page、語言文字、導覽及靜態頁面整理，不加入登入、Supabase 或帳戶功能。

**[EN]**  
Tool48 is an unofficial AKB48 fan-made tools hub positioned as **AKB48 Theater Day Logbook & Fan Tools**.  
The homepage collects six theater-day tools: Penlight List, Garapon Log, Seatmap, Ticket Generator, MBTI Test, and Mini Games.  
Phase 0 is a static front-end hub update only; it does not add login, Supabase, or account features.

---

## Highlights | 重點

### 1. Theater Day Flow | 劇場日流程

* **[ZH]** 首頁按一般 fan 的使用場景排列：公演前查應援色、劇場附近記錄 Garapon、等候時使用 MBTI 或小遊戲、入場後保存座位、完場後製作紀念票券。
* **[EN]** The homepage explains tools by real theater-day moments instead of internal architecture.

### 2. Six Direct Tool Cards | 六格直接入口

* **[ZH]** Hero 右側直接顯示六個工具入口，每格都有對應 infographic icon，不再另設大型下方清單。
* **[EN]** The hero contains six direct tool cards with tool-specific infographic icons.

### 3. Multi-language Hub | 多語言入口

* **[ZH]** Hub 支援 `zh-HK`、`ja`、`en`、`ko`。繁體中文使用正式書面語，不使用廣東話口語。
* **[EN]** The hub supports `zh-HK`, `ja`, `en`, and `ko`. Traditional Chinese copy is written in formal written style.

### 4. Privacy Direction | 私隱與資料方向

* **[ZH]** 現階段工具維持免登入。日後 seatmap、garapon 或其他工具可能支援帳戶保存個人資料；不記名公開統計或社群參考資料必須由用戶主動 opt-in。
* **[EN]** Current tools remain usable without login. Future account-saved records and anonymous public stats must be clearly explained and opt-in.

---

## Public Tool URLs | 公開工具 URL

These paths are intentionally preserved:

* `/penlightlist/`
* `/akb-garapon/`
* `/akb-seatmap/`
* `/48-ticket-generator/`
* `/AKB-MBTI-with-wota/`
* `/akb_mini_games_2026/`

---

## Quick Start | 快速開始

### Open Directly

1. Keep all files in the same folder.
2. Open `index.html`.
3. Choose a language and select a tool.

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
* Vanilla JavaScript
* JSON i18n dictionary
* Static hosting compatible structure

---

## File Structure | 檔案結構

* `index.html`  
  **[ZH]** 主要 landing page：header、hero、六格工具入口、劇場日 timeline、重要說明、資料方向、聯絡及 footer。  
  **[EN]** Main landing page: header, hero, six tool cards, theater-day timeline, notice, data direction, contact, and footer.

* `privacy.html`  
  **[ZH]** 唯一維護的說明頁，合併關於、免責、私隱、日後帳戶資料及 opt-in 公開資料方向。  
  **[EN]** Maintained policy page combining about, disclaimer, privacy, future account data, and opt-in public-data direction.

* `about.html`, `contact.html`, `guide.html`, `terms.html`, `disclaimer.html`, `updates.html`  
  **[ZH]** 舊 URL redirect stub，保留是為了避免舊連結 404。  
  **[EN]** Redirect stubs kept so old links do not break.

* `assets/data/langs.json`  
  **[ZH]** 多語言文字、工具名稱、工具 URL、timeline 及資料方向內容。  
  **[EN]** Translation text, tool names, URLs, timeline, and data-direction content.

* `assets/js/app.js`  
  **[ZH]** 語言切換、六格工具入口、timeline、私隱重點及內容頁 render。  
  **[EN]** Language switching and rendering for tool cards, timeline, privacy points, and policy body.

* `assets/css/core.css`  
  **[ZH]** 共用背景、基礎 UI、互動效果及 native-feel 設定。  
  **[EN]** Shared background, base UI, interaction effects, and native-feel settings.

* `assets/css/app.css`  
  **[ZH]** Hub 專用 layout、工具 infographic、mobile density 及 header 穩定處理。  
  **[EN]** Hub layout, tool infographics, mobile density, and header stability styles.

---

## Maintenance | 維護

### Updating Tool Links | 更新工具連結

Edit the `tools` array in:

```text
assets/data/langs.json
```

Keep the existing public URLs unless there is a planned redirect.

### Updating Text | 更新文字

Most page text lives in:

```text
assets/data/langs.json
```

### Updating Mobile Layout | 更新手機版 layout

Mobile-specific rules are mainly in:

```text
assets/css/app.css
```

### Adding Google AdSense | 加入 Google AdSense

After AdSense approval, add the ownership meta tag to maintained pages:

```html
<meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxxxx">
```

Use top or bottom horizontal ad bars first. Avoid placing ads between the hero and the six tool cards.

### Moving to a Custom Domain | 遷移至自訂 domain

When moving from GitHub Pages to a custom domain such as `tool48.com`, update:

* `sitemap.xml`
* Open Graph URLs in HTML
* absolute links in `TOOL_FOOTER_SNIPPET.html`
* any future canonical URL settings

---

## Phase Notes | 階段說明

### Phase 0

* Static hub only
* No login wall
* No Supabase integration
* No account creation
* Existing tool URLs preserved

### Future Phase

* Optional accounts may be added
* Seatmap, Garapon, and other tools may support saved personal records
* Anonymous public stats must be explicit opt-in
* Existing no-login tool use should remain available where possible

---

## Disclaimer | 免責說明

**[ZH]**  
本項目是非官方、非商業 fan-made project，只供 fan 創作、資料整理、個人紀錄及參考用途。  
本站與 AKB48、DH、場地、主辦單位、票務平台或任何官方機構無關。  
票券風圖片並非真實票券、官方文件或入場憑證；座位圖、penlight 顏色、MBTI 筆記及其他資料均屬 fan reference。

**[EN]**  
This project is an unofficial, non-commercial fan-made work for fan creation, information organisation, personal records, and reference use only.  
It is not affiliated with AKB48, DH, venues, organisers, ticketing platforms, or any official organisation.  
Ticket-style images are not real tickets, official documents, or entry passes. Seat maps, penlight colors, MBTI notes, and other data are fan references only.

---

## Created by | 製作

**Gomensensei**

Contact: X / Twitter [`@sorrysir_gomen`](https://x.com/sorrysir_gomen)
