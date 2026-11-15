# Reference register — Ndumiso Yedwa portfolio redesign

One row per section. A section is only "accepted" when the owner says so; agent reports are evidence, not acceptance.

| # | Section | Reference / build | Status | Owner decision | Date | Evidence |
|---|---|---|---|---|---|---|
| 01 | Hero (+ floating nav) | `approved_hero_reference.png` → branch `redesign/hero-gate1`, commit `35058fa` | **Gate 2 static — ACCEPTED** | Owner chose "Accept, design About" after reviewing the built hero and the 13 logged departures | 15 Nov 2026 | `docs/redesign-qa/hero-gate1/GATE1_REPORT.md` |
| 02 | About | Built proposal on `redesign/hero-gate1` | Gate 1 — awaiting owner review | — | — | `docs/redesign-qa/about-gate1/ABOUT_REPORT.md` |
| 03 | Websites | — | Not started | — | — | — |
| 04 | Graphics & Branding | — | Not started | — | — | — |
| 05 | Social Media Management | — | Not started | — | — | — |
| 06 | Learning Journey | — | Not started | — | — | — |
| 07 | Contact | — | Not started | — | — | — |

Hero defect fix after acceptance (15 Nov 2026): tall-screen height cap corrected; 0 changed pixels at 1440×900 and 1024×768 versus the accepted captures (see About report).

## Scope of the hero acceptance (15 Nov 2026)

- Covers the **static** hero and nav as built, including the 13 departures in the Gate 1 report (real portrait, existing tagline, "Get in Touch" scrolls to Contact, 8-skill strip without Figma, card micro-copy, "What I do" band, 1024 px two-column layout, and the rest).
- Does **not** cover: motion (Gate 3), content/backend changes (Gate 4), merging to `main` or deployment (Gate 5).
- Still undecided: removing the unused `NdumisoNobackground.png` preload from `index.html` (P0 metadata change).
