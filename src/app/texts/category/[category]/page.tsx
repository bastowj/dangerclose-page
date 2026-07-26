import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { CategoryFilter } from "@/components/CategoryFilter";
import { CardGrid, ContentCard } from "@/components/ContentCard";
import {
  categoryHref,
  getAllCategories,
  getBlogPostsByCategory,
  getCategoryBySlug,
  getCategoryFilterItems,
} from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { slugify } from "@/lib/slug";

const cachedGetCategoryBySlug = cache(getCategoryBySlug);

export const dynamicParams = false;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: slugify(category),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = cachedGetCategoryBySlug(slug);
  if (!category) notFound();

  return buildMetadata({
    title: `Posts in ${category}`,
    description: `Painting and wargaming posts filed under ${category}.`,
    path: categoryHref(category),
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = cachedGetCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getBlogPostsByCategory(category);

  return (
    <div className="main-content-wrapper">
      <h1 className="page-title">{category}</h1>
      <CategoryFilter
        allLabel="All posts"
        allHref="/texts"
        items={getCategoryFilterItems()}
        activeLabel={category}
        ariaLabel="Filter posts by category"
      />
      {posts.length === 0 ? (
        <p className="empty-state">No posts in this category yet.</p>
      ) : (
        <CardGrid>
          {posts.map((post) => {
            const { title, date, excerpt, categories, coverImage } = post;
            return (
              <ContentCard
                key={post.slug}
                href={`/texts/${post.slug}`}
                title={title}
                image={coverImage}
                subtitle={
                  categories.length > 0 ? categories.join(", ") : undefined
                }
                meta={{ label: "Date", value: date }}
                excerpt={excerpt}
              />
            );
          })}
        </CardGrid>
      )}
    </div>
  );
}
