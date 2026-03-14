# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm run format   # Auto-format with Prettier
npm test         # Run Jest tests
```

## Architecture

Next.js 16 blog/portfolio site for "Danger Close! Painting". Pure **App Router** — all routes are under `src/app/`.

**Content system**: Blog posts live as MDX files in `content/`. Parsed at build time using `gray-matter` (frontmatter) and `next-mdx-remote`. Add utility functions in `src/lib/` for reading and parsing (e.g. `blog.ts`, `mdx.ts`).

**Routing**: All routes under `src/app/` using the App Router. Blog posts are at `/texts/[slug]`.

**Styling**: Tailwind CSS v4 via PostCSS — no `tailwind.config.*` file, uses v4 defaults. Global styles in `src/app/globals.css`.

**Styling convention**: All component styles are defined as named classes in the `@layer components` block in `globals.css`. Do not use inline Tailwind utility classes directly in JSX for anything beyond trivial one-offs — extract them into a named class in `globals.css` instead. Use `color:var(--token)` syntax when referencing CSS custom properties (e.g. `text-[color:var(--foreground-btn)]`).

Tailwind variant classes (`group`, `group-hover`, `peer`, etc.) cannot be used inside `@apply` in Tailwind v4 — they will cause a build error. Use native CSS selectors instead (e.g. `.image-card:hover .image-card-img { @apply opacity-60; }`).

**Theming**: Dark/light mode via `next-themes`, wrapped in `src/components/providers/theme-provider.tsx` at the root layout.

**Site config**: `src/constants/config.ts` holds `SITE_CONFIG` (baseUrl, title, description, author). `src/constants/navigation.ts` holds `navItems` and `footerNavItems`. Add any new site-wide URLs or identifiers to these files rather than inlining them.

**Icons**: `@heroicons/react/24/outline` — used for theme toggle (`SunIcon`, `MoonIcon`) and mobile menu (`Bars3Icon`, `XMarkIcon`).

**Key components** (`src/components/`):
- `Navbar.tsx` — top nav with theme toggle and mobile menu, driven by `navItems`
- `Footer.tsx` — footer with nav links and copyright, driven by `footerNavItems`
- `showcase.tsx` — Swiper carousel on the homepage (client component)
- `latest.tsx` — blog post grid on the homepage
- `providers/theme-provider.tsx` — wraps app with next-themes

**SEO**: Metadata uses Next.js Metadata API via `SITE_CONFIG`. Sitemap and robots.txt generated via `src/app/sitemap.tsx` and `src/app/robots.tsx`.

**Path alias**: `@/*` maps to `src/*`.

## Git hooks

A local pre-commit hook at `.git/hooks/pre-commit` runs `npm run lint && npm test` before every commit. It is not tracked by git.
