# Preservation contract

This contract governs future UI redesign work. “Presentation may change” never authorizes content, path, event, route, responsive-behavior, or integration loss.

## Classification rules

- **P0 — must preserve exactly:** identifiers, routes/URLs/paths, analytics and deployment/SEO configuration, baseline reference.
- **P1 — function must remain; UI may change:** navigation, protocols, downloads, media controls, modals/carousels, tracking events, fallbacks.
- **P2 — content/media must remain; presentation may change:** all profile/project/site/design/social/recognition content and active media.
- **P3 — UI freely redesignable:** colors, typography, spacing, composition, card treatments and decorative motion when underlying P0–P2 contracts remain.
- **P4 — possibly legacy:** unreachable/duplicate components, alternate datasets, unreferenced variants, malformed/placeholder files. Removal always requires human approval.

## Contract matrix

| Element | Current location | Class | What must survive | UI change allowed | Removal allowed |
|---|---|---:|---|---|---|
| Baseline SHA | `BASELINE_REPORT.md` | P0 | Exact recoverable commit | No | No |
| Root route and section anchors | `main.jsx`, active sections | P0/P1 | `/`, all seven IDs, direct refresh and navigation | Presentation only | No |
| Router target selection | `main.jsx`, `vite.config.js` | P0 | gh HashRouter/web BrowserRouter behavior | No functional change | No |
| GitHub Pages workflow | `.github/workflows/deploy.yml` | P0 | trigger, permissions, build/output/deploy | No | No |
| Alternate SPA fallbacks | `public/_redirects`, `.htaccess` | P0/P1 | rewrite behavior | No functional change | No |
| GA4 | `index.html`, analytics modules | P0/P1 | ID, manual page views, event names/handlers | Implementation may be refactored only with regression proof | No |
| SEO/social metadata | `index.html` | P0 | values, canonical, image paths, icons/preload | Additions allowed separately | No |
| Hero portraits/QR | public assets + Hero/About | P2 | exact assets, identity, QR meaning | Layout/crop only after visual approval | No |
| Navbar | `FloatingNav.jsx` | P1 | links, active state, section access, analytics | Yes | No |
| About/skills/badges | JSON/content + AboutModern | P1/P2 | exact copy, 11 skills, three recognition items and modal access | Yes | No |
| Six website cards | `websites.json` | P1/P2 | names/outcomes/URLs/thumbnails/order | Yes | No |
| Logos/design gallery | `content.js`, LogoShowCase | P1/P2 | all items, PDFs, gallery, zoom, keyboard and timer behavior | Yes | No |
| Social management | `content.js`, SocialMgmt | P1/P2 | both brands, text, media, URLs, mobile reveal | Yes | No |
| Learning journey | `projects.json`, carousel | P1/P2 | eight projects, order, demos, audio, video and controls | Yes | No |
| Contact mechanisms | `content.js`, Contact | P0/P1/P2 | exact destinations, VCF, protocols, labels, fallbacks | Yes | No |
| Visual system | CSS/Tailwind classes | P3 | only accessibility/motion contracts | Yes | Yes, only if no P0–P2 effect |
| Alternate component family | `App.jsx`, duplicate components/features | P4/P2 | evidence/content until reviewed | N/A | Approval required |
| Unreferenced AVIF/WebP/JPG variants | `public/assets` | P4 | files and paths until reviewed | N/A | Approval required |
| Missing referenced assets | three paths in content | P4 | reference evidence; do not silently rewrite | N/A | Approval required |
| 1×1 placeholders/malformed filenames | `public/assets` | P4 | exact files/paths until reviewed | N/A | Approval required |

## Non-negotiable regression gates

1. `media-inventory.json`: no P0/P1/P2 path disappears or loses expected usage.
2. `route-map.json`: root and all anchor targets remain reachable; direct refresh verified on target host.
3. `component-map.json`: every active function is retained or replaced by an equivalent with documented mapping.
4. `integration-map.json`: GA4/deployment/contact integration settings and events survive.
5. `preservation-map.json`: every P0–P2 contract passes review.
6. Desktop/tablet/mobile screenshots are captured and compared before merge.
7. P4 deletion requires explicit human approval; “unused” is not sufficient.
