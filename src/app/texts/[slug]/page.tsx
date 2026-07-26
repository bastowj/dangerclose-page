import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { MDXContent } from "@/components/MDXContent";
import { categoryHref, getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";

const cachedGetBlogPostBySlug = cache(getBlogPostBySlug);

interface TextPageProps {
  params: Promise<{ slug: string }>;
}

// All content is known at build time, so an unknown slug 404s instead of
// being rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TextPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = cachedGetBlogPostBySlug(slug);
  if (!post) notFound();
  const { title, excerpt, coverImage, date, author } = post;
  return buildMetadata({
    title,
    description: excerpt,
    path: `/texts/${slug}`,
    image: coverImage,
    type: "article",
    publishedTime: date,
    authors: author ? [author] : undefined,
  });
}

export default async function TextPage({ params }: TextPageProps) {
  const { slug } = await params;
  const post = cachedGetBlogPostBySlug(slug);
  if (!post) notFound();

  const { title, date, excerpt, categories, coverImage, author } = post;

  return (
    <article className="main-content-wrapper">
      <header className="project-header">
        <h1 className="project-title">{title}</h1>
        <div className="project-meta">
          <span className="blog-date">{date}</span>
          {author && <span>· {author}</span>}
        </div>
        {categories.length > 0 && (
          <div className="project-meta">
            {categories.map((category) => (
              <Link
                key={category}
                href={categoryHref(category)}
                className="blog-category-link"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
        {excerpt && <p className="project-excerpt">{excerpt}</p>}
      </header>

      {coverImage && (
        <Image
          src={coverImage}
          alt={title}
          width={1200}
          height={600}
          className="blog-cover-image"
        />
      )}

      <MDXContent code={post.body} />
    </article>
  );
}
