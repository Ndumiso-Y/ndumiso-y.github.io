# Graphics, Social, Learning Journey, Contact — static redesign

**Playbook:** ED-WEB-001 · **Design basis:** accepted Hero + About, Websites, blueprint §04–§07
**Branch:** `redesign/hero-gate1` · **Date:** 15 Nov 2026

On 15 Nov 2026 the owner asked for the remaining sections to be designed and finished end to end without stopping for each section's approval, with merging allowed. They will review afterwards. Each decision below is logged so it can be changed later.

## Page rhythm (decided)

| # | Section | Surface | Nav glass |
|---|---|---|---|
| 01 | Hero | off-white `#f3f3f1` + teal field | light |
| 02 | About | off-white `#fbfbf9` | light |
| 03 | Websites | charcoal `#10191b` | dark |
| 04 | Graphics & Branding | off-white `#f3f3f1` | light |
| 05 | Social Media Management | deep teal `#0e5c66` | dark |
| 06 | Learning Journey | off-white `#fbfbf9` | light |
| 07 | Contact + footer | charcoal `#10191b` / `#0b1214` | dark |

The Websites band stays charcoal for now; the owner may still choose light. It is a one-line change in `WorkShowcase.jsx` and `FloatingNav.jsx`.

## What changed

- New: `src/features/modern/GraphicsModern.jsx`, `SocialModern.jsx`, `LearningModern.jsx`; `ContactModern.jsx` rewritten (the old file was an unused draft) and now also holds `SiteFooter`.
- `src/AppModern.jsx` uses the new sections. The old `LogoShowCase`, `SocialMgmt`, `ProjectCarousel` and `Contact` files are left in the repo, unused.
- `src/components/modern/MiniAudioPlayer.jsx` rebuilt.
- `src/lib/lighter.js`: swaps images to existing same-size WebP copies at render time. Content files are unchanged.
- `src/components/modern/FloatingNav.jsx`: light glass over Graphics and Learning.
- `src/index.css`: removed the legacy `#websites/#graphics/#social/#projects/#badges/#contact` background rules and the `sectionPulse` opacity animation. Every section now sets its own surface.
- `index.html`: removed the preload of the unused 1.5 MB `NdumisoNobackground.png`. Nothing on the active page uses it.

## Preserved (no-loss check)

| Section | Content and behaviour | Status |
|---|---|---|
| Graphics | "Creative Work", "Graphics & Branding", intro; 3 logo cases with client, year, note, Slides PDF links and `trackGraphicsSlidesClick` | ✓ |
| Graphics | 4 design pieces with titles and copy; opening-event carousel (6 flyers, 3 s auto-advance, prev/next, dots); "Click to open gallery" | ✓ |
| Graphics | Gallery modal (arrows, ← → keys, thumbnails), zoom modal, 1×–3× zoom in 0.25 steps, Escape | ✓ |
| Graphics | Phones show the first item of each block until expanded | ✓ (now a 44 px "View all …" / "Show less" button) |
| Social | "Social Strategy", heading, intro; TVEI and Easy Documents text, images, platforms, 4 profile links, `trackSocialProfileClick` | ✓ |
| Learning | "Treehouse Projects", heading, subtitle; intro video and all of its copy | ✓ |
| Learning | All 8 projects in order with names, outcomes, stack, audio and descriptions, demo links | ✓ |
| Contact | "Contact", "Let's work together", tagline; WhatsApp first, then Email, Call, Save Contact (VCF), LinkedIn, Facebook, Instagram; all analytics calls | ✓ |
| Footer | © line | ✓ |

Verified in the browser: 3 PDF links, 4 social links and 8 contact links have the same URLs as before; 8 audio players; video source unchanged.

## Design decisions (my calls, open to change)

1. **Graphics:** a light gallery. Logo cases are 16:9 cards with solid "Slides" buttons. Design pieces sit in one row at their natural aspect ratios at 1440 (two rows of two at 768–1279; stacked on phones), so nothing is cropped (they were cropped to 16:10 before).
2. **Social:** two alternating case studies on deep teal, each with the full social screenshot. The platform chips became a text line ("FACEBOOK · LINKEDIN"), because the profile buttons below already show the same platforms. **Departure:** phones now show both clients instead of hiding the second behind "View more" (only 2 items).
3. **Learning:** a gallery instead of the side-scrolling carousel with arrows that covered cards (blueprint §06). Desktop has 4 columns, tablet 2. Phones get a swipeable row with the next card peeking and a "Swipe to see all 8 projects →" hint. Titles are never cut off.
4. **Audio players:** 44 px play button, a seek bar you can use with the keyboard, and only one walkthrough plays at a time.
5. **Contact:** a charcoal closing band with a large heading on the left and an action card on the right.
   - WhatsApp now has dark text on green. White on `#25D366` failed contrast.
   - **Added:** an "e-Card" button. The link and analytics event already existed in the hero; the old contact component had an e-card preview that nothing could open, which I removed.
   - Location is shown, using the existing value.
   - `mailto:` and `tel:` no longer open a blank tab.
6. **Footer:** charcoal instead of the white strip, plus a "Back to top" link.
7. **Reduced motion:** with reduced motion switched on, the flyer carousel and the intro video don't play automatically. The carousel also pauses while the pointer or keyboard focus is on it.
8. **Gallery:** opens on the flyer currently showing (before, it always opened on the first).

## Image weight (Estimate: sum of file sizes on disk)

| Block | Before | Now |
|---|---|---|
| Logo covers (3) | 514 KB JPG | 104 KB WebP |
| Opening carousel flyers (6, all load as it cycles) | 6,581 KB JPG | 396 KB WebP |
| Vine poster, Hakem banner, Hakem bike | 949 KB | 635 KB (bike keeps its JPG; its WebP is larger) |
| Social screenshots (2) | 883 KB | 79 KB |
| Treehouse thumbnails (8) | 1,873 KB | 136 KB |
| **Total** | **≈10.8 MB** | **≈1.35 MB** |

Every WebP used has the same pixel size as its original; this was checked with `sharp` metadata.

## Browser QA

| Width | Graphics | Social | Learning | Contact | Evidence |
|---|---|---|---|---|---|
| 1440 | 1492 px | 1309 px | 2248 px | ~770 px | `*-1440.png` |
| 1024 | 2073 px | 1183 px | 2142 px | ~823 px | `*-1024.png` |
| 768 | 2189 px | 1778 px | — | — | `graphics-768.png`, `social-768.png`, `learning-768-top.png` (capture ends mid-section) |
| 375 | 1540 px | 1492 px | 1753 px | 1044 px | in-app browser |

Whole page on a 375 px phone: **14,539 px** (the live site is 15,162 px).

- At 375 px: no horizontal overflow; 0 links or buttons under 44 px and 0 text under 12 px in the four new sections.
- Tested in the browser:
  - Gallery opens and focus moves to Close.
  - → advances 2/6 to 3/6, and Zoom in sets the scale to 1.25.
  - Escape closes the gallery and focus returns to the tile.
  - The zoom modal opens "Vine to Bottle".
  - Starting audio 02 pauses audio 01.
  - The nav switches to light glass over Learning.
- No console errors. `vite build` passes.

## Regression on accepted sections

- Hero 1440×900: **0** differing pixels against the accepted capture.
- Websites 1440: **0** differing pixels.
- About 1440: **0** inside the section. The 30,251 differing pixels are the same 22 rows of the next section caught in the old crop, as last time.

## Known issues (content, not design; not changed)

- The Easy Documents Instagram link is still the placeholder `https://www.instagram.com/your-easy-docs-handle`, which is also on the live site. It needs the real handle.
