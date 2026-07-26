# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start dev server with Turbopack (localhost:3000)
pnpm build         # Production build
pnpm lint          # eslint . --max-warnings 0 && prettier --check .
pnpm typecheck     # content-collections build && tsc --noEmit
pnpm format        # Auto-format with Prettier
pnpm format:check  # Verify formatting only
pnpm test          # Run Jest tests
```

`lint` is both gates. Warnings fail it, so they cannot pile up unread — to accept one, scope the rule off in `eslint.config.mjs`. It also runs `prettier --check`, which `eslint-config-prettier` does **not** do: that only switches off rules which would fight Prettier.

`typecheck` generates the collections first, because `tsc` resolves the `content-collections` alias to `.content-collections/generated`, which is gitignored. Without that step the script fails on a fresh checkout with a wall of `TS2307`/`TS7006` noise, so **keep the `content-collections build` prefix** — it takes ~100ms and makes the script order-independent.

Run `typecheck` as its own gate: `next build` only typechecks files in its build graph, so **type errors in `__tests__/` are invisible to the build** and `tsc --noEmit` is the only thing that catches them.

**After changing dependencies**, run `pnpm audit` and record fixes or accepted findings in `CVE.log`. Raise transitive pins with `pnpm.overrides` in `package.json`.

## Architecture

Next.js 16 blog/portfolio site for "Danger Close! Painting". Pure **App Router** — all routes are under `src/app/`.

**Content system**: Four collections, compiled at build time by `content-collections` with Zod-validated frontmatter. Collections are defined in `content-collections.ts` at the repo root:

| Collection | Source              | Format | Accessor lib          |
| ---------- | ------------------- | ------ | --------------------- |
| `texts`    | `content/texts/`    | MDX    | `src/lib/blog.ts`     |
| `projects` | `content/projects/` | MDX    | `src/lib/projects.ts` |
| `images`   | `content/images/`   | JSON   | `src/lib/images.ts`   |
| `pages`    | `content/pages/`    | MDX    | `src/lib/pages.ts`    |

Always consume the generated `allTexts` / `allProjects` / `allImages` / `allPages` arrays through the `src/lib/*` accessors rather than importing `content-collections` directly in a route.

**Document shape**: the accessors return **flat** objects — `post.title`, not `post.frontmatter.title`. Each module has a private `toX()` mapper whose only job is normalising content-collections' nullish frontmatter (`T | null | undefined`) down to `undefined`. Keep new fields flat.

**Routing**:

- `/texts`, `/texts/[slug]` — blog posts
- `/texts/category/[category]` — posts filtered by category
- `/projects`, `/projects/[slug]` — projects (detail page also renders that project's images)
- `/projects/ruleset/[ruleset]` — projects filtered by ruleset
- `/images`, `/images/[slug]` — image gallery
- `/images/category/[category]` — gallery images filtered by category
- `/[slug]` — top-level static pages, generated from the `pages` collection via `generateStaticParams`. `dynamicParams = false`, so unknown slugs 404. **Do not add a hand-written route file for a static page** — add an MDX file to `content/pages/` and a `navItems` entry instead.
- `/feed.xml` — RSS route handler

**Slugs**: a content file's name becomes its public URL verbatim and is never slugified, because that would silently rewrite published URLs. `assertSafeSlug()` therefore throws at build time on any filename outside `[a-zA-Z0-9_-]+`. Taxonomy values are the opposite case — see below.

**Taxonomy**: category/ruleset values are free text in frontmatter and are turned into URL segments by `slugify()` in `src/lib/slug.ts` ("Battlegroup Modern Unofficial" → `battlegroup-modern-unofficial`). Never build a taxonomy URL by hand — use `categoryHref()` (blog), `rulesetHref()` (projects) or `imageCategoryHref()` (images), and resolve a segment back with the matching `get*BySlug()`, which returns `null` for unknown values so the route can 404. Each module also exposes `get*FilterItems()` returning `{label, href}[]` for `<CategoryFilter>`. All taxonomy routes set `dynamicParams = false`.

Image taxonomy is **gallery-scoped**: `getAllImageCategories()` and `getImagesByCategory()` only consider images with `gallery: true`, so a category page is always a subset of `/images`. Images excluded from the gallery stay reachable through their project page.

**Styling**: Tailwind CSS v4 via PostCSS — no `tailwind.config.*` file, uses v4 defaults. Global styles in `src/app/globals.css`.

**Styling convention**: All component styles are defined as named classes in the `@layer components` block in `globals.css`. Do not use inline Tailwind utility classes directly in JSX for anything beyond trivial one-offs — extract them into a named class in `globals.css` instead.

Tailwind variant classes (`group`, `group-hover`, `peer`, etc.) cannot be used inside `@apply` in Tailwind v4 — they will cause a build error. Use native CSS selectors instead (e.g. `.image-card:hover .image-card-img { @apply opacity-60; }`).

**Referencing theme tokens**: Both forms work and both resolve at runtime, so `.dark` overrides take effect:

- `text-[color:var(--primary)]` — arbitrary-value syntax, required for any token not exported in the `@theme inline` block (`--border`, `--hover-bg`, `--primary`, …).
- `bg-background`, `text-foreground` — canonical shorthand, available only for the tokens listed in `@theme inline`. Because that block is declared `inline`, Tailwind emits the token's _reference_ (`background-color: var(--background)`), not a snapshotted light-mode value.

Prefer the arbitrary-value form for consistency with the bulk of `globals.css`, but the shorthand is not a bug — `body`, `.skip-to-content`, and `.nav-mobile-menu` already use it.

**Theming**: Dark/light mode via `next-themes`, wrapped in `src/components/providers/theme-provider.tsx` at the root layout.

**Site config**: `src/constants/config.ts` holds `SITE_CONFIG` (baseUrl, title, description, author, locale). `src/constants/navigation.ts` holds `navItems` and `footerNavItems`. Add any new site-wide URLs or identifiers to these files rather than inlining them — `sitemap.tsx` derives its static routes from `footerNavItems`, so a new nav entry reaches the sitemap automatically.

**Icons**: `@heroicons/react/24/outline` — used for theme toggle (`SunIcon`, `MoonIcon`) and mobile menu (`Bars3Icon`, `XMarkIcon`).

**Key components** (`src/components/`): PascalCase filenames with **named** exports — no default exports.

- `Navbar.tsx` — top nav with mobile menu, driven by `navItems` (client component)
- `ThemeToggle.tsx` — theme switch button, used twice by `Navbar` (client component)
- `Footer.tsx` — footer with nav links and copyright, driven by `footerNavItems`
- `ContentCard.tsx` — `<CardGrid>` + `<ContentCard>`, the shared card layout behind `/texts` and `/projects` and their taxonomy pages. Add new collection index pages on top of these rather than re-writing the markup.
- `ImageGrid.tsx` — square-tile grid shared by `/images` and its category pages
- `CategoryFilter.tsx` — chip row for taxonomy navigation; pass `activeLabel` on a filtered page and omit it on the index
- `MDXContent.tsx` — renders compiled MDX with the `mdx-*` element overrides. There is no `@tailwindcss/typography` dependency; all MDX styling comes from these classes. The overrides **merge** their base class with whatever MDX supplies rather than replacing it, so a fenced block keeps remark's `language-*` hook — which means `<code>` inside `<pre>` carries `.mdx-code` too, and `globals.css` resets the inline chip there so its border and padding do not nest inside `.mdx-pre`. `src/app/__tests__/mdx-code-styling.test.ts` guards that pair.
- `Showcase.tsx` — Swiper carousel on the homepage (client component)
- `Latest.tsx` — blog post grid on the homepage
- `providers/theme-provider.tsx` — wraps app with next-themes

**SEO**: `src/lib/metadata.ts` exports `buildMetadata()`, which produces the canonical + OpenGraph + Twitter block for every content page. Use it instead of hand-writing a `Metadata` object. `metadataBase` is set once in the root layout, so all paths passed to `buildMetadata` are route-absolute (`/texts/foo`). The default share image is generated at build time by `src/app/opengraph-image.tsx`; pages that pass an `image` override it. Sitemap and robots.txt come from `src/app/sitemap.tsx` and `src/app/robots.tsx`.

**Testing**: Jest with two projects, split by extension across the whole of `src/` — `**/__tests__/**/*.test.ts` under node, `**/__tests__/**/*.test.tsx` under jsdom. Keep those globs broad: a narrower one silently collects a file into neither project, so it never runs and never fails. Put a test in the `__tests__` directory next to what it covers. Tests that reach the content layer mock `content-collections` with `{ virtual: true }`, since the generated module only exists after a build.

**Dependency overrides**: `pnpm.overrides` in `package.json` pins vulnerable transitive deps; `CVE.log` records why. `brace-expansion` is deliberately left un-overridden — v5 breaks ESLint's bundled `minimatch@3`. ESLint is held at 9 (`eslint-config-next` bundles a plugin that crashes on 10) and TypeScript at 6 (`ts-jest` requires `<7`).

**Path alias**: `@/*` maps to `src/*`.
