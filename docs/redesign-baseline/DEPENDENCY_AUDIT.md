# Dependency audit

Package manager: npm. Lockfile: `package-lock.json` v3. Package version: `0.0.3`. No packages were installed, removed, or upgraded.

## Production dependencies

| Package | Declared / locked | Category | Evidence of use | Baseline assessment |
|---|---|---|---|---|
| `react` | `^18.3.1` / 18.3.1 | Framework | All JSX modules and hooks | Used, P0 |
| `react-dom` | `^18.3.1` / 18.3.1 | Framework | `createRoot` in `src/main.jsx` | Used, P0 |
| `react-icons` | `^5.2.1` / 5.5.0 | Icons/UI | About, Social, Contact and alternate components | Used, P2 |
| `react-router-dom` | `^7.9.5` / 7.9.5 | Routing | BrowserRouter/HashRouter/useLocation | Used, P0/P1 |

## Development/build dependencies

| Package | Declared / locked | Category | Evidence of use | Assessment |
|---|---|---|---|---|
| `@types/react` | `^18.3.5` / 18.3.24 | Development | Editor/type metadata; JS project | Present; no typecheck script |
| `@types/react-dom` | `^18.3.0` / 18.3.7 | Development | Editor/type metadata | Present; no typecheck script |
| `@vitejs/plugin-react` | `^4.3.1` / 4.7.0 | Build | both Vite config files | Used |
| `autoprefixer` | `^10.4.20` / 10.4.21 | Styling/build | PostCSS config | Used |
| `cross-env` | `^7.0.3` / 7.0.3 | Build | `build:gh`, `build:web` | Used |
| `ffmpeg-static` | `^5.2.0` / 5.2.0 | Media tooling | `scripts/transcode-videos.mjs` | Used by optional script, not runtime |
| `fluent-ffmpeg` | `^2.1.3` / 2.1.3 | Media tooling | transcode script | Used by optional script, not runtime |
| `postcss` | `^8.4.41` / 8.5.6 | Styling/build | PostCSS/Vite | Used |
| `sharp` | `^0.33.4` / 0.33.5 | Media tooling | `scripts/optimize-images.mjs` | Used by optional script, not runtime |
| `tailwindcss` | `^3.4.10` / 3.4.17 | Styling | CSS directives/config | Used |
| `vite` | `^5.4.3` / 5.4.19 | Build/dev | all build/dev scripts | Used |

No testing, linting, form, API, data-fetching, animation, state-management, schema, or head-management package is declared.

## Build configuration observations

- `vite.config.js` is the effective normal config and injects the host target. `vite.config.mjs` is a second candidate and may be legacy; do not remove it without confirmation.
- Tailwind scans `index.html` and all `src/**/*.{js,jsx,ts,tsx}` including inactive files, so legacy classes can influence generated CSS.
- The build passed with 64 transformed modules. `caniuse-lite` age warning is informational and was not acted on.
- Optional image/video scripts are destructive/derivative asset tooling and were not run during the audit.

## Usage conclusion

Every production dependency has a live import. Every development dependency has a build/tooling or editor purpose. No dependency is approved for removal, even if later analysis finds a narrower active graph.
