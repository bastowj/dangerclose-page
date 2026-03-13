import path from "path";
import {
  getMdxSlugs,
  getMdxContentBySlug,
  getAllMdxContent,
  MdxContent,
} from "@/lib/mdx";

export interface StaticPageFrontmatter {
  title: string;
  description: string;
}

export type StaticPage = MdxContent<StaticPageFrontmatter>;

const PAGES_DIRECTORY = path.join(process.cwd(), "content/pages");

export function getStaticPageSlugs(): string[] {
  return getMdxSlugs(PAGES_DIRECTORY);
}

export function getStaticPageBySlug(slug: string): StaticPage | null {
  const mdxContent = getMdxContentBySlug<StaticPageFrontmatter>(
    PAGES_DIRECTORY,
    slug,
  );
  if (!mdxContent) return null;
  return mdxContent as StaticPage;
}

export function getAllStaticPages(): StaticPage[] {
  return getAllMdxContent<StaticPageFrontmatter>(PAGES_DIRECTORY) as StaticPage[];
}
