import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { MDXContent } from "@/components/MDXContent";
import { buildMetadata } from "@/lib/metadata";
import { getStaticPageBySlug, getStaticPageSlugs } from "@/lib/pages";

const cachedGetStaticPageBySlug = cache(getStaticPageBySlug);

// Every top-level page comes from content/pages. Anything else 404s instead of
// being rendered on demand, so this segment cannot shadow unknown URLs.
export const dynamicParams = false;

interface StaticPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getStaticPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: StaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = cachedGetStaticPageBySlug(slug);
  if (!page) notFound();

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/${slug}`,
  });
}

export default async function StaticPage({ params }: StaticPageProps) {
  const { slug } = await params;
  const page = cachedGetStaticPageBySlug(slug);
  if (!page) notFound();

  return (
    <div className="main-content-wrapper">
      <MDXContent code={page.body} />
    </div>
  );
}
