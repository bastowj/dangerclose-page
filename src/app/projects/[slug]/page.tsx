import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { MDXContent } from "@/components/MDXContent";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { getImagesByProject } from "@/lib/images";

const cachedGetProjectBySlug = cache(getProjectBySlug);

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = cachedGetProjectBySlug(slug);
  if (!project) notFound();
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.excerpt,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = cachedGetProjectBySlug(slug);
  if (!project) notFound();

  const images = getImagesByProject(slug);

  return (
    <article className="main-content-wrapper">
      <header className="project-header">
        <h1 className="project-title">{project.frontmatter.title}</h1>
        {project.frontmatter.subTitle && (
          <p className="project-subtitle">{project.frontmatter.subTitle}</p>
        )}
        <div className="project-meta">
          <span>
            <span className="project-meta-label">Ruleset:</span>{" "}
            {project.frontmatter.ruleset}
          </span>
        </div>
        {project.frontmatter.excerpt && (
          <p className="project-excerpt">{project.frontmatter.excerpt}</p>
        )}
      </header>

      <MDXContent code={project.body} />

      {images.length > 0 && (
        <section className="project-gallery">
          <h2 className="project-gallery-title">Gallery</h2>
          <div className="project-gallery-grid">
            {images.map((image) => (
              <figure key={image.slug} className="project-gallery-item">
                <Link href={`/images/${image.slug}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="project-gallery-img"
                  />
                </Link>
                {image.caption && (
                  <figcaption className="project-gallery-caption">
                    <Link href={`/images/${image.slug}`}>{image.caption}</Link>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
