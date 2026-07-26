import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants/config";
import { footerNavItems } from "@/constants/navigation";
import { getAllBlogPosts, getCategoryFilterItems } from "@/lib/blog";
import { getAllImages, getImageCategoryFilterItems } from "@/lib/images";
import { getAllProjects, getRulesetFilterItems } from "@/lib/projects";

const baseUrl = SITE_CONFIG.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  // footerNavItems is the full set of top-level routes (navItems plus imprint),
  // so a new page reaches the sitemap as soon as it is added to the nav.
  const staticRoutes = footerNavItems
    .filter((item) => !item.external)
    .map((item) => ({
      url: `${baseUrl}${item.href === "/" ? "" : item.href}`,
      changeFrequency: "weekly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    }));

  const posts = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/texts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projects = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const images = getAllImages().map((image) => ({
    url: `${baseUrl}/images/${image.slug}`,
    lastModified: new Date(image.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  // Taxonomy landing pages: lower priority than the content they index.
  const taxonomy = [
    ...getCategoryFilterItems(),
    ...getRulesetFilterItems(),
    ...getImageCategoryFilterItems(),
  ].map((item) => ({
    url: `${baseUrl}${item.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...posts, ...projects, ...images, ...taxonomy];
}
