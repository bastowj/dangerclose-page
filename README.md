# Danger Close! Painting

A miniature painting blog built with Next.js 16 and Tailwind CSS v4.

## Getting Started

```bash
pnpm install
pnpm dev     # http://localhost:3000
```

## Commands

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `pnpm dev`          | Start dev server with Turbopack           |
| `pnpm build`        | Production build                          |
| `pnpm lint`         | ESLint (warnings fail) + Prettier check   |
| `pnpm typecheck`    | Generate collections, then `tsc --noEmit` |
| `pnpm format`       | Prettier (write)                          |
| `pnpm format:check` | Prettier (verify only)                    |
| `pnpm test`         | Jest tests                                |

Every script runs standalone on a fresh checkout, in any order. `typecheck` is a
gate of its own: `next build` only typechecks its own build graph, so type
errors in test files are caught by `tsc --noEmit` alone.

## Content

Content lives in `content/` and is compiled at build time with Zod-validated
frontmatter:

| Directory           | Format | Renders at         | Filtered by                   |
| ------------------- | ------ | ------------------ | ----------------------------- |
| `content/texts/`    | MDX    | `/texts/[slug]`    | `/texts/category/[category]`  |
| `content/projects/` | MDX    | `/projects/[slug]` | `/projects/ruleset/[ruleset]` |
| `content/images/`   | JSON   | `/images/[slug]`   | `/images/category/[category]` |
| `content/pages/`    | MDX    | `/[slug]`          | —                             |

Category and ruleset pages are generated from the values found in frontmatter —
adding `categories: ["Basing"]` to a post creates `/texts/category/basing` on
the next build.

To add a top-level page, drop an MDX file in `content/pages/` and add an entry
to `navItems` in `src/constants/navigation.ts` — no route file needed.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, dark mode via next-themes
- **Content**: content-collections (build-time MDX with Zod-validated frontmatter)
- **Testing**: Jest (node + jsdom projects), Testing Library
- **Runtime**: Node.js 24

## Deploy

Builds as a standalone Next.js app via `Dockerfile`. Outputs to `.next/standalone`.

```bash
docker build -t dangerclose-page .
docker run -p 3000:3000 dangerclose-page
```
