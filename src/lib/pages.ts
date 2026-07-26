import { allPages } from "content-collections";

import { assertSafeSlug } from "@/lib/slug";

export interface StaticPage {
  slug: string;
  title: string;
  description?: string;
  body: string;
}

type PageDoc = (typeof allPages)[number];

// content-collections types nullish frontmatter as `T | null | undefined`;
// normalising to `undefined` keeps optional-property access idiomatic.
function toStaticPage(doc: PageDoc): StaticPage {
  return {
    slug: assertSafeSlug(doc.slug, "Page"),
    title: doc.title,
    description: doc.description ?? undefined,
    body: doc.body,
  };
}

export function getStaticPageSlugs(): string[] {
  return allPages.map((doc) => assertSafeSlug(doc.slug, "Page"));
}

export function getStaticPageBySlug(slug: string): StaticPage | null {
  const doc = allPages.find((d) => d.slug === slug);
  return doc ? toStaticPage(doc) : null;
}
