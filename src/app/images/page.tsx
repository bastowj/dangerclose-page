import type { Metadata } from "next";

import { CategoryFilter } from "@/components/CategoryFilter";
import { ImageGrid } from "@/components/ImageGrid";
import { getGalleryImages, getImageCategoryFilterItems } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Images",
  description: "Gallery of painted miniatures and works in progress",
  path: "/images",
});

export default function ImagesPage() {
  const images = getGalleryImages();

  return (
    <div className="main-content-wrapper">
      <h1 className="page-title">Images</h1>
      <CategoryFilter
        allLabel="All images"
        allHref="/images"
        items={getImageCategoryFilterItems()}
        ariaLabel="Filter images by category"
      />
      {images.length === 0 ? (
        <p className="empty-state">No images yet.</p>
      ) : (
        <ImageGrid images={images} />
      )}
    </div>
  );
}
