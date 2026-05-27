import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

import { MDXContent } from "@/components/MDXContent";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";

const cachedGetBlogPostBySlug = cache(getBlogPostBySlug);

interface TextPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TextPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = cachedGetBlogPostBySlug(slug);
  if (!post) notFound();
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function TextPage({ params }: TextPageProps) {
  const { slug } = await params;
  const post = cachedGetBlogPostBySlug(slug);
  if (!post) notFound();

  const { title, date, excerpt, categories, coverImage, author } =
    post.frontmatter;

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
              <span key={category} className="blog-category-link">
                {category}
              </span>
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
