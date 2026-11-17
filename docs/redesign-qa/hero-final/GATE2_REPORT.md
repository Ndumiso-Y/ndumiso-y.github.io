# Final hero — Gate 1 static build + Gate 2 QA

**Date:** 17 Nov 2026 · **Branch:** `redesign/hero-final` · **Rollback:** tag `checkpoint/before-hero-final` (= main `92bd613`, pushed)
**Visual authority:** `Ndumiso_Hero_Approved_Reference_Pack_2026-11-17/references/01_FINAL_HERO_APPROVED.png` (02 used for glass-block placement only)
**Standard:** ED-WEB-001 **v1.0** (active) — `D:\Digital Agency\Embark Digitals\Embark_Digitals_Living_Web_Experience_Playbook_v1.0.docx`. v1.1 consolidated/AI-design candidates were read for the mask-verification and material-realism practices; both are marked "candidate, not approved".
**Status:** static only, no motion (Gate 3 not started). **Not merged or deployed; awaiting owner Gate 2 decision.**

## Gate 0 findings
- Active hero: `src/features/modern/HeroModern.jsx` (rendered by `AppModern.jsx`); nav is the separate `FloatingNav.jsx` (unchanged).
- Portrait: the reference pose (dark jacket, open white shirt) is the real `Ndu_Blue Background.png` (1080², the only source in that pose). Used its existing cut-out `ndu-hero-cutout.webp` (from `scripts/make-hero-cutout.mjs`); `NdumisoNobackground.png` is a different full-length photo and was not used.
- Mask check (v1.1 practice): cut-out inspected at 100 % over magenta, near-black and white — clean contour, no teal halo, no pinholes. No new mask was generated, so no re-masking proof is needed.

## What was built (files)
| File | Change |
|---|---|
| `src/features/modern/HeroModern.jsx` | New first screen per reference; "What I do" band below it unchanged |
| `src/styles/modern.css` | Teal field, technical grid, portrait fade, glass blocks, perspective name |
| `src/features/modern/ContactModern.jsx` | QR e-card relocated here (same image, alt text and caption) |
| `src/features/modern/AboutModern.jsx` | `id="skills"` anchor only (target of the phone "Core Skills & Tools" link) |

Copy exactly as `COPY_LOCK.md`. The h1 reads "Ndumiso Yedwa: Websites & Business Software" (name visually hidden; the perspective lettering is decorative and `aria-hidden`).

## Screenshots (real browser, exact device widths via CDP)
`hero-1440x900.png`, `hero-1440x1020.png`, `hero-1024.png`, `hero-768.png`, `hero-390.png`, `compare-reference-vs-build-1440.png`, `compare-reference-vs-build-390.png`, `contact-qr-relocated.jpg`

## QA results
- Horizontal overflow: none at 1440, 1024, 768, 390.
- Hero height: exactly one screen at 1440×900, 1440×1020 and 1024×768; 1,086 px at 390 (≈1.3 screens).
- Tap targets in hero: all ≥ 44 px. Text: nothing under 12 px (decorative name excluded).
- Contrast on #f3f3f1: eyebrow 13.3:1, sentence 11.6:1, teal headline 5.4:1; View Work button 7.9:1.
- Anchors: #websites, #contact, #skills resolve; all seven sections present.
- Analytics: `cta_view_work_click` and `cta_get_in_touch_click` fire; `trackECardClick` stays on Contact's e-Card button.
- Console: no errors. Production build passes.

## Departures from the reference (log)
1. **Figma → HTML** in the skills strip. Figma is not one of Ndumiso's 11 listed skills; HTML is.
2. **Perspective name** is CSS 3D (real text, rotateX + layered extrusion + mirrored reflection), so its faces are flatter than the rendered mock-up's lit 3D letters. No raster lettering was used.
3. **Portrait** is the real photo; the mock-up's generated face is not reproduced. Proportions and crop follow the reference.
4. **Phone location** shows the full "Johannesburg, South Africa" (from site content) rather than the mock-up's "Johannesburg, SA".
5. **Teal** is slightly lighter than the mock-up's glow-heavy render; kept within the existing palette.
6. **Removed from the hero (no loss):** the four section shortcut cards (duplicated the nav; images remain in their sections), the ndu-icon watermark (still in nav, Websites, Social, Contact), the QR panel (moved to Contact), the old eyebrow "Web Designer & Front-End Developer" and tagline (replaced by the locked copy; same message remains in About and Contact).

## Flags for the owner
- **"AI Solutions"** appears in the eyebrow and service line as approved in the visual. Neither software project contains AI features; keep any AI project claim out of the portfolio until there is real AI work to show (COPY_LOCK note).
- **"What I do" band** still lists three services without software (row 5 of the copy review, deferred to this review). Not changed here.
- **Meta description** still says websites only (row 6, needs owner authorisation). Not changed.
- `src/content/hero.json` still holds the old hero copy; it is not rendered. Not changed.

## Next
Owner Gate 2 decision → Gate 3 motion audit per `MOTION_SPEC.md` (glass drift, one sheen, soft entrance, reduced-motion) → merge/deploy only after owner sign-off.
