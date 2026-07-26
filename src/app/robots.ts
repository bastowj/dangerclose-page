import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api/ = Next.js route handlers, /_next/ = build output
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
  };
}
