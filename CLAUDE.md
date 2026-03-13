# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm run format   # Prettier formatting
```

## Architecture

Next.js 15 portfolio/blog site for "Danger Close! Painting". Uses the App Router (`src/app/`) as the primary routing mechanism; the `pages/` directory exists only for blog post routes (`pages/posts/`).

**Routing split:**
- `src/app/` — App Router: root layout, sitemap, robots.txt
- `pages/posts/` — Pages Router: blog post rendering via `next-mdx-remote` + `gray-matter`

**Content:** Blog posts live in `content/` as MDX files with front-matter. `gray-matter` parses metadata; `next-mdx-remote` renders MDX.

**Styling:** Tailwind CSS v4 (configured via PostCSS). Dark mode via `next-themes`. Path alias `@/*` maps to `./src/*`.

**Key components** (`src/components/`):
- `layout.tsx` — page wrapper used across routes
- `showcase.tsx` — Swiper image carousel on the homepage
- `latest.tsx` — blog post grid
- `providers/theme-provider.tsx` — wraps app with next-themes

**SEO:** Metadata uses Next.js Metadata API with title template `"bastow.de - %s"`. Sitemap and robots.txt are generated via `src/app/sitemap.tsx` and `src/app/robots.tsx`.
