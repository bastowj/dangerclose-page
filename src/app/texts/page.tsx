import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Posts",
  description: "Painting and wargaming posts",
};

export default function TextsPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="main-content-wrapper">
      <h1 className="projects-page-title">Posts</h1>
      {posts.length === 0 ? (
        <p className="projects-empty">No posts yet.</p>
      ) : (
        <ul className="projects-grid">
          {posts.map((post) => {
            const { title, date, excerpt, categories, coverImage } =
              post.frontmatter;
            const href = `/texts/${post.slug}`;
            return (
              <li key={post.slug} className="project-card">
                {coverImage && (
                  <Link href={href} className="project-card-image-wrap">
                    <Image
                      src={coverImage}
                      alt={title}
                      width={600}
                      height={400}
                      className="project-card-image"
                    />
                  </Link>
                )}
                <div className="project-card-body">
                  <h2 className="project-card-title">
                    <Link href={href}>{title}</Link>
                  </h2>
                  <p className="project-card-ruleset">
                    <span className="project-card-ruleset-label">Date:</span>{" "}
                    {date}
                  </p>
                  {categories.length > 0 && (
                    <p className="project-card-subtitle">
                      {categories.join(", ")}
                    </p>
                  )}
                  {excerpt && (
                    <p className="project-card-excerpt">{excerpt}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
