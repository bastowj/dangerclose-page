import Image from "next/image";
import Link from "next/link";

import type { ImageRecord } from "@/lib/images";

export function ImageGrid({ images }: { images: ImageRecord[] }) {
  return (
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
  );
}
