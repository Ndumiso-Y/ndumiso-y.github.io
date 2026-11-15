# Hero — Gate 1 static build report

**Playbook:** ED-WEB-001 (v1.0 active; v1.1 masking/QA practices applied as the reference lock allows)
**Visual authority:** `ndumiso_portfolio_design_reference_pack/approved_hero_reference.png` (owner-approved, 15 Nov 2026)
**Branch:** `redesign/hero-gate1` · **Rollback:** tag `checkpoint/before-hero-gate1` (= `main` at `cf1bf12`)
**Status:** Static hero built and checked locally. **Not deployed. Gate 2 (owner visual acceptance) pending.**
No motion beyond hover states, no content/backend changes, no deployment.

## Scope

| In scope (built) | Out of scope (unchanged) |
|---|---|
| Hero section (`src/features/modern/HeroModern.jsx`) | About, Websites, Graphics, Social, Learning Journey, Contact — still the current dark design, pending their own section reviews |
| Floating nav (`src/components/modern/FloatingNav.jsx`) — needed for mobile navigation | Analytics module, content files, routing, deploy workflow |
| Hero cut-out asset + script, glass styles, Montserrat font link | |

## Files changed

- `src/features/modern/HeroModern.jsx` — rebuilt to the approved composition
- `src/components/modern/FloatingNav.jsx` — glass pill nav; new mobile menu; light/dark glass switch
- `src/styles/modern.css` — `.hero-display`, `.hero-glass-light`, `.nav-glass-dark` (added only)
- `index.html` — **additions only**: preload for the new cut-out, Google Fonts link for Montserrat 700/800
- `public/assets/ndu-hero-cutout.webp` — new (44 KB)
- `scripts/make-hero-cutout.mjs` — reproducible cut-out generator

## Asset manifest (hero)

| Element | File | Source | Class | Notes |
|---|---|---|---|---|
| Portrait | `ndu-hero-cutout.webp` | `Ndu_Blue Background.png` (owner's own photo, unchanged) | Enhanced photo — background removed | Face and clothing pixels untouched; only the flat backdrop (#48aab7) removed |
| Watermark | `ndu-icon.png` | existing personal icon | Brand art | Not redrawn; shown at 13% with multiply blend |
| Nav logo | `ndu-icon.png` | existing | Brand art | |
| QR | `QRcodeBusiness.jpg` | existing | Original | Not altered; card now links to the existing e-card URL |
| Card images | `embark-shot.webp`, `vlc-brief-cover.webp`, `tvei-social.webp`, `p1-thumb.webp` | existing portfolio files | Documentary (own work) | Previews only; uncropped originals stay in their sections |
| Skill icons | `react-icons/si` (already a dependency) | | Third-party marks | Same icon set the About section already uses |

The AI concept image's portrait, QR, card photos and the "Figma" skill were **not** used (lock: factual asset fidelity).

## Cut-out (mask) verification — playbook B5/C4, L10–L13

Method: colour-distance key against the sampled flat background, limited to background **connected to the image border** (so the white shirt can never be keyed out), soft alpha only in a 2 px edge band, edge pixels recoloured from neighbouring opaque subject pixels (no teal fringe).

- Alpha histogram (0→1 in tenths): `579153, 647, 657, 644, 640, 807, 1003, 924, 911, 860, 580154` — two clean populations, ~6.5k soft edge pixels.
- Inspected over black, white, magenta, site teal, site off-white: `cutout-on-*.png`.
- 100% edge crops (head, beard/collar, shoulder) on black/white/magenta: `edge-*.png`. No halo, no pinholes, no tinted rim, shirt fully opaque.
- Browser check: the page requests `ndu-hero-cutout.webp` (confirmed in DOM at 1440 and 390).
- First attempt failed (shirt partly transparent, red rim on suit) and was corrected before use.

## Browser QA

| Width | Evidence | Result |
|---|---|---|
| 1440 × 900 | `after-hero-1440x900.png` (headless Chrome) | Matches the reference composition; all elements in first screen |
| 1280 × 800 | `after-hero-1280x800.png` | Split layout; skills strip just below the fold |
| 1024 × 768 | `after-hero-1024x768.png` | Own two-column composition (split crowded the copy at this width — see departures) |
| 768 × 1024 | `after-hero-768x1024.png` | Stacked; full nav links visible |
| 390 × 844 | observed in the in-app browser (headless Chrome can't render below ~500 px, so no file) | Name, buttons and face in first screen; menu opens/closes; no horizontal scroll |
| 360 × 780 | observed in the in-app browser | No horizontal scroll; buttons wrap |
| Before | `before-hero-1440x900.png` (live site) | |

Checks run:
- Horizontal overflow: none at 1440 / 1280 / 1024 / 768 / 390 / 360.
- Hero tap targets under 44 px at 390: **0** (was 34 of 55 site-wide). Hero text under 12 px: **0**.
- Mobile menu: opens, links reach anchors (`#projects` tested), closes on link tap, Escape and outside tap; `aria-expanded` / `aria-controls` set.
- Seven section anchors present: hero, about, websites, graphics, social, projects, contact.
- `vite build` passes. Only console error is pre-existing (`ProjectCarousel` `<style jsx>` attribute warning).

## Analytics (P0/P1)

Unchanged event functions and names: `trackGetInTouchClick` (`cta_get_in_touch_click`), `trackViewWorkClick` (`cta_view_work_click`), `trackECardClick`, `trackNavClick(section)` with the same section keys. The new section-shortcut cards send **no** event (no schema change); add one later if wanted.

## Intentional departures from the reference — owner review

1. **Real portrait instead of the concept model.** Real photo is front-facing and smiling; pose differs from the reference (lock rule: never alter the face).
2. **Tagline** uses the existing copy, not the reference's new sentence.
3. **"Get in Touch"** keeps its current behaviour (scrolls to Contact). It shows a chat icon instead of the WhatsApp logo, because a WhatsApp logo would promise WhatsApp. Say if you want it to open WhatsApp directly instead.
4. **Skills strip** shows 8 real skills (React, Tailwind, JavaScript, HTML, Photoshop, Illustrator, InDesign, Canva). Figma was dropped — it isn't in your skills list. All 11 remain in About.
5. **Teal field** is `#48aab7` (your existing theme colour and the portrait's backdrop), a little brighter than the reference's muted teal.
6. **Nav label** "Projects" → "Learning" to match the reference. Anchor `#projects` and analytics key unchanged.
7. **Draft micro-copy** on cards (not existing copy): "Design · Build · Launch", "Logos · Brand guides · Print", "Content · Design · Scheduling", "Treehouse · 8 projects". Please approve or replace.
8. **Existing hero copy kept below the first screen** in a "What I do" band: the three services and three proof points. The reference has no room for them and the lock requires all copy to stay.
9. **Removed from the hero:** the "Web Developer" pill (now part of the "Web Designer & Front-End Developer" label) and "Scroll to explore".
10. **E-card card** is now a real link to `https://www.embarkdigitals.com/ecard` (it had a click event but no destination).
11. **1024–1279 px** uses a two-column layout (portrait in a rounded teal panel) because the overlapping split hid the location text at 1024.
12. **Entrance animation removed** (static Gate 1; motion is Gate 3).
13. **Nav over dark sections** switches to dark glass so links stay readable until the other sections are redesigned.

## Open items needing an owner decision

- **Unused 1.5 MB preload:** `index.html` still preloads `NdumisoNobackground.png`, which the new hero no longer uses. Removing it is a P0 metadata change, so it's left for your approval.
- **Light hero above dark sections:** expected until About → Contact are designed; the jump from light to dark is visible.
- Approve or adjust departures 1–13, then Gate 2 acceptance of the static hero.
