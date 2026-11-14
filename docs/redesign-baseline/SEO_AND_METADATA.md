# SEO and metadata inventory

All active metadata is static in `index.html`; React does not mutate document metadata per route. There is one real page.

| Item | Current value | Location | Priority |
|---|---|---|---|
| Language | `en` | `<html lang>` | P0 |
| Charset | UTF-8 | `<meta charset>` | P0 |
| Viewport | `width=device-width, initial-scale=1.0` | `index.html` | P0 |
| Title | Ndumiso Yedwa — Front-End Developer & Founder of Embark Digitals | `index.html` | P0 |
| Meta title | Same as document title | `index.html` | P0 |
| Description | I build fast, brand-true websites with React, Vite, and Tailwind, turning business goals into clear UI, accessible UX, and measurable outcomes. | `index.html` | P0 |
| Author | Ndumiso Yedwa | `index.html` | P0 |
| Keywords | Front-End Developer, React Developer, Web Designer, Tailwind CSS, Vite, Embark Digitals, Ndumiso Yedwa, Portfolio | `index.html` | P2 |
| Canonical | `https://ndumiso-y.github.io/` | `index.html` | P0 |
| Theme/MS tile color | `#48aab7` | `index.html` | P0/P3 |

## Open Graph

- Type: `website`
- URL: `https://ndumiso-y.github.io/`
- Title: same as HTML title
- Description: same as meta description
- Image: `https://ndumiso-y.github.io/assets/ndu-portrait.jpg`
- Image alt: `Ndumiso Yedwa - Front-End Developer`
- Site name: `Ndumiso Yedwa Portfolio`

## Twitter/X cards

- Card: `summary_large_image`
- URL/title/description mirror canonical metadata
- Image: `https://ndumiso-y.github.io/assets/ndu-portrait.jpg`
- No `twitter:site` or `twitter:creator` is configured.

## Icons and preload

- Favicon: `/assets/ndu-icon.png`
- Apple touch icon: `/assets/ndu-icon.png`
- Preloaded image: `/assets/NdumisoNobackground.png`

The icon is 512×512. The OG image file is a 1920×1079 JPEG. The hero preload points to the actual active transparent portrait (832×1248).

## Not present

- No `robots.txt`
- No sitemap
- No robots meta directive
- No web app manifest
- No structured data / JSON-LD / schema.org markup
- No site verification/ownership tags
- No Apple status-bar metadata
- No per-section or per-route metadata

Absence is part of the baseline. A future SEO enhancement is a separate change; it must not overwrite or remove the current tags/URLs without approval.

## Risks

1. Asset renames break favicon, Apple icon, preload, OG, and Twitter media even if React still builds.
2. Moving away from the canonical GitHub Pages URL requires an explicit canonical/social migration.
3. A redesign that introduces head-management tooling can duplicate or override the static tags.
4. Hash/BrowserRouter build target changes must not create incorrect canonical paths or analytics page locations.
