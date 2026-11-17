# Final hero — Gate 1 static build + Gate 2 QA

**Date:** 17 Nov 2026 · **Branch:** `redesign/hero-final` · **Rollback:** tag `checkpoint/before-hero-final` (= main `92bd613`, pushed)
**Visual authority:** `Ndumiso_Hero_Approved_Reference_Pack_2026-11-17/references/01_FINAL_HERO_APPROVED.png` (02 used for glass-block placement only)
**Standard:** ED-WEB-001 **v1.0** (active) — `D:\Digital Agency\Embark Digitals\Embark_Digitals_Living_Web_Experience_Playbook_v1.0.docx`. v1.1 consolidated/AI-design candidates were read for the mask-verification and material-realism practices; both are marked "candidate, not approved".
**Status:** Gate 2 static design approved by the owner (17 Nov 2026: "Approve, start motion"). Gate 3 motion built — see below. **Not merged or deployed; awaiting owner Gate 3 decision.**

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

## Owner follow-up changes (17 Nov 2026, on this PR)
The owner asked to correct the AI wording, add software to "What I do" and fix the link-preview text:
1. **AI wording.** COPY_LOCK's "AI Solutions" was replaced, because neither software project contains AI features (the review's rule: "AI-assisted development", never an AI product claim).
   - Eyebrow: "Websites · Business Software · AI-Assisted Development". Below 1280 px it breaks after "Business Software".
   - Service line: "Custom Apps, Dashboards & Business Systems", matching the Contact sentence.
2. **"What I do"** (copy-review row 5):
   - New service 02, "Business Software & Dashboards — Custom apps that bring quotations, records, approvals, tasks and reports into one place." (ChatGPT's wording).
   - Layout: 4 columns at ≥1280 px, 2 at tablet, stacked on phone. The other three services are unchanged, renumbered 01/03/04.
3. **Link previews** for Google, WhatsApp, LinkedIn and X (copy-review row 6, `index.html`):
   - Title: "Ndumiso Yedwa — Websites & Business Software | Embark Digitals" (62 characters).
   - Description: "Ndumiso Yedwa builds websites, custom business software and dashboards for South African businesses and organisations. Founder of Embark Digitals." (146 characters).
   - Applied to the description, title, og: and twitter: tags. The og:image alt is updated. The image and URLs are unchanged.

## Still open
- `src/content/hero.json` still holds the old hero copy; it is not rendered.
- Proof cards for the software work (row 8) need design approval and client permission.

## Gate 3 — motion (per `MOTION_SPEC.md`)

### Audit: what was adopted and why
| Candidate | Decision | Notes |
|---|---|---|
| Glass-block drift | **Adopted** | 6 blocks, 4–8 px, 16–26 s asynchronous cycles with phase offsets, ease-in-out. Transform only, pointer-events none. |
| Sheen | **Adopted, one surface** | Skills glass: one sweep at 1.3 s after load, and again on hover. Never over the face or the CTAs. |
| Entrance | **Adopted** | Copy rises 10 px with a 70 ms stagger; portrait opacity settle with no scale; name rises 12 px. All done by ~1.1 s. Controls are clickable throughout. |
| CTA hover lift | **Adopted** | 2 px lift on View Work and Get in Touch. |
| Cursor parallax | **Rejected** | The drift already gives depth. Parallax adds motion without information and could push blocks toward the face. |
| Nav sheen | **Rejected** | The spec allows one sheen surface. |

Files: `src/features/modern/HeroModern.jsx` (classes and per-block drift values), `src/styles/modern.css` (keyframes and reduced-motion overrides).

### Evidence (headless Chrome over CDP, dev build)
| Check | 1440 | 390 | 390, CPU ×4 |
|---|---|---|---|
| Frame rate during motion | 59.9 fps | 59.4 fps | 59.9 fps |
| 95th-percentile frame time | 16.8 ms | 16.8 ms | 16.8 ms |
| Layout shift (CLS) | 0 | 0 | 0 |
| Glass blocks over the face | 0 | 0 | 0 |
| Horizontal overflow | none | none | none |

- **Reduced motion** (`prefers-reduced-motion: reduce` emulated at 1440 and 390): 0 animations run, and the layout is the same as the static Gate 2 composition.
- **Frames** (animations paused at set times): `motion-entrance-1440.png`, `motion-entrance-390.png`, `motion-drift-1440.png`. A video/GIF was not produced; paused frames are the evidence.
- **Limits of this evidence:** CPU ×4 throttling stands in for a low-power phone; no physical device was tested. The sheen is deliberately faint and barely shows at filmstrip size.

## Next
Owner Gate 3 decision → merge and deploy (Gate 5) only after owner sign-off. Rollback: tag `checkpoint/before-hero-final`.
