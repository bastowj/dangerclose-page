import { allTexts } from "content-collections";

import { assertSafeSlug, findBySlug, slugify } from "@/lib/slug";

export const TEXTS_CATEGORY_BASE = "/texts/category";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  coverImage?: string;
  author?: string;
  body: string;
}

type TextDoc = (typeof allTexts)[number];

// content-collections types nullish frontmatter as `T | null | undefined`;
// normalising to `undefined` keeps optional-property access idiomatic.
function toBlogPost(doc: TextDoc): BlogPost {
  return {
    slug: assertSafeSlug(doc.slug, "Post"),
    title: doc.title,
    date: doc.date,
    excerpt: doc.excerpt,
    categories: doc.categories,
    coverImage: doc.coverImage ?? undefined,
    author: doc.author ?? undefined,
    body: doc.body,
  };
}

export function getBlogPostSlugs(): string[] {
  return allTexts.map((doc) => assertSafeSlug(doc.slug, "Post"));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const doc = allTexts.find((d) => d.slug === slug);
  return doc ? toBlogPost(doc) : null;
}

export function getAllBlogPosts(): BlogPost[] {
  return allTexts
    .map(toBlogPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>();
  for (const post of allTexts) {
    for (const category of post.categories) {
      categoriesSet.add(category);
    }
  }
  return Array.from(categoriesSet).sort();
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.categories.includes(category));
}

export function categoryHref(category: string): string {
  return `${TEXTS_CATEGORY_BASE}/${slugify(category)}`;
}

/** Resolves a URL segment back to its category, or null if unknown. */
export function getCategoryBySlug(slug: string): string | null {
  return findBySlug(getAllCategories(), slug);
}

export function getCategoryFilterItems(): { label: string; href: string }[] {
  return getAllCategories().map((label) => ({
    label,
    href: categoryHref(label),
  }));
}
