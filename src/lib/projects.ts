import { allProjects } from "content-collections";

import { assertSafeSlug, findBySlug, slugify } from "@/lib/slug";

export const PROJECTS_RULESET_BASE = "/projects/ruleset";

export interface Project {
  slug: string;
  title: string;
  subTitle?: string;
  excerpt?: string;
  ruleset: string;
  coverImage?: string;
  body: string;
}

type ProjectDoc = (typeof allProjects)[number];

// content-collections types nullish frontmatter as `T | null | undefined`;
// normalising to `undefined` keeps optional-property access idiomatic.
function toProject(doc: ProjectDoc): Project {
  return {
    slug: assertSafeSlug(doc.slug, "Project"),
    title: doc.title,
    subTitle: doc.subTitle ?? undefined,
    excerpt: doc.excerpt ?? undefined,
    ruleset: doc.ruleset,
    coverImage: doc.coverImage ?? undefined,
    body: doc.body,
  };
}

export function getProjectSlugs(): string[] {
  return allProjects.map((doc) => assertSafeSlug(doc.slug, "Project"));
}

export function getProjectBySlug(slug: string): Project | null {
  const doc = allProjects.find((d) => d.slug === slug);
  return doc ? toProject(doc) : null;
}

export function getAllProjects(): Project[] {
  return allProjects.map(toProject);
}

export function getAllRulesets(): string[] {
  const rulesets = new Set<string>();
  for (const project of allProjects) {
    rulesets.add(project.ruleset);
  }
  return Array.from(rulesets).sort();
}

export function getProjectsByRuleset(ruleset: string): Project[] {
  return getAllProjects().filter((project) => project.ruleset === ruleset);
}

export function rulesetHref(ruleset: string): string {
  return `${PROJECTS_RULESET_BASE}/${slugify(ruleset)}`;
}

/** Resolves a URL segment back to its ruleset, or null if unknown. */
export function getRulesetBySlug(slug: string): string | null {
  return findBySlug(getAllRulesets(), slug);
}

export function getRulesetFilterItems(): { label: string; href: string }[] {
  return getAllRulesets().map((label) => ({
    label,
    href: rulesetHref(label),
  }));
}
