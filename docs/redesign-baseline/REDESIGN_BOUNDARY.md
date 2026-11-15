# Redesign boundary

## PRESENTATION LAYER

The following may be changed on a dedicated redesign branch after the missing visual baseline is captured. Changes remain constrained by the preservation column.

| File/component | Safe change type | Must preserve | Risks/dependencies |
|---|---|---|---|
| `src/AppModern.jsx` | wrappers, visual section composition, footer styling | active section order/content or an approved mapped order; all children | removing a child silently removes a product area |
| `FloatingNav.jsx` | appearance, layout, responsive presentation | seven targets, active detection or equivalent, analytics, mobile access | hash-router/anchor interaction |
| `HeroModern.jsx` | composition, typography, decoration, crop with approval | exact identity/copy/services/CTAs/assets/events/alt text | viewport height and portrait crop |
| `AboutModern.jsx` | grids/cards/type/modal styling | exact copy/skills/badges/assets/links/modal functions | recognition image ratios and state |
| `WorkShowcase.jsx` | card/grid presentation | six records, order, thumbnails, URLs, event | wide screenshot cropping |
| `LogoShowCase.jsx` | section/card/modal visuals | logo/PDF/design/gallery content; expand, timer, keyboard, zoom | complex state; 768px JS boundary |
| `SocialMgmt.jsx` | card/platform styling | two records, links, analytics, mobile reveal | nested aspect ratios |
| `ProjectCarousel.jsx` / `MiniAudioPlayer.jsx` | carousel/card/player presentation | eight projects, media, order, controls, links | fixed width, video crop/autoplay, audio state |
| `Contact.jsx` | card/buttons/layout | all exact destinations, VCF, protocols, analytics/fallbacks | dormant e-card code; target/download semantics |
| `index.css`, `styles/modern.css`, Tailwind classes/config extensions | palette, type, spacing, backgrounds, transitions | reduced-motion support, responsive reachability, focus/accessibility | global selectors affect legacy and active components |

## FUNCTIONAL / CONTENT / INFRASTRUCTURE LAYER

Dangerous without a separate migration plan and regression evidence:

- `src/main.jsx`: router choice, AnalyticsTracker, entry import, strict-mode behavior.
- `src/lib/analytics.js` and GA scripts in `index.html`: ID, initialization, page views and event schema.
- `src/content.js` and `src/content/*.json`: exact records, schema, order, URLs, paths, text.
- `src/lib/withBase.js`: public URL/base resolution.
- `index.html`: canonical/social/SEO/icon/preload metadata.
- `public/assets/**`, `public/media/**`: filenames, bytes and public URLs.
- `vite.config.js`, `package.json`, lockfile, workflow, `_redirects`, `.htaccess`: build/deployment/routing contract.
- Environment-variable names and build-target values.

## Candidate-by-candidate rule

```text
FILE: any active JSX presentation component
COMPONENT: mapped in component-map.json
SAFE CHANGE TYPE: layout wrappers, Tailwind/CSS presentation, semantic markup improvements with behavior parity
MUST PRESERVE: all P0/P1/P2 content, media, links, event handlers, IDs, state outcomes and responsive access
RISKS: hidden content, changed reading order, broken anchors, analytics loss, media crop, keyboard/touch regression
DEPENDENCIES: router, content data, withBase, analytics, react-icons, CSS/Tailwind
```

```text
FILE: CSS/Tailwind presentation files
SAFE CHANGE TYPE: controlled design-system replacement
MUST PRESERVE: reduced-motion support, focus visibility, overflow usability, breakpoints until replacements are validated
RISKS: global `*` transitions, exact-768 overlap, modal layering, fixed navigation, carousel overflow
DEPENDENCIES: class strings throughout active and inactive components
```

## Branch/worktree boundary

Do not redesign on baseline `main`. Create a separate redesign branch/worktree from `cf1bf12bfcf687c0bf7e9323f8c2c32f3172e547`, capture the outstanding screenshots first, and compare every milestone to all five JSON maps. Do not commit the pre-existing untracked `nul` or `retry-push.sh` as part of redesign work.
