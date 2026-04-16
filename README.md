# BigJohnn.github.io

This repository is being migrated from a legacy Jekyll blog to an Astro-based static site.

## Current State

- Legacy Jekyll source is still present at the repo root for reference.
- New Astro source lives in `src/`.
- Migrated blog content lives in `src/content/blog/`.
- Structured project pages live in `src/content/projects/`.
- Static assets are served from `public/`.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

GitHub Pages deployment is handled by `.github/workflows/deploy.yml`.

## Migration Notes

- The migration blueprint is documented in `docs/astro-migration-plan.md`.
- Legacy post URLs are preserved under `/YYYY/MM/DD/slug/`.
- The old Jekyll files have not been removed yet.
