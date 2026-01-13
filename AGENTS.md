# Repository Guidelines

## Project Structure & Module Organization

- `src/pages/` holds route-level Astro pages (for example, `index.astro`, `resume.astro`).
- `src/components/` contains reusable UI components; `src/layouts/` holds page layouts.
- `src/content/` and `src/data/` store site content and structured data.
- `src/styles/` for global styles; `src/images/` for local image assets.
- `public/` hosts static files served as-is (for example, `public/robots.txt`).
- Config lives at `astro.config.mjs`, `tailwind.config.js`, `tsconfig.json`.

## Build, Test, and Development Commands

- Use Node.js 22.x (see `.nvmrc`) to match the repo engine target.
- `npm install` installs dependencies.
- `npm run dev` starts the local dev server at `http://localhost:4321`.
- `npm run build` runs `astro check` and produces the production build in `dist/`.
- `npm run preview` serves the built site locally for verification.
- `npm run astro -- <command>` runs Astro CLI tasks (for example, `npm run astro -- check`).

## Coding Style & Naming Conventions

- Follow existing file style: tabs for indentation, double quotes for strings, and semicolons.
- Keep components in `PascalCase` (for example, `GithubHeatmap.astro`) and data/constants in `camelCase`.
- Prefer colocating assets with usage when possible (for example, `src/images/` for shared images).
- No formatter or linter is enforced in scripts; keep changes consistent with nearby files.

## Testing Guidelines

- No automated test framework is configured in this repo.
- Use `npm run build` as the primary validation (type-checks via `astro check`).
- If adding tests, document the framework and conventions in `README.md`.

## Commit & Pull Request Guidelines

- Commit history uses short, descriptive messages (often lowercase or `Update X`).
- Aim for one focused change per commit and describe the user-visible outcome.
- PRs should include a short summary, screenshots for UI changes, and linked issues when applicable.
