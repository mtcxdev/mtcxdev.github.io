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
- [ ] Remove the old projects/work page and related lightbox/project catalogue from the primary experience.
- [ ] Replace with a single Payre spotlight, using a real screenshot and one outbound website link.
- [ ] Reorganize the page around intro, GitHub activity, tech stack, process/about, contact, and footer.
- [ ] Add a reusable content model for technology categories and icon/logo metadata.

### 2. Visual system and motion
- [ ] Establish responsive spacing, fluid type, accessible contrast, and a layout that does not clip content.
- [ ] Add light/dark theme toggle with persisted preference and system-theme fallback.
- [ ] Add intro/reveal motion with reduced-motion fallback.
- [ ] Add a Three.js pixel-inspired scene with a static fallback, visibility pausing, and constrained rendering cost.
- [ ] Add an optional, lightweight Three.js mini-game with clear controls and graceful fallback.

### 3. Live integrations
- [ ] Add live GitHub contribution/activity presentation using official public endpoints or a configured proxy; handle rate limits and loading/error states.
- [ ] Add live GitHub repository preview links without embedding private information.
- [ ] Add privacy-conscious public page analytics behind explicit configuration; never claim live analytics when unconfigured.

### 4. Verification and delivery
- [ ] Run TypeScript/build/lint checks where available and fix errors.
- [ ] Check responsive layouts, keyboard navigation, theme persistence, reduced motion, and fallback states.
- [ ] Verify Payre screenshot/source and all outbound links.
- [ ] Record actual tests, known limitations, configuration steps, and commit SHAs in this directory.
- [ ] Open a pull request; do not merge without review.

## Progress log

### 2026-10-23 — discovery
- Confirmed repository `mtcxdev/mtcx`, default branch `main`.
- Confirmed React 19, TypeScript, Vite, and Lucide React in the package manifest.
- Current app imports a `Portfolio` section plus lightbox state and uses a dark architectural grid system. The existing projects catalogue is in `src/data/projects.ts`.
- Current manifest has no Three.js dependency; dependency and lockfile handling must be resolved as part of the implementation rather than silently assuming it exists.
- Next: replace the old portfolio composition, add themes and the interactive visual experience, then update this log with verified checks.
