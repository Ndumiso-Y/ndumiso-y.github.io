# About — Gate 1 static proposal

**Playbook:** ED-WEB-001 · **Design basis:** the accepted hero (register row 01) extended per `02_full_site_design_blueprint.md` §02
**Branch:** `redesign/hero-gate1` · **Status:** built for owner review. Not accepted yet. Not deployed.

## What changed

- `src/features/modern/AboutModern.jsx` — rebuilt in the hero's light editorial language (off-white canvas, flat teal panel, Montserrat headings, deep-teal accents).
- `src/components/modern/FloatingNav.jsx` — nav stays light glass over About (was switching to dark).
- `public/assets/ndu-standing-cutout.webp` — 50 KB WebP of the existing `NdumisoNobackground.png` (1.5 MB). Original unchanged.
- **Hero defect fix (locked section):** on screens taller than 1040 px the hero grew to the full window height and the portrait blew up (`min-height` beat `max-height`). Now `min-height: clamp(760px, 100svh, 1040px)`. Regression proof: re-captured hero at 1440×900 and 1024×768 — **0 changed pixels** against the accepted Gate 1 captures. Tall-screen proof: `hero-tall-1440x1600.png`.

## Content preserved (no-loss check)

| Item | Before | After |
|---|---|---|
| "About Me", heading, lead, 4 bullets, "Let's Work Together" → `#contact` | ✓ | ✓ word for word |
| 5+ Years Experience | ✓ | ✓ |
| "Skills & Tools", "Technical Expertise", subtitle | ✓ | ✓ |
| 11 skills with all 11 descriptions | ✓ | ✓ (descriptions always visible from 768 px; behind "Show tool details" on phones) |
| "Achievements", "Badges & Recognition" | ✓ | ✓ + existing `sectionIntros.badges` sentence (was in content.js but unused) |
| Black Umbrellas: Visit site, Letter (text + letter image + zoom) | ✓ | ✓ |
| Treehouse award: LinkedIn, Zoom (large image, zoom, "See LinkedIn post") | ✓ | ✓ |
| Techdegree: Letter (text), Zoom (certificate) | ✓ | ✓ |
| Card click opens the same modal mode as before (letter first, else zoom) | ✓ | ✓ |
| Anchor `#about` | ✓ | ✓ |

## Design decisions

1. **Portrait:** the existing standing cut-out (white shirt) on the hero's flat teal, so About doesn't repeat the hero's suit photo. Watermark is the real `ndu-icon`.
2. **Skills grouped** under three draft labels — **"Build", "Design", "AI-assisted tools"** (new micro-copy, needs your approval). Order inside each group is the original order.
3. **Recognition as an evidence gallery:** images shown whole (`object-contain`, never upscaled past natural size), not cropped into 16:9 as before.
4. **Actions are real 44 px buttons:** "Visit site", "LinkedIn", "Letter", "Zoom" (same words, arrows replaced by an external-link icon where the link leaves the site).
5. **Modal improvements:** Escape closes it, focus moves to Close on open and back to the card on close, labelled as a dialog, 44 px controls. Same modes, zoom steps (1×–3×, 0.25 steps), right-click guard and LinkedIn link.
6. **Phones:** square portrait panel, skills as compact two-column tiles with a "Show tool details" / "Hide tool details" toggle (draft micro-copy), recognition cards laid out horizontally.

## Browser QA

| Width | About height before → after | Evidence | Notes |
|---|---|---|---|
| 1440 | 3037 → **2794 px** | `about-1440.png`, `about-1440-preview.png` | |
| 1024 | — → **2743 px** | `about-1024.png` | 3-column skills and recognition |
| 768 | — → 3758 px | `about-768.png` | 2 columns |
| 390 | 4516 → **3140 px** | observed in the in-app browser (headless can't go below ~500 px) | |

- No horizontal overflow at 1440 / 1024 / 768 / 390.
- Tap targets under 44 px in About at 390: **0** (was most links at 10 px text). Text under 12 px: **0**.
- Tested: Black Umbrellas card → letter modal → Escape closes, focus returns to the card. Treehouse Zoom → "+ Zoom in" sets scale 1.25. "Show tool details" toggles `aria-expanded` and reveals descriptions.
- `vite build` passes. No new console errors.

## Needs your decision

1. Approve the About design (Gate 2 for this section), or say what to change.
2. Approve or replace the draft labels: "Build", "Design", "AI-assisted tools", "Show tool details".
3. Still open from the hero: removing the unused 1.5 MB `NdumisoNobackground.png` preload. About now uses the 50 KB WebP instead, so the original is used nowhere on the active page.
