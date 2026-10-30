# ALEXIA EXPORTS

Website for ALEXIA EXPORTS, "Quality Beyond Borders". English, Arabic, French and Spanish.

| File | Purpose |
| --- | --- |
| `index.html` | English site |
| `ar.html` | Arabic site (right to left) |
| `fr.html` | French site |
| `es.html` | Spanish site |
| `style.css` | Shared design |
| `app.js` | Product filter, enquiry list, trade-term tabs, enquiry form |
| `logo.png`, `favicon.png`, `apple-touch-icon.png`, `icon-512.png`, `og-image.png` | Logo and icons |
| `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `404.html` | Search and site files |

Hosted on GitHub Pages (branch `main`, root folder).

## Dashboard
Open `/admin/` on the site (for example `https://mo7mdwaly-byte.github.io/alexia-exports/admin/`). It edits `content.json`, rebuilds `index.html`, `ar.html`, `fr.html`, `es.html`, `sitemap.xml` and `robots.txt`, and publishes them to `main` in one commit.

One-time setup: GitHub, Settings, Developer settings, Personal access tokens, Fine-grained tokens, Generate new token. Select only this repository and set Contents to Read and write. Paste the token (`github_pat_...`) into the dashboard. It is stored only in that browser.

Without the dashboard: edit `content.json`, then run `node tools/build.js` and commit.

| File | Purpose |
| --- | --- |
| `content.json` | All site content (products, texts, seasons, contacts, base URL) |
| `admin/builder.js` | Turns `content.json` into the pages (browser and Node) |
| `admin/index.html`, `admin.js`, `admin.css` | The dashboard |
| `tools/build.js` | Node runner for the builder |

## Photos, videos and banner
- Each product can have several photos and short videos (MP4, under 30 MB). They play one after another on the product card.
- The Banner tab offers no banner, one fixed banner, or a rotating banner of photos and videos with optional headline and button. It appears below the trust section.
- Media files are stored in `images/` and `videos/`.

## Notes
- To use a custom domain, add a `CNAME` file, then set the new address in the dashboard under Contact and publish.
- The seasonal calendar is a rough guide. Check the months before relying on it.
