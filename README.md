# Software Engineering 2.0

A standalone, bilingual talk by Juan G. Carmona. This repository owns the presentation, its source material, diagrams and public assets. [jgcarmona.com](https://jgcarmona.com/) can link to the published talk without owning its code.

## Run locally

Requires Node.js 24 or newer.

```sh
npm ci --ignore-scripts
npm run build
npm run preview -- --host 0.0.0.0
```

Open `/` for Spanish, or `/?lang=en` for English. Share a slide with `#scene=<id>`, for example `/?lang=en#scene=product-definition-model`. The cover contains the EN/ES switch. Arrow keys, Page Up/Down, side clicks and touch swipes navigate the deck.

## Source map

- `deck/` owns the renderer, ES/EN scenes, styles and visual assets.
- `content/` owns the abstract, narrative, coverage and speaker notes. Notes are not published.
- `research/` records sources for the talk.
- `src/` contains only the shared scene model and navigation logic.
- `tests/` verifies navigation, publication and browser behavior.

The ten original files under `deck/public/` are retained byte-for-byte. [OpenSpec](https://github.com/Fission-AI/OpenSpec), [Spec Kit](https://github.com/github/spec-kit) and [Kiro](https://github.com/kirodotdev) logos identify their respective projects.

## Publish

`npm run build` writes a self-contained static site to `dist/`. The connected Cloudflare Pages project should use Node.js 24, `npm ci --ignore-scripts`, `npm run build`, and `dist` as its output directory. A static-assets Worker can also deploy `dist/` with `npm run deploy` using `wrangler.jsonc`, but that is not the current Pages integration. Attach `se2.jgcarmona.com` as a custom domain and verify it before retiring the old published copy.
