# Personal Profile current state

## CURRENT APPLICATION ARCHITECTURE

This is a client-only, one-document React SPA. `index.html` supplies metadata, GA4 bootstrap, and `#root`; `src/main.jsx` creates the React root, chooses the router from the build target, adds page-view tracking, imports both CSS layers, and renders `AppModern`. There are no server functions, API routes, database clients, stores, contexts, or CMS adapters.

```text
index.html
└── src/main.jsx
    ├── HashRouter (default/GitHub Pages) or BrowserRouter (`BUILD_TARGET=web`)
    ├── AnalyticsTracker
    ├── src/index.css
    ├── src/styles/modern.css
    └── src/AppModern.jsx
        ├── components/modern/FloatingNav.jsx
        ├── features/modern/HeroModern.jsx
        ├── features/modern/AboutModern.jsx
        │   ├── content/about.json
        │   └── content.js → badges
        ├── features/modern/WorkShowcase.jsx
        │   └── content/websites.json
        ├── components/LogoShowCase.jsx
        │   └── content.js → logos + tvei
        ├── components/SocialMgmt.jsx
        │   └── content.js → social
        ├── features/modern/ProjectCarousel.jsx
        │   ├── content/projects.json
        │   └── components/modern/MiniAudioPlayer.jsx
        ├── components/Contact.jsx
        │   └── content.js → contact
        └── inline footer
```

### Entry points and layout

- `index.html`: HTML shell, SEO/social metadata, favicon, hero preload, GA4 loader/config, and Vite module entry.
- `src/main.jsx`: production entry. It defaults `VITE_HOST_TARGET` to `gh`, selects `HashRouter`, tracks location changes, and renders `AppModern` inside `React.StrictMode`.
- `src/AppModern.jsx`: current root composition and section order. It is the only app imported by `main.jsx`.
- `src/App.jsx`: preserved alternate/older composition; not reachable from the current entry.
- There is no route-specific root layout. `AppModern` is the single shared layout.

### Current rendered section order

1. Fixed floating navigation
2. `#hero` — identity, services, portrait, CTAs, QR connect card
3. `#about` — portrait, biography, skills, badges/recognition and modal
4. `#websites` — six external website cards
5. `#graphics` — logo/PDF work, TVEI/Hakem design cards, gallery/zoom modal
6. `#social` — two social-management cards and outbound platform links
7. `#projects` — autoplay intro video and horizontal eight-project/audio carousel
8. `#contact` — WhatsApp, email, phone, VCF, social links
9. Inline copyright footer

### State, hooks, and utilities

- State is component-local (`useState`, `useRef`, `useMemo`, `useEffect`); no global store/provider exists beyond the router.
- `src/lib/analytics.js`: GA event wrappers. `initGA` exists but is not called; the inline script in `index.html` initializes `gtag`.
- `src/lib/withBase.js`: prefixes local public paths with `import.meta.env.BASE_URL` and leaves HTTP(S) links unchanged.
- `src/lib/cn.js`: joins truthy class strings; used by reusable UI primitives.
- `src/Theme.jsx`: legacy runtime CSS-variable palette setter; not in the active `AppModern` graph.
- `src/ErrorBoundary.jsx`: preserved error boundary module; not mounted by `main.jsx`.

### Styling and animation

- `src/index.css`: Tailwind layers plus legacy/global component utilities, smooth scrolling, `.section-offset`, keyframes, hover effects, and a custom `max-width: 768px` media query.
- `src/styles/modern.css`: current dark-first tokens, glass/card utilities, responsive `clamp()` type/spacing variables, reveal animations, scrollbar and selection styles.
- `tailwind.config.js`: default Tailwind breakpoints (sm 640, md 768, lg 1024, xl 1280, 2xl 1536) with custom brand, shadows, radii, and animations.
- Motion is CSS/Tailwind and local timers/transitions; there is no third-party animation library.
- `index.css` contains a `prefers-reduced-motion: reduce` rule that collapses animation/transition durations and disables smooth scrolling.

### Icons, fonts, and assets

- Icons: `react-icons` plus inline SVGs. No local SVG files were found.
- Font: CSS requests `Inter` first but does not import or self-host it; the stack falls back to system UI fonts.
- Public assets: `public/assets/` and `public/media/`; 170 media/document files when three malformed JPEG filenames are included.
- There is no manifest, font directory, API directory, or server directory.

### Content sources

- Active structured data: `src/content/about.json`, `websites.json`, `projects.json`.
- Active mixed data: `src/content.js` for badges, logos, design work, social management, contact, brand color, and section introductions.
- `hero.json` and `contact.json` support alternate/inactive component implementations. The active hero text is hardcoded in `HeroModern`; the active contact uses `content.js`.
- There is no remote CMS/API content.

### Preserved inactive/alternate architecture

The repository contains older or alternate versions in `src/components/`, `src/features/about`, `src/features/contact`, `src/features/hero`, `src/features/projects`, `src/features/websites`, `src/features/modern/ContactModern.jsx`, `SkillsModern.jsx`, `App.jsx`, and `ProjectsOld.jsx.bak`. These modules are not reachable from `main.jsx` at the baseline SHA. They are P4/P2 evidence, not authorization to delete them. Several contain content and media references that are not in the active composition.

### Configuration files

- `package.json`, `package-lock.json`: commands and dependency lock.
- `vite.config.js`: effective Vite configuration, alias `@ → src`, build target injection, base `/`, dev port 5173.
- `vite.config.mjs`: second Vite config candidate with base `/`; Vite chooses `vite.config.js` when invoked normally. Preserve until ownership is confirmed.
- `tailwind.config.js`, `postcss.config.js`: styling toolchain.
- `.github/workflows/deploy.yml`: GitHub Pages CI/CD.
- `public/_redirects`, `public/.htaccess`: alternate-host SPA fallbacks.
- `.gitignore`: ignores dependencies, build output, `.env`, logs, `dist.zip`, `.claude`, and `QA.md`.

### Architectural risks

1. Active and inactive component families duplicate section IDs and concepts; a redesign could import the wrong version.
2. Two content systems (`content.js` and JSON files) contain overlapping but non-identical project/site/contact data.
3. Hash-based router selection and ordinary `#section` links share the URL hash; navigation behavior must be regression-tested on GitHub Pages.
4. Absolute public asset paths rely on root hosting; renaming or moving any asset breaks data-driven references and metadata.
5. The current intro video is 16:9 but rendered inside an inline 1080:1350 frame with `object-cover`, causing deliberate/actual cropping that must be visually baselined before change.
