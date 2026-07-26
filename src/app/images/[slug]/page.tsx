import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { getAllImages, getImageBySlug, imageCategoryHref } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/projects";

const cachedGetImageBySlug = cache(getImageBySlug);

interface ImagePageProps {
  params: Promise<{ slug: string }>;
}

// All content is known at build time, so an unknown slug 404s instead of
// being rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllImages().map((image) => ({ slug: image.slug }));
}

export async function generateMetadata({
  params,
}: ImagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const image = cachedGetImageBySlug(slug);
  if (!image) notFound();
  return buildMetadata({
    title: image.caption ?? image.alt,
    description: image.caption ?? image.alt,
    path: `/images/${slug}`,
    image: image.src,
  });
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { slug } = await params;
  const image = cachedGetImageBySlug(slug);
  if (!image) notFound();

  const project = image.project ? getProjectBySlug(image.project) : null;

  return (
    <article className="main-content-wrapper image-page">
      <div className="image-page-figure">
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={1200}
          className="image-page-img"
          priority
        />
      </div>
      <div className="image-page-info">
        {image.caption && (
          <h1 className="image-page-caption">{image.caption}</h1>
        )}
        <div className="image-page-meta">
          {project && (
            <Link href={`/projects/${project.slug}`} className="link">
              {project.title}
            </Link>
          )}
          {project && <span>·</span>}
          <span>{image.date}</span>
        </div>
        {image.categories.length > 0 && (
          <div className="image-page-categories">
            {image.categories.map((category) => (
              <Link
                key={category}
                href={imageCategoryHref(category)}
                className="image-page-category"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
