# Danger Close! Painting

A miniature painting blog built with Next.js 16 and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm test` | Jest tests |

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, dark mode via next-themes
- **Content**: MDX via next-mdx-remote + gray-matter
- **Runtime**: Node.js 24

## Deploy

Builds as a standalone Next.js app via `Dockerfile`. Outputs to `.next/standalone`.

```bash
docker build -t dangerclose-page .
docker run -p 3000:3000 dangerclose-page
```
