# Tool48 | AKB48 Theater Day Logbook & Fan Tools

![Version](https://img.shields.io/badge/Version-2026.07.03-pink)
![License](https://img.shields.io/badge/License-Non--Commercial-blue)
![Platform](https://img.shields.io/badge/Platform-Web-orange)
![Account](https://img.shields.io/badge/Tool48%20Account-Optional-lightblue)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-ff69b4)

---

## Project Overview | 專案簡介 | プロジェクト概要

**[ZH]** Tool48 是非官方 AKB48 Theater Day fan tools hub。它把出發前 check 出場名單、劇場 garapon 紀錄、抽選後座位備忘、等候時 MBTI / mini games、以及生誕祭紀念 ticket 連成一條 theater-day timeline。

**[EN]** Tool48 is an unofficial AKB48 theater-day fan tools hub. It connects the fan journey: check cast lists before leaving, log garapon at the theater, save seat results after entry draw, play MBTI / mini games while waiting, and create birthday-show ticket memories.

**[JP]** Tool48 は AKB48 劇場日のための非公式ファンツール hub です。出発前の出演リスト確認、劇場でのガラポン記録、座席メモ、待機中の MBTI / mini games、生誕祭の記念 ticket までを theater-day timeline としてつなぎます。

---

## Main Features | 功能說明 | 主な機能

### 1. Theater Day Timeline
* **[ZH]** 以真實使用場景排列工具：出發前、到達劇場、抽選後、等候/未中選、生誕祭/回憶。
* **[EN]** Organizes tools by real fan moments: before leaving, at the theater, after seat draw, waiting/no win, and birthday/memory.
* **[JP]** 出発前、劇場到着、座席抽選後、待機/落選時、生誕祭/思い出という実際の流れでツールを整理します。

### 2. Direct Tool Cards
* **[ZH]** 首頁提供 Penlight、Garapon、Seatmap、Ticket、MBTI、Mini Games 入口，每張卡都有對應 infographic。
* **[EN]** The homepage links directly to Penlight, Garapon, Seatmap, Ticket, MBTI, and Mini Games with tool-specific infographics.
* **[JP]** Penlight、Garapon、Seatmap、Ticket、MBTI、Mini Games へ直接移動できる infographic card を表示します。

### 3. Optional Tool48 Account Dashboard
* **[ZH]** 登入後可在 hub 預覽已保存資料摘要，例如應援名單、garapon、座位、ticket slots 與遊戲進度。
* **[EN]** Signed-in users can preview saved summaries such as penlight lists, garapon records, seat memos, ticket slots, and game progress.
* **[JP]** ログイン後は、ペンライトリスト、ガラポン記録、座席メモ、ticket slots、ゲーム進行の概要を hub で確認できます。

### 4. Local-first Principle
* **[ZH]** 所有工具仍可免登入使用。Tool48 Account 只作可選雲端保存、跨裝置備份與 dashboard 摘要。
* **[EN]** Every tool remains usable without login. Tool48 Account only adds optional cloud save, cross-device backup, and dashboard previews.
* **[JP]** 全ツールはログインなしで利用できます。Tool48 Account は任意の cloud save、端末間 backup、dashboard preview のためだけに使います。

---

## Public Tool URLs | 公開工具 URL | 公開 URL

These paths are intentionally preserved:

* `/penlightlist/`
* `/akb-garapon/`
* `/akb-seatmap/`
* `/48-ticket-generator/`
* `/AKB-MBTI-with-wota/`
* `/akb_mini_games_2026/`

---

## Technical Highlights | 技術亮點 | 技術的特徴

* **JSON-driven i18n**: `assets/data/langs.json` renders copy, tools, timeline, privacy text, and dashboard labels.
* **Progressive Disclosure Timeline**: Theater-day steps expand inline with clear CTAs.
* **Optional Supabase Auth**: Uses only public URL and publishable key for account dashboard summaries.
* **Responsive Tool Cards**: Mobile layout keeps infographic cards readable instead of compressing into unreadable columns.
* **Privacy-first Design**: We will not disclose personal data without explicit consent.

---

## Quick Start | 快速開始 | クイックスタート

1. Keep all files in the same folder.
2. Open `index.html`, or start a local server for fetch-friendly behavior.
3. Choose a language, select a tool, or sign into Tool48 Account for dashboard preview.

```bash
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

---

## File Structure | 檔案結構 | ファイル構成

* `index.html` - Header, account popover, hero, tool cards, dashboard, timeline, privacy note, contact, footer.
* `privacy.html` - Maintained privacy / disclaimer page rendered from `langs.json`.
* `about.html`, `contact.html`, `guide.html`, `terms.html`, `disclaimer.html`, `updates.html` - Redirect stubs kept to avoid old-link 404s.
* `assets/data/langs.json` - Multilingual content, tool URLs, dashboard copy, timeline, privacy body.
* `assets/js/app.js` - Language switching, tool card rendering, account auth, dashboard summary, timeline disclosure.
* `assets/css/core.css` - Shared background, base UI, interaction effects.
* `assets/css/app.css` - Hub layout, account UI, dashboard, tool infographics, responsive rules.

---

## Maintenance | 維護 | メンテナンス

* Update tool links and timeline content in `assets/data/langs.json`.
* Keep public URLs stable unless redirects are planned.
* Keep account and dashboard copy multilingual.
* Do not add service-role Supabase keys to frontend files.
* Keep no-login use available across all tools.
* Verify mobile cards around narrow widths such as `390x844`.

---

## Disclaimer | 免責聲明 | 免責事項

**[ZH]** 本項目是非官方、非商業 fan-made project，只供 fan 創作、資料整理、個人紀錄及參考用途。本站與 AKB48、DH、場地、主辦單位、票務平台或任何官方機構無關。票券風圖片並非真實票券、官方文件或入場憑證；座位圖、penlight 顏色、MBTI 筆記及其他資料均屬 fan reference。

**[EN]** This is an unofficial, non-commercial fan-made project for fan creation, information organisation, personal records, and reference only. It is not affiliated with AKB48, DH, venues, organisers, ticketing platforms, or any official organisation. Ticket-style images are not real tickets, official documents, or entry passes; seat maps, penlight colors, MBTI notes, and other data are fan references.

**[JP]** 本プロジェクトは、ファン創作、情報整理、個人記録、参考を目的とした非公式・非商用 fan-made project です。AKB48、DH、会場、主催者、チケットサービス、その他公式組織とは関係ありません。ticket-style 画像は実際のチケット、公式書類、入場証ではありません。座席図、penlight color、MBTI メモなどは fan reference です。

---

## Created by | 製作 | 制作

**Gomensensei**

Contact: X / Twitter [`@sorrysir_gomen`](https://x.com/sorrysir_gomen)
