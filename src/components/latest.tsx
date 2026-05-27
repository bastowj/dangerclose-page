import Image from "next/image";
import Link from "next/link";

import { getAllBlogPosts } from "@/lib/blog";

const LATEST_LIMIT = 6;

export default function Latest() {
  const posts = getAllBlogPosts().slice(0, LATEST_LIMIT);

  return (
    <section className="latest">
      <h2 className="latest-title">Latest Posts</h2>
      {posts.length === 0 ? (
        <p className="latest-empty">No posts yet.</p>
      ) : (
        <ul className="latest-grid">
          {posts.map((post) => {
            const { title, date, excerpt, coverImage } = post.frontmatter;
            const href = `/texts/${post.slug}`;
            return (
              <li key={post.slug} className="latest-item">
                {coverImage && (
                  <Link href={href} className="latest-image-wrap">
                    <Image
                      src={coverImage}
                      alt={title}
                      width={400}
                      height={300}
                      className="latest-image"
                    />
                  </Link>
                )}
                <div className="latest-body">
                  <p className="latest-date">{date}</p>
                  <h3 className="latest-item-title">
                    <Link href={href}>{title}</Link>
                  </h3>
                  {excerpt && <p className="latest-excerpt">{excerpt}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
