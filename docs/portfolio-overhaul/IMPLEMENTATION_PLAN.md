# Portfolio Experience Overhaul

## Goal
Rebuild the MTCX Dev portfolio as a responsive, memorable developer portfolio while removing the old projects/work catalogue. Keep Payre as the only featured product, with a current visual preview and a single outbound link to the live site.

## Guardrails
- Work on `feat/portfolio-experience-overhaul`; never push directly to `main`.
- Commit after each meaningful implementation milestone so work survives tool/session resets.
- Keep existing contact paths and essential accessibility affordances.
- Avoid fixed-width/clamped layouts; test narrow mobile, tablet, laptop, and wide desktop layouts.
- Respect `prefers-reduced-motion`, pause animation when off-screen, and keep the optional game non-blocking.
- Do not fabricate GitHub metrics or analytics. Label unavailable integrations and document required configuration.

## Implementation sequence
### 0. Baseline and discovery
- [x] Confirm repository `mtcxdev/mtcx`, default branch `main`, and current React + TypeScript + Vite stack through Composio.
- [x] Identify existing `Portfolio` section and current monochrome design system.
- [ ] Inspect all relevant source components and assets; inventory owned and organization repositories for real stack evidence.
- [ ] Capture a fresh Payre preview from `https://payre.onrender.com` and confirm the target link.

### 1. Architecture and content
- [x] Remove the old projects/work catalogue and lightbox from the primary app composition.
- [x] Replace the project grid with one Payre spotlight and a single outbound website link.
- [x] Reorganize around intro, GitHub activity, tech stack, about, contact, and footer.
- [ ] Replace the illustrative Payre preview with a captured screenshot of the actual live site.
- [ ] Validate all technology claims against owned and organization repositories.

### 2. Visual system and motion
- [x] Establish responsive spacing, fluid type, accessible contrast, and mobile layouts.
- [x] Add light/dark theme toggle with persisted preference and system-theme fallback.
- [x] Add animated pixel field with reduced-motion fallback and visibility-aware rendering.
- [ ] Replace the canvas pixel field and mini-game with a lazy-loaded, optimized Three.js scene/game.

### 3. Live integrations
- [x] Add live GitHub contribution activity and recent public repositories with loading/error states.
- [x] Add live GitHub profile/repository preview links.
- [x] Add privacy-conscious public page analytics behind `VITE_GOATCOUNTER_CODE` configuration.
- [ ] Verify live endpoints, rate limits, analytics configuration, and privacy notice requirements.

### 4. Verification and delivery
- [ ] Run TypeScript/build/lint checks and fix errors.
- [ ] Check keyboard navigation, theme persistence, reduced motion, responsive layout, and fallback states.
- [ ] Verify Payre screenshot/source and all outbound links.
- [ ] Record actual tests, known limitations, configuration steps, and commit SHAs here.
- [ ] Open a pull request; do not merge without review.

## Configuration
- Optional public page analytics: set `VITE_GOATCOUNTER_CODE` to the site's GoatCounter code. If unset, no analytics script is loaded. Do not store secrets in `VITE_*` variables.
- GitHub activity is loaded from public endpoints for `mtcxdev`. The contribution provider and GitHub API may rate-limit or become unavailable; the UI has a graceful error state.

## Progress log
### 2026-10-23 — discovery and first implementation milestone
- Confirmed repository `mtcxdev/mtcx`, default branch `main`.
- Confirmed React 19, TypeScript, Vite, Lucide React, and an npm lockfile.
- Replaced the former `Portfolio`/lightbox composition with a new single-page developer portfolio, a single Payre spotlight, grouped technology stack, live GitHub contribution graph/recent repositories, contact CTA, and mini-game.
- Added light/dark theme persistence, responsive layouts, reduced-motion styling, and optional GoatCounter configuration.
- Important remaining tasks: capture a real Payre screenshot (the current preview is a CSS mock and must not be represented as an actual screenshot), implement true Three.js rendering/game rather than the initial lightweight canvas, validate technology inventory from organization repos, and run build/lint checks.
