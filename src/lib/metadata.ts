import type { Metadata } from "next";

export interface PageMetadataInput {
  title: string;
  description?: string;
  /** Route-absolute path, e.g. "/texts/my-post". Resolved against metadataBase. */
  path: string;
  /** Route-absolute image path. Omit to inherit the site-wide opengraph-image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

/**
 * Builds the canonical/OpenGraph/Twitter block shared by every content page.
 * Omitted fields fall back to the defaults declared in the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  authors,
}: PageMetadataInput): Metadata {
  const images = image ? [image] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
      images,
      ...(type === "article" ? { publishedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
