# Personal Profile pre-redesign baseline report

Audit date: 2026-08-27 (Africa/Johannesburg)

## Source-control baseline

| Field | Recorded value |
|---|---|
| Repository | `D:\\Ndumiso\\Website\\ndu-portfolio` |
| Branch | `main` |
| `PERSONAL_PROFILE_PRE_REDESIGN_BASELINE_SHA` | **`cf1bf12bfcf687c0bf7e9323f8c2c32f3172e547`** |
| Local `origin/main` | `cf1bf12bfcf687c0bf7e9323f8c2c32f3172e547` |
| HEAD matches local `origin/main` | Yes |
| Initial worktree clean | No |
| Initial untracked files | `nul`; `retry-push.sh` |
| Remotes | `origin` fetch/push: `git@github.com:Ndumiso-Y/ndumiso-y.github.io.git` |
| Latest commit | `Update project URLs for KRF and TVEI to new hosting locations` |
| Latest commit author/date | Blaqsteel; 2026-02-26T00:31:58+02:00 |

The two untracked files were present before the audit and were not opened, changed, moved, or removed. Git also emitted a non-project warning because the sandbox could not read `C:\Users\Ndumiso\.config\git\ignore`; this does not change the repository snapshot.

## Technical baseline

| Field | Value |
|---|---|
| Framework | React 18.3.1 single-page application |
| Router | React Router DOM 7.9.5; `HashRouter` by default, `BrowserRouter` for the `web` target |
| Package manager | npm (`package-lock.json`, lockfile v3) |
| Build system | Vite 5.4.19 + `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3.4.17, PostCSS, Autoprefixer, global CSS |
| Default build | `npm run build` (`vite build`) |
| GitHub Pages build | `npm run build:gh` |
| Alternate web build | `npm run build:web` |
| Development | `npm run dev` |
| Output directory | `dist/` |

## Deployment baseline and production assessment

The configured production path is GitHub Pages. `.github/workflows/deploy.yml` runs on pushes to `main`, installs with `npm ci`, runs `npm run build`, uploads `dist`, and deploys via `actions/deploy-pages@v4`. `index.html` declares `https://ndumiso-y.github.io/` as canonical and Open Graph/Twitter URL. The live URL responded during the audit with the same document title.

Production match: **LIKELY, NOT CRYPTOGRAPHICALLY VERIFIED**. HEAD matches the local `origin/main`, and the workflow deploys `main`, but the deployed artifact exposes no commit SHA and no network fetch of the remote Git ref was performed. Do not describe the live artifact as byte-for-byte identical to this SHA without deployment evidence.

Alternate hosting support is present through `public/_redirects` (Netlify SPA fallback), `public/.htaccess` (Apache/cPanel SPA fallback), `build:web`, and `BrowserRouter` selection. `QA.md` describes both targets but is gitignored and is not a deploy input.

## Initial status (verbatim)

```text
?? nul
?? retry-push.sh
```

## Verification

| Check | Result | Evidence |
|---|---|---|
| Build | PASS | `npm run build`; Vite transformed 64 modules and emitted production assets |
| Typecheck | NOT CONFIGURED | No `typecheck` script and no TypeScript project configuration |
| Lint | NOT CONFIGURED | No `lint` script or lint configuration discovered |
| Tests | NOT CONFIGURED | No test script/configuration discovered |

The build emitted only an informational warning that `caniuse-lite` data is 12 months old. No package or browsers-list update was performed.

## Final Git safety check

```text
APPLICATION SOURCE MODIFIED: NONE
DOCUMENTATION FILES CREATED: 18 files under docs/redesign-baseline/
OTHER FILES MODIFIED: NONE
PRE-EXISTING UNTRACKED FILES: nul; retry-push.sh
NEW UNTRACKED FILES: docs/redesign-baseline/ (18 required audit files)
FINAL GIT STATUS: untracked audit directory plus the same two pre-existing untracked files
```

`git diff --name-only` was empty after the audit, proving no tracked application/configuration file was modified. `git status --short --untracked-files=all` listed only the 18 audit files and the same `nul`/`retry-push.sh` entries recorded at the start. Build output remains ignored by `.gitignore`.
