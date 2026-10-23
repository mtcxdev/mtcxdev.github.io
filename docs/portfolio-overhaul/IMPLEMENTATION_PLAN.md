# Portfolio Experience Overhaul

## Goal
Rebuild the MTCX Dev portfolio as a responsive, memorable developer portfolio while removing the old projects/work catalogue. Keep Payre as the only featured product, with a current visual preview and a single outbound link to the live site.

## Guardrails
- Work on `feat/portfolio-experience-overhaul`; never push directly to `main`.
- Commit after each meaningful implementation milestone so work survives tool/session resets.
- Keep essential accessibility affordances and contact paths.
- Avoid fixed-width/clamped layouts; use fluid type and responsive layouts.
- Respect `prefers-reduced-motion`, pause animation when off-screen, and keep the game optional.
- Do not fabricate GitHub metrics or analytics. Label unavailable integrations and document configuration.

## Implementation sequence and status

### Discovery and stack audit
- [x] Confirmed repository `mtcxdev/mtcx`, default branch `main`, React 19 + TypeScript + Vite, and npm lockfile.
- [x] Reviewed manifests across `mt-flex-jsx`, `mt-flights`, `wasell-ng`, `gasless-ui`, `Payre-IO/payre-web`, and `Payre-IO/payre-checkout` via Composio.
- [x] Grouped technology logos into Languages, Frameworks & runtimes, Libraries & packages, Web3 & blockchain, Data & infrastructure, and Software & workflow.

### Content and design
- [x] Removed the projects/work catalogue and lightbox from the primary app composition.
- [x] Replaced the catalogue with a single Payre spotlight, using a fresh 1200×900 screenshot from `https://payre.onrender.com` and a direct outbound link to the live site.
- [x] Reorganized the page around intro, about, stack, live GitHub activity/repositories, playful experiment, contact, and footer.
- [x] Added a responsive light/dark theme toggle with persisted preference and system-theme fallback.
- [x] Added fluid responsive layouts, keyboard focus styling, and reduced-motion support.

### Interactive experiences
- [x] Added a lazy-loaded, instanced Three.js pixel scene. It caps device pixel ratio, observes visibility/resizes, respects reduced motion, and disposes resources.
- [x] Added an optional Three.js cube-catching mini-game that starts on demand and disposes resources on unmount.
- [x] Vite emits Three.js as a separate chunk (~485 kB raw / ~121 kB gzip), keeping it out of the initial JS download.

### Live integrations
- [x] Added a live public contribution graph and recent public repositories for `mtcxdev`, with loading/error states.
- [x] Added direct GitHub profile/repository links.
- [x] Added optional GoatCounter page analytics through `VITE_GOATCOUNTER_CODE`. No analytics script is loaded if the variable is unset.

### Verification and remaining work
- [x] `tsc -b` and `vite build` passed after the Three.js components and lazy imports were added. Build output confirmed separate `PixelScene`, `PixelCatchGame`, and Three.js chunks.
- [ ] Re-run the production build after the final technology-list-only change. The persistent Composio sandbox later timed out during npm dependency restoration, so this exact final HEAD was not re-verified.
- [ ] Browser-level desktop/mobile, theme-toggle, image-load, and game-interaction smoke test.
- [ ] Review logo fallback availability for every Simple Icons slug and refine any missing logos.
- [ ] `npm run lint` is not passing: Oxlint reported a large number of warnings/errors in generated `dist` and dependency/runtime files after build, so it needs ignore/config cleanup and a source-only lint run.
- [ ] Review the draft PR and CI before merge. This work has not been deployed to production.

## Configuration
- Optional public page analytics: set `VITE_GOATCOUNTER_CODE` to the site's GoatCounter code. If unset, no analytics script is loaded. Do not store secrets in `VITE_*` variables.
- GitHub activity is loaded from public endpoints for `mtcxdev`. The contribution provider and GitHub API may rate-limit or become unavailable; the UI has a graceful error state.

## Progress log

### 2026-10-23 — implementation checkpoints
- `c296262b0cd345dbac5b30844289ccfdd80414e9`: committed implementation plan and work log before substantial edits.
- `1e21a949fedc9daaf6eff635928ee55ebb3adb7a`: replaced the old portfolio composition, added the new page structure, themes, GitHub integrations, and optional analytics.
- `70adbdee496f70394b89e117359fb7f27fdf91bb`: added Three.js dependencies and instanced pixel scene checkpoint.
- `f8bd26938d3daed97d1b46924c34c9f61cbcb743`: captured and committed the actual Payre screenshot, replaced the mock preview, and added the Three.js mini-game.
- `d94a0e645dc5e873650f8f43ec7b245655332656`: repaired app composition and lazy-loaded Three.js experiences; production build passed.
- `d03cfcf9fe490a79e705477a24cbe39828c48fb0`: aligned the tech stack taxonomy to reviewed personal and organization manifests.
- A fresh Payre screenshot was checked for real page content before committing; it is stored at `public/projects/payre-live.png`.
- No changes have been pushed to `main`, and no deployment has been triggered by this work.
