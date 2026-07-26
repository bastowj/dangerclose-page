import type { Metadata } from "next";

import { CategoryFilter } from "@/components/CategoryFilter";
import { CardGrid, ContentCard } from "@/components/ContentCard";
import { getAllBlogPosts, getCategoryFilterItems } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Posts",
  description: "Painting and wargaming posts",
  path: "/texts",
});

export default function TextsPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="main-content-wrapper">
      <h1 className="page-title">Posts</h1>
      <CategoryFilter
        allLabel="All posts"
        allHref="/texts"
        items={getCategoryFilterItems()}
        ariaLabel="Filter posts by category"
      />
      {posts.length === 0 ? (
        <p className="empty-state">No posts yet.</p>
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
