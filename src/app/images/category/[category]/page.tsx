import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { CategoryFilter } from "@/components/CategoryFilter";
import { ImageGrid } from "@/components/ImageGrid";
import {
  getAllImageCategories,
  getImageCategoryBySlug,
  getImageCategoryFilterItems,
  getImagesByCategory,
  imageCategoryHref,
} from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { slugify } from "@/lib/slug";

const cachedGetImageCategoryBySlug = cache(getImageCategoryBySlug);

export const dynamicParams = false;

interface ImageCategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllImageCategories().map((category) => ({
    category: slugify(category),
  }));
}

export async function generateMetadata({
  params,
}: ImageCategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = cachedGetImageCategoryBySlug(slug);
  if (!category) notFound();

  const [first] = getImagesByCategory(category);

  return buildMetadata({
    title: `${category} images`,
    description: `Painted miniatures and works in progress tagged ${category}.`,
    path: imageCategoryHref(category),
    image: first?.src,
  });
}

export default async function ImageCategoryPage({
  params,
}: ImageCategoryPageProps) {
  const { category: slug } = await params;
  const category = cachedGetImageCategoryBySlug(slug);
  if (!category) notFound();

  const images = getImagesByCategory(category);

  return (
    <div className="main-content-wrapper">
      <h1 className="page-title">{category}</h1>
      <CategoryFilter
        allLabel="All images"
        allHref="/images"
        items={getImageCategoryFilterItems()}
        activeLabel={category}
        ariaLabel="Filter images by category"
      />
      {images.length === 0 ? (
        <p className="empty-state">No images in this category yet.</p>
      ) : (
        <ImageGrid images={images} />
      )}
    </div>
  );
}
