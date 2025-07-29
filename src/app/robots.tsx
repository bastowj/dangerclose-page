import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.danger-close.de";
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/api/", // Next.js API routes
      },
      {
        userAgent: "*",
        disallow: "/_next/", // Next.js build output
      },
      {
        userAgent: "*",
        disallow: "/public/", // Public folder
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
