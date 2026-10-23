# MTCX Dev Portfolio

The personal developer portfolio of Timothy, Lead Developer at MTCX Media. The site presents selected work, engineering interests, tools, and public GitHub activity.

**Live site:** https://mtcxdev.github.io/

## What is included

- A responsive portfolio layout with dark and light themes.
- An interactive, viewport-adaptive Snake game preview.
- A Three.js-powered pixel-art visual scene.
- A personal profile section and links to X and GitHub.
- A featured project section for Payre.
- A grouped technology stack overview.
- Live public repository and contribution activity loaded from GitHub-related APIs.
- Contact links and basic page-view reporting.

## Technology

- React
- TypeScript
- Vite
- Three.js
- Lucide React
- Oxlint

## Run locally

Use a current Node.js release compatible with the Vite version in `package.json`.

```bash
git clone https://github.com/mtcxdev/mtcxdev.github.io.git
cd mtcxdev.github.io
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Quality checks and production build

Run the configured linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run preview
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Main page structure and portfolio sections |
| `src/App.css` | Site layout, themes, and responsive styling |
| `src/components/` | Interactive visual and game components |
| `public/` | Static assets served with the site |
| `workers/` | Worker-related code used by the project |

## Deployment

The public site is hosted through GitHub Pages. Changes merged to the default branch are published by the repository's configured deployment workflow.

## Links

- [Live portfolio](https://mtcxdev.github.io/)
- [GitHub profile](https://github.com/mtcxdev)
- [X profile](https://x.com/mtcxdev)
- [Email](mailto:devmtcx@gmail.com)
