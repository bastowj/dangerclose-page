import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { getAllImages, getImageBySlug } from "@/lib/images";
import { getProjectBySlug } from "@/lib/projects";

const cachedGetImageBySlug = cache(getImageBySlug);

interface ImagePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllImages().map((image) => ({ slug: image.slug }));
}

export async function generateMetadata({
  params,
}: ImagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const image = cachedGetImageBySlug(slug);
  if (!image) notFound();
  return {
    title: image.caption ?? image.alt,
    description: image.caption ?? image.alt,
  };
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
              {project.frontmatter.title}
            </Link>
          )}
          {project && <span>·</span>}
          <span>{image.date}</span>
        </div>
        {image.categories.length > 0 && (
          <div className="image-page-categories">
            {image.categories.map((category) => (
              <span key={category} className="image-page-category">
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
