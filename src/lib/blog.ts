import path from "path";
import { getMdxSlugs, getMdxContentBySlug, getAllMdxContent, MdxContent } from "./mdx";

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  coverImage?: string;
  author?: string;
}

export type BlogPost = MdxContent<BlogPostFrontmatter>;

const BLOG_DIRECTORY = path.join(process.cwd(), "content/posts");

export function getBlogPostSlugs(): string[] {
  return getMdxSlugs(BLOG_DIRECTORY);
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const mdxContent = getMdxContentBySlug<BlogPostFrontmatter>(BLOG_DIRECTORY, slug);
  if (!mdxContent) return null;
  return mdxContent as BlogPost;
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllMdxContent<BlogPostFrontmatter>(BLOG_DIRECTORY).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  ) as BlogPost[];
}

export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>();
  getAllBlogPosts().forEach((post) =>
    post.frontmatter.categories.forEach((c) => categoriesSet.add(c)),
  );
  return Array.from(categoriesSet).sort();
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.frontmatter.categories.includes(category),
  );
}
