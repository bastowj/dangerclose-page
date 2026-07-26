import { allImages } from "content-collections";

import { assertSafeSlug, findBySlug, slugify } from "@/lib/slug";

export const IMAGES_CATEGORY_BASE = "/images/category";

export interface ImageRecord {
  slug: string;
  src: string;
  alt: string;
  caption?: string;
  date: string;
  project?: string;
  categories: string[];
  showcase: boolean;
  gallery: boolean;
}

type ImageDoc = (typeof allImages)[number];

function toImage(doc: ImageDoc): ImageRecord {
  return {
    slug: assertSafeSlug(doc.slug, "Image"),
    src: doc.src,
    alt: doc.alt,
    caption: doc.caption ?? undefined,
    date: doc.date,
    project: doc.project ?? undefined,
    categories: doc.categories,
    showcase: doc.showcase,
    gallery: doc.gallery,
  };
}

function byDateDesc(a: ImageRecord, b: ImageRecord): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllImages(): ImageRecord[] {
  return allImages.map(toImage).sort(byDateDesc);
}

export function getImageBySlug(slug: string): ImageRecord | null {
  const doc = allImages.find((d) => d.slug === slug);
  return doc ? toImage(doc) : null;
}

export function getShowcaseImages(): ImageRecord[] {
  return getAllImages().filter((image) => image.showcase);
}

export function getGalleryImages(): ImageRecord[] {
  return getAllImages().filter((image) => image.gallery);
}

export function getImagesByProject(projectSlug: string): ImageRecord[] {
  return getAllImages().filter((image) => image.project === projectSlug);
}

/**
 * Gallery-scoped, so a category page is always a subset of /images. Images
 * excluded from the gallery stay reachable via their project page.
 */
export function getImagesByCategory(category: string): ImageRecord[] {
  return getGalleryImages().filter((image) =>
    image.categories.includes(category),
  );
}

export function imageCategoryHref(category: string): string {
  return `${IMAGES_CATEGORY_BASE}/${slugify(category)}`;
}

/** Resolves a URL segment back to its category, or null if unknown. */
export function getImageCategoryBySlug(slug: string): string | null {
  return findBySlug(getAllImageCategories(), slug);
}

export function getImageCategoryFilterItems(): {
  label: string;
  href: string;
}[] {
  return getAllImageCategories().map((label) => ({
    label,
    href: imageCategoryHref(label),
  }));
}

/** Only categories that have at least one gallery image behind them. */
export function getAllImageCategories(): string[] {
  const set = new Set<string>();
  for (const image of getGalleryImages()) {
    for (const category of image.categories) {
      set.add(category);
    }
  }
  return Array.from(set).sort();
}
