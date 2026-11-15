# Websites — Gate 1 static proposal

**Playbook:** ED-WEB-001 · **Design basis:** accepted Hero + About (register rows 01–02), blueprint §03
**Branch:** `redesign/hero-gate1` · **Status:** built for owner review. Not accepted. Not deployed.

## What changed

- `src/features/modern/WorkShowcase.jsx` — rebuilt.
- `public/assets/krfthumbnail.webp`, `public/assets/MakwelengThumbnail.webp` — new lighter copies (49 KB, 33 KB) of the existing PNGs. Originals unchanged.
- `src/components/modern/FloatingNav.jsx` — comment only (nav uses dark glass over this charcoal band, as before).

## Design

1. **Charcoal band** (`#10191b`) for rhythm after the light Hero and About, using the blueprint's "charcoal" surface. Teal accents become a lighter `#6fd0d7` for contrast on dark.
2. **Screenshots shown whole** in a browser frame with the site's real domain in the address bar (taken from each project's existing URL). Frame ratio 1200:625 with `object-contain`, so nothing is cropped. KRF (1200×680) gets thin side bars instead of losing its bottom.
3. **First and last projects full-width** (KRF opens, Embark Digitals closes, mirrored); the four in between sit in two columns. Order is unchanged: KRF, Dr Benzi, VLC, TVEI, Makweleng, Embark Digitals.
4. **Numbered captions** (01–06) with the existing name and outcome, and a 44 px "View Website" control.
5. Faint real `ndu-icon` watermark top right (desktop only), as in the hero.

## Preserved

| Item | Status |
|---|---|
| "Websites" label, "Websites That Convert" heading, subtitle | Word for word |
| 6 projects: names, outcomes, URLs, order | Unchanged (`websites.json` untouched) |
| Whole card is one link, opens in a new tab, `rel="noopener noreferrer"` | Unchanged |
| Analytics `trackWebProjectClick(name)` → `web_project_view_click` | Unchanged |
| Stack tags (React/Vite/Tailwind) | Still hidden, as the old component deliberately filtered them |
| Anchor `#websites` | Unchanged |

## Image weights (same screenshots)

Checked side by side before switching (`jpg-vs-webp-*.png`): the existing WebP copies show the same pages at higher resolution.

| Project | Before | Now |
|---|---|---|
| KRF | PNG 104 KB | WebP 49 KB (new) |
| Dr Benzi | JPG 142 KB | JPG 142 KB (its existing WebP is larger, so kept JPG) |
| VLC | JPG 499 KB | WebP 49 KB (existing) |
| TVEI | JPG 91 KB | WebP 57 KB (existing) |
| Makweleng | PNG 73 KB | WebP 33 KB (new) |
| Embark | JPG 242 KB | WebP 40 KB (existing) |
| **Total** | **1,151 KB** | **370 KB** |

## Legacy CSS conflict (found and handled)

`src/index.css` has ID rules for `#websites` (a light gradient and an infinite opacity "pulse" animation, plus similar rules for `#graphics`, `#social`, `#projects`, `#contact`). They override Tailwind classes because ID selectors are more specific. The new section sets its background, `animation: none` and border inline, like the old component did. The legacy rules are left in place for the sections not yet redesigned; they can be removed once all sections are done.

## Browser QA

| Width | Websites height before → after | Evidence |
|---|---|---|
| 1440 | 1458 → **2598 px** | `websites-1440.png` |
| 1024 | — → 2174 px | `websites-1024.png` |
| 768 | — → ~2377 px (in-browser) | `websites-768-top.png` (top half only; crop stopped early) |
| 390 | 3076 → **3140 px** | observed in the in-app browser |

- The section is **taller on desktop** than before because the screenshots are now large and uncropped (the blueprint asks for this). On phones it's about the same length as before.
- No horizontal overflow at 1440 / 1024 / 768 / 390. Links under 44 px: **0**. Text under 12 px: **0** (the address-bar domain is 12 px).
- All 6 images load; order and URLs verified in the DOM.
- `vite build` passes.

## Regression on accepted sections

- Hero 1440×900: 7 of 1,296,000 pixels differ; 1024×768: 9 of 786,432 (anti-aliasing noise; no visible change).
- About 1440: 0 differing pixels inside the section. The 30,251 differing pixels are the 22 rows of the *next* section caught in the crop (old black → new charcoal).

## Needs your decision

1. Accept the Websites design, or say what to change. Specifically: is the **charcoal band** right, or should Websites stay light like About?
2. Still open: removing the unused 1.5 MB `NdumisoNobackground.png` preload in `index.html`.
