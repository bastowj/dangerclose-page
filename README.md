# Danger Close! Painting

A miniature painting blog built with Next.js 16 and Tailwind CSS v4.

## Getting Started

```bash
pnpm install
pnpm dev     # http://localhost:3000
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |
| `pnpm test` | Jest tests |

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, dark mode via next-themes
- **Content**: content-collections (build-time MDX with Zod-validated frontmatter)
- **Runtime**: Node.js 24

## Deploy

Builds as a standalone Next.js app via `Dockerfile`. Outputs to `.next/standalone`.

```bash
docker build -t dangerclose-page .
docker run -p 3000:3000 dangerclose-page
```
