import { allImages } from "content-collections";

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
    slug: doc.slug,
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

export function getImagesByCategory(category: string): ImageRecord[] {
  return getAllImages().filter((image) =>
    image.categories.includes(category),
  );
}

export function getAllImageCategories(): string[] {
  const set = new Set<string>();
  for (const image of allImages) {
    for (const category of image.categories) {
      set.add(category);
    }
  }
  return Array.from(set).sort();
}
