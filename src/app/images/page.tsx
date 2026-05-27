import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getGalleryImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Images",
  description: "Gallery of painted miniatures and works in progress",
};

export default function ImagesPage() {
  const images = getGalleryImages();

  return (
    <div className="main-content-wrapper">
      <h1 className="projects-page-title">Images</h1>
      {images.length === 0 ? (
        <p className="projects-empty">No images yet.</p>
      ) : (
        <ul className="images-grid">
          {images.map((image) => {
            const href = `/images/${image.slug}`;
            return (
              <li key={image.slug} className="images-grid-item">
                <Link href={href} className="images-grid-image-wrap">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="images-grid-image"
                  />
                </Link>
                {image.caption && (
                  <p className="images-grid-caption">
                    <Link href={href}>{image.caption}</Link>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
