# Gomensensei AKB Fan Tools Homepage v3.0 Core Integrated

This package turns `gomensensei.github.io` into a formal multi-language homepage that follows the Gomensensei Web App Core Architecture v3.0.

## What changed in this version

- Uses `assets/css/core.css` as the shared visual foundation.
- Uses `assets/js/core.js` as the shared interaction/performance foundation.
- Adds `assets/css/app.css` only as the homepage-specific app layer.
- Adds `assets/js/app.js` only as the homepage-specific logic layer.
- Uses `assets/data/langs.json` with `data-i18n` attributes.
- Vanilla JS only. No React, Vue, Svelte, or build step.
- Old GitHub Pages tool URLs are preserved.

## Included pages

- `index.html`
- `about.html`
- `guide.html`
- `updates.html`
- `privacy.html`
- `terms.html`
- `disclaimer.html`
- `contact.html`

## Included system files

- `.nojekyll`
- `robots.txt`
- `sitemap.xml`
- `Gomensensei_Prompt_v3.0_Ultimate.txt`
- `TOOL_FOOTER_SNIPPET.html`

## Deployment

1. Open the `gomensensei.github.io` repository.
2. Upload all files in this package to the repository root.
3. Commit to `main`.
4. Go to `Settings > Pages`.
5. Set source to `Deploy from a branch`.
6. Select `main / root`.
7. Visit `https://gomensensei.github.io/`.

## Required edit before publishing

Open `contact.html` and replace:

```html
your-email@example.com
```

with your public contact email, GitHub issue link, or social contact.

## AdSense note

Do not insert visible ad units before approval.  
After your AdSense site is ready, add the ownership meta tag in every page `<head>`:

```html
<meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxxxx">
```

A placeholder comment already exists in each HTML file.

## Tool links

Edit tool URLs and descriptions in:

```txt
assets/data/langs.json
```

Current assumed GitHub Pages paths:

- `/48-ticket-generator/`
- `/penlightlist/`
- `/akb-seatmap/`
- `/AKB-MBTI-with-wota/`
- `/akb_mini_games_2026/`

## Recommended next step

Add `TOOL_FOOTER_SNIPPET.html` to each separate tool repo so all old tools link back to the new hub.
