# Route and component map

## Formal routes

No `<Routes>`, `<Route>`, route objects, dynamic parameters, loaders, guards, redirects, or catch-all React routes exist. Both configured routers wrap a single `AppModern` tree.

```text
ROUTE: /
SOURCE FILE: src/main.jsx
ROOT LAYOUT: src/AppModern.jsx
PAGE COMPONENT: AppModern
CHILD COMPONENTS: FloatingNav, HeroModern, AboutModern, WorkShowcase, LogoShowCase, SocialMgmt, ProjectCarousel, MiniAudioPlayer, Contact
NAVIGATION ENTRY: logo/#hero and six section links
INTERNAL LINKS TO ROUTE: all in-page anchors
EXTERNAL LINKS: website cards, project cards, logo PDFs, social/contact links, badge links
DYNAMIC PARAMETERS: none
REDIRECT BEHAVIOUR: none in React; host-level SPA fallbacks only
DIRECT-REFRESH EXPECTATION: root document loads; GitHub Pages defaults to HashRouter; alternate hosts require _redirects or .htaccess
SPECIAL LOGIC: AnalyticsTracker emits page_view for pathname + router hash; build target controls router
PRESERVATION PRIORITY: P0 route path; P1 router/refresh behavior
```

## Hash/anchor navigation

| Anchor | Source section | Page component | Navigation entry | Internal links | Special behavior | Priority |
|---|---|---|---|---|---|---|
| `#hero` | `HeroModern.jsx` | `HeroModern` | NY/icon logo | FloatingNav logo | Active-section scroll detection | P1 |
| `#about` | `AboutModern.jsx` | `AboutModern` | About | FloatingNav | CTA inside section goes to `#contact` | P1/P2 |
| `#websites` | `WorkShowcase.jsx` | `WorkShowcase` | Websites | Hero “View work” | Six outbound website cards | P1/P2 |
| `#graphics` | `LogoShowCase.jsx` | `LogoShowCase` | Graphics | Mobile collapse handlers | Mobile expand/collapse; modal/gallery | P1/P2 |
| `#social` | `SocialMgmt.jsx` | `SocialMgmt` | Social | Mobile collapse handler | Mobile expand/collapse; outbound profiles | P1/P2 |
| `#projects` | `ProjectCarousel.jsx` | `ProjectCarousel` | Projects | FloatingNav | Horizontal scrolling, audio, video | P1/P2 |
| `#contact` | `Contact.jsx` | `Contact` | Contact | Hero and About CTAs | Contact protocols/downloads | P1/P2 |

Desktop navigation links are hidden below Tailwind `md` (768px). There is no hamburger, drawer, select menu, or alternative mobile navigation. The logo remains visible and links to `#hero`; the six section links disappear.

## Host-level route handling

- GitHub Pages: `.github/workflows/deploy.yml` deploys `dist`; default `HashRouter` avoids server path routing. `build:gh` additionally copies `dist/index.html` to `dist/404.html`, but the workflow currently runs `npm run build`, not `build:gh`.
- Netlify: `public/_redirects` rewrites `/*` to `/index.html` with status 200.
- Apache/cPanel: `public/.htaccess` serves existing files/directories and rewrites other paths to `index.html`.
- No application-level 404 UI exists.

## Direct-refresh warning

Only `/` is a real page. Hash anchors should retain the root document on refresh, but the interaction between `HashRouter` and plain `#about`-style links was not browser-verified because visual/browser capture was unavailable. Preserve the current router, link strings, and host fallbacks until this is tested on the target host.
