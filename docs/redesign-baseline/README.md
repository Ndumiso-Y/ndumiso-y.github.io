# Personal Profile — pre-redesign forensic baseline

This directory is the source-of-truth preservation baseline for future Personal Profile UI work. It documents the product at commit `cf1bf12bfcf687c0bf7e9323f8c2c32f3172e547`. It does not authorize a redesign or removal.

## Baseline

```text
Repository: D:\Ndumiso\Website\ndu-portfolio
Branch: main
Baseline SHA: cf1bf12bfcf687c0bf7e9323f8c2c32f3172e547
Audit Date: 2026-08-27 (Africa/Johannesburg)
Production Match: LIKELY, NOT CRYPTOGRAPHICALLY VERIFIED
```

HEAD matched the local `origin/main`, the tracked workflow deploys `main` to GitHub Pages, and the live canonical URL responded with the matching title. The live artifact does not expose a SHA, so exact production identity is not proven.

## Inventory

```text
Formal Routes: 1 (/)
Hash/Anchor Destinations: 7
Pages: 1 SPA document
Component Definitions: 54 (19 active; 45 JS/JSX modules inspected)
Local Media/Documents: 170
Mapped Active Media/Documents: 52
Potentially Inactive/Legacy Media/Documents: 118 (preserve)
External Embedded Media: 0
Images: 156
Videos: 2
Audio: 8
SVGs: 0
Documents: 4 (3 PDF + 1 VCF)
Integrations: 5 mapped service/config families
Analytics Platforms: 1 (Google Analytics 4)
Environment Variable Names: 5
```

## Preservation

Counts are contract entries (grouped material elements), not raw file counts.

```text
P0 Count: 10
P1 Count: 14
P2 Count: 13
P3 Count: 7
P4 Count: 9
```

P4 means “possibly legacy/uncertain,” never “safe to delete.” Explicit human approval is mandatory before any P4 removal.

## Technical verification

```text
Build: PASS
Typecheck: NOT CONFIGURED
Lint: NOT CONFIGURED
Tests: NOT CONFIGURED
```

The build transformed 64 modules successfully. The only output warning was stale `caniuse-lite` data; no update was performed.

## Visual baseline

```text
Desktop Captured: NO
Laptop Captured: NO
Tablet Captured: NO
Mobile Captured: NO
Status: VISUAL_BASELINE_NOT_CAPTURED
```

The local app was reachable, but the provided in-app browser runtime failed during initialization because its `node:process` import was blocked by the browser execution environment. No alternate browser automation was substituted and the application was not modified.

Before redesign implementation, manually capture into `docs/redesign-baseline/screenshots/`:

- `desktop-1440-full.png`, hero, About/badge modal, Websites, Graphics/gallery modal, Projects/video+carousel, Contact/footer
- `laptop-1280-full.png` and hero/project crops
- `tablet-768-full.png` plus navigation, graphics/social visibility, modal and carousel states
- `mobile-390-full.png`, logo-only nav, hero, expanded Graphics, expanded Social, modal, carousel, contact/footer

There is no mobile menu-open state in the baseline; below 768px the six text navigation links are simply hidden and only the logo remains.

## Findings that block safe redesign implementation

1. Visual screenshots are absent, so current crop, spacing, overflow, modal and responsive composition cannot be compared pixel-for-pixel.
2. The HashRouter/plain section-hash interaction and direct-refresh behavior were not browser-tested in this audit.
3. Three source media references are missing: `/assets/ndu-headshot.jpg`, `/assets/makweleng-shot.jpg`, `/assets/ntombis-1080.webm`.
4. There are duplicate active/alternate component and content families with non-identical data.
5. The active 16:9 learning video is rendered in a portrait-ratio wrapper with `object-cover`; its exact crop needs a screenshot before alteration.

## Redesign readiness

Architecture, content, routes, components, interactions, media, responsive rules, integrations, analytics, SEO, dependencies, deployment, and preservation contracts are mapped. Planning may use this baseline, but redesign implementation is **not safe yet** because the visual baseline and browser behavior verification are incomplete. Capture the required screenshots and verify hash navigation/direct refresh first.

## Document index

- `BASELINE_REPORT.md` — Git/source/build/deployment baseline
- `PERSONAL_PROFILE_CURRENT_STATE.md` — current architecture and active/legacy separation
- `MEDIA_INVENTORY.md` / `media-inventory.json` — all local media/documents and usage
- `ROUTE_COMPONENT_MAP.md` / `route-map.json` — formal route, anchors and host fallbacks
- `CONTENT_INVENTORY.md` — exact visible/data content mapping
- `component-map.json` — every detected React component definition and reachability
- `UI_BEHAVIOUR_MAP.md` — interactions, state, controls and analytics attachment
- `RESPONSIVE_BEHAVIOUR.md` — desktop/tablet/mobile behavior and risks
- `INTEGRATIONS_AND_CONFIG.md` / `integration-map.json` — GA4, external destinations, build/deploy configuration and env names
- `SEO_AND_METADATA.md` — all current metadata and explicit absences
- `DEPENDENCY_AUDIT.md` — declared/locked dependencies and use
- `PRESERVATION_CONTRACT.md` / `preservation-map.json` — P0–P4 regression contract
- `REDESIGN_BOUNDARY.md` — allowed presentation changes versus protected layers

## Required future workflow

1. Capture and add the missing visual baseline before changing UI.
2. Create a separate redesign branch/worktree from the baseline SHA.
3. Preserve all P0/P1/P2 requirements and exact public URLs.
4. Compare every milestone against all five JSON files.
5. Run media, route, function, responsive, analytics and integration regression checks.
6. Require explicit approval for every P4 removal.
7. Verify target-host direct refresh and production build before merge/deploy.

`CURRENT_STATE_INCOMPLETE_REDESIGN_NOT_SAFE`
