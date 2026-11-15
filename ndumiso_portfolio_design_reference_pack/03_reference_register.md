# Reference register — Ndumiso Yedwa portfolio redesign

One row per section. A section is only "accepted" when the owner says so; agent reports are evidence, not acceptance.

| # | Section | Reference / build | Status | Owner decision | Date | Evidence |
|---|---|---|---|---|---|---|
| 01 | Hero (+ floating nav) | `approved_hero_reference.png` → branch `redesign/hero-gate1`, commit `35058fa` | **Gate 2 static — ACCEPTED** | Owner chose "Accept, design About" after reviewing the built hero and the 13 logged departures | 15 Nov 2026 | `docs/redesign-qa/hero-gate1/GATE1_REPORT.md` |
| 02 | About | Branch `redesign/hero-gate1`, commit `f6410e4` | **Gate 2 static — ACCEPTED** | Owner chose "Accept, do Websites" after reviewing the built section, report and draft labels ("Build", "Design", "AI-assisted tools", "Show tool details") | 15 Nov 2026 | `docs/redesign-qa/about-gate1/ABOUT_REPORT.md` |
| 03 | Websites | Branch `redesign/hero-gate1`, commit `2311bfc` | **Built — owner review after merge** | Owner: "you make the decisions… I will tell you later whether I want it light mode or not". Charcoal kept for now | 15 Nov 2026 | `docs/redesign-qa/websites-gate1/WEBSITES_REPORT.md` |
| 04 | Graphics & Branding | Branch `redesign/hero-gate1` | **Built — owner review after merge** | Owner delegated design decisions and asked to finish end to end and merge (15 Nov 2026) | 15 Nov 2026 | `docs/redesign-qa/sections-gate1/REPORT.md` |
| 05 | Social Media Management | Branch `redesign/hero-gate1` | **Built — owner review after merge** | Owner delegated design decisions and asked to finish end to end and merge (15 Nov 2026) | 15 Nov 2026 | `docs/redesign-qa/sections-gate1/REPORT.md` |
| 06 | Learning Journey | Branch `redesign/hero-gate1` | **Built — owner review after merge** | Owner delegated design decisions and asked to finish end to end and merge (15 Nov 2026) | 15 Nov 2026 | `docs/redesign-qa/sections-gate1/REPORT.md` |
| 07 | Contact | Branch `redesign/hero-gate1` | **Built — owner review after merge** | Owner delegated design decisions and asked to finish end to end and merge (15 Nov 2026) | 15 Nov 2026 | `docs/redesign-qa/sections-gate1/REPORT.md` |

Hero defect fix after acceptance (15 Nov 2026): tall-screen height cap corrected; 0 changed pixels at 1440×900 and 1024×768 versus the accepted captures (see About report).

## Scope of the hero acceptance (15 Nov 2026)

- Covers the **static** hero and nav as built, including the 13 departures in the Gate 1 report (real portrait, existing tagline, "Get in Touch" scrolls to Contact, 8-skill strip without Figma, card micro-copy, "What I do" band, 1024 px two-column layout, and the rest).
- Does **not** cover: motion (Gate 3), content/backend changes (Gate 4), merging to `main` or deployment (Gate 5).
- Resolved 15 Nov 2026: the unused `NdumisoNobackground.png` preload was removed under the owner's delegation of decisions.

## Change of process (15 Nov 2026)

After the Websites build the owner said design and UX decisions are mine to make: finish all sections end to end, merge, and they will review afterwards. They may still ask for changes, such as a light Websites band. The per-section approval gates above are replaced by a review after merge. Rollback point: tag `checkpoint/before-hero-gate1` (`main` before the redesign).
