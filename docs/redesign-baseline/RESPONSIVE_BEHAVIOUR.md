# Responsive behaviour

## Breakpoints

Tailwind defaults are unchanged: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px. JavaScript `matchMedia('(min-width: 768px)')` in Graphics and Social changes content visibility at 768px. `index.css` also has a custom `@media (max-width: 768px)`, so exactly 768px can satisfy both that max-width rule and Tailwind/JS min-width behavior. `prefers-reduced-motion` is the only preference query. No JS `innerWidth` logic is active in `AppModern` (one exists in an inactive About component).

## Hero

DESKTOP (≥1024): 12-column layout with 4/4/4 columns; copy left, portrait center, services and QR right. Portrait height grows from 90vh to 95vh at xl. Scroll prompt is visible. CTA row is horizontal from 640px.

TABLET (768–1023): one-column flow. Copy appears first, services second, portrait third, mobile/tablet QR fourth. Portrait is 80vh. Navigation links are visible from 768px.

MOBILE (<768): one-column flow, text starts after 8rem top padding; 7xl heading, stacked CTAs below 640px, services before portrait, portrait 70vh, centered QR card. Floating navigation contains only the logo—there is no mobile section menu.

Risks: very large fixed viewport-height portrait; horizontal clipping of the large heading at narrow widths; long vertical hero; loss of section navigation below 768; reading order differs from desktop visual order.

## About and skills/badges

DESKTOP: portrait 5/12 and content 7/12; skills six columns; badges two columns. Floating 5+ badge offsets outside the portrait corner.

TABLET: stacked portrait/content until 1024; skills four columns from 768; badges two columns.

MOBILE: stacked portrait/content, two-column skills, one-column badges. Section horizontal padding is 24px. Badge modals use 70vh image limits.

Risks: absolute experience badge can clip; fixed 3:4 portrait uses `object-cover`; recognition images have differing native ratios but are forced to 16:9 or 4:3 card frames.

## Websites

DESKTOP: three columns at 1024+, two columns at 768–1023. MOBILE: one column. Images are forced to 4:3 and `object-cover`, cropping wide 1200×~625 screenshots. Card text uses two-line clamps.

Risk: site screenshots are intentionally cropped; changing fit/ratio changes the current composition and must be visual-regressed.

## Graphics

DESKTOP (JS ≥768): all three logos and all four design items render; CSS grids are three columns from 768. MOBILE (<768): only first logo and first design item render initially; small thumbnail strips reveal View more controls; expanded state renders all; Show less collapses and scrolls to section start.

Images use 16:10 wrappers with `object-contain` in cards. Mini thumbnails use `object-cover`. Modals constrain images to 70vh and use horizontal overflow for gallery thumbnails.

Risks: the JS/CSS boundary at exactly 768px; losing expand/collapse state; changing gallery index wrap, zoom, keyboard controls, auto-advance, or contain behavior.

## Social

DESKTOP/TABLET ≥768: both cards visible; grid is two columns from 640 and three at 1024 (only two items). MOBILE: first card only until View more; second item appears after expansion. Images nest an aspect utility within a 16:10 wrapper and use `object-cover`.

Risk: card nesting may crop images differently if simplified; mobile second item must remain accessible.

## Projects

DESKTOP ≥1024: intro card is a 7/12 video column and 5/12 text column. Below, eight fixed 350px cards form a horizontally scrollable strip with 48px overlay arrows and 64px side padding.

TABLET/MOBILE: intro stacks. The video wrapper retains inline `aspectRatio: 1080/1350` while the source is 1280×720, and `object-cover` crops it heavily. The carousel still uses 350px cards and 64px internal side padding; a 390px viewport therefore has little margin and is overflow-sensitive. Native horizontal scrolling remains available.

Risks: portrait wrapper/source mismatch, autoplay policy, fixed card width, arrow overlay, hidden scrollbar, audio controls and touch scrolling.

## Contact/footer

DESKTOP/TABLET: contact action groups are two columns from 640px; large card padding at 768px. MOBILE: single-column actions and reduced padding. Social chips wrap. Footer is a simple centered line at all sizes.

Risks: protocol links and VCF path must remain clickable; long email/phone content must not overflow; touch targets and focus must remain usable.

## High-risk responsive regression checklist

1. Preserve access to all six sections on mobile or explicitly replace the currently missing mobile navigation with approved equivalent behavior.
2. Validate exact 768px behavior because both min- and max-width rules apply.
3. Compare portrait and website screenshot crops before changing `object-fit`, aspect wrappers, or heights.
4. Keep content order: on tablet/mobile services precede the hero portrait; desktop portrait is visually centered.
5. Keep mobile Graphics/Social reveal controls and content accessibility.
6. Test 350px project cards at 390px and smaller for overflow and arrow obstruction.
7. Verify modal sizing/keyboard/touch behavior and body scrolling.
8. Honor reduced-motion behavior after any animation redesign.

## Visual verification status

`VISUAL_BASELINE_NOT_CAPTURED`. Browser capture was attempted against the reachable local Vite server but the provided browser runtime failed before opening the page (`node:process` import blocked by the browser execution environment). No source was changed and no alternate browser automation was substituted.
