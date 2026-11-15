# Integrations and configuration

No secrets were printed or read. No `.env` file was inspected; `.env` is gitignored. Only identifier and environment-variable names present in tracked source/configuration are recorded.

## Integration inventory

### Google Analytics 4

```text
SERVICE: Google Analytics 4 via gtag.js
IMPLEMENTATION LOCATION: index.html; src/lib/analytics.js; src/main.jsx; tracked UI components
PURPOSE: SPA page views and selected CTA/navigation/outbound interactions
CONFIG SOURCE: hardcoded public measurement identifier
PUBLIC IDENTIFIER: G-2ZPD8342CY
ENVIRONMENT VARIABLE NAMES: none
DEPENDENCIES: https://www.googletagmanager.com/gtag/js; window.dataLayer/window.gtag
ROUTES / COMPONENTS USING IT: root SPA, FloatingNav, HeroModern, WorkShowcase, LogoShowCase, SocialMgmt, Contact
REDESIGN RISK: losing inline bootstrap, AnalyticsTracker, IDs, event names, or click handlers; duplicate initialization if implementations are combined
PRESERVATION PRIORITY: P0 initialization/ID; P1 events
```

`index.html` loads gtag.js and configures GA4 with `send_page_view: false`. `AnalyticsTracker` calls `trackPageView` after the initial mount and whenever React Router location changes. Because `HashRouter` owns the fragment and section links also use fragments, page-path semantics must be rechecked rather than rewritten.

`initGA()` in `src/lib/analytics.js` is currently unused. It first checks `window.gtag`, so the inline initialization prevents a second script insertion. Preserve this relationship.

Custom event names present:

- `page_view`
- `cta_get_in_touch_click`
- `cta_view_work_click`
- `nav_about_click`, `nav_websites_click`, `nav_graphics_click`, `nav_social_click`, `nav_projects_click`, `nav_contact_click`, fallback `nav_click`
- `contact_whatsapp_click`, `contact_email_click`, `contact_linkedin_click`, `ecard_link_click`
- `web_project_view_click`, `graphics_slides_view_click`, `social_profile_click`

There is no consent banner/mode, anonymization option, form tracking, download tracking, project-card tracking, audio/video tracking, or dedicated outbound-link listener. Contact Facebook and Instagram intentionally/currently call `trackLinkedInClick`, emitting `contact_linkedin_click` with contextual labels. The hero QR emits `ecard_link_click` although it has no outbound anchor.

### External links and protocols

- Portfolio/client websites, Treehouse project demos, badge sites/posts, and social profiles open in new tabs.
- Contact mechanisms: WhatsApp URL, `mailto:`, `tel:`, local VCF, and social URLs.
- E-card URL: `https://www.embarkdigitals.com/ecard`; dormant iframe preview code exists.
- No form provider, email API, webhook, map, YouTube/Vimeo embed, social embed SDK, database, CMS, payment, authentication, or backend API was found.

### Build/deployment services

| Service | Location | Purpose | Priority |
|---|---|---|---|
| GitHub Pages | `.github/workflows/deploy.yml` | Primary configured deployment from `main` | P0 |
| GitHub Actions | same | npm CI/build/artifact/deploy pipeline | P0 |
| Netlify-compatible rewrite | `public/_redirects` | SPA fallback for alternate hosting | P0/P1 |
| Apache/cPanel rewrite | `public/.htaccess` | SPA fallback for alternate hosting | P0/P1 |

There is no Vercel, Cloudflare, Firebase Hosting, or Netlify project configuration beyond `_redirects`.

## Environment-variable names and compile-time values

| Name | Location | Meaning | Secret? |
|---|---|---|---|
| `BUILD_TARGET` | `vite.config.js`, package scripts | Selects `gh` or `web`; injected as `VITE_HOST_TARGET` | No |
| `BASE_PATH` | `vite.config.js`, package scripts | Overrides Vite base; currently `/` for both targets | No |
| `VITE_HOST_TARGET` | `src/main.jsx` / Vite define | Chooses HashRouter or BrowserRouter | No |
| `BASE_URL` | `src/lib/withBase.js` | Vite built-in public base URL | No |
| `DEV` | `src/lib/analytics.js` | Vite built-in development flag for console logging | No |

No private key, token, password, Supabase/Firebase credential, or API secret name was found in application source.

## Configuration preservation requirements

1. Preserve measurement ID `G-2ZPD8342CY`, `send_page_view: false`, and the manual SPA page-view path unless analytics is deliberately migrated.
2. Preserve all current event names and their user-action attachment; additions/fixes require an analytics change plan.
3. Preserve build-target selection, base-path behavior, `@` alias, dev port assumptions, and public absolute paths.
4. Preserve workflow permissions, `main` trigger, Node 20, `npm ci`, `dist` upload, and Pages deploy action.
5. Preserve both SPA fallback files for alternate hosting.
6. Do not expose or commit environment values during redesign.
