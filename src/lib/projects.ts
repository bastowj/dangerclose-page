import { allProjects } from "content-collections";

export interface ProjectFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  ruleset: string;
  coverImage?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
}

type ProjectDoc = (typeof allProjects)[number];

function toProject(doc: ProjectDoc): Project {
  return {
    slug: doc.slug,
    frontmatter: {
      title: doc.title,
      date: doc.date,
      excerpt: doc.excerpt,
      ruleset: doc.ruleset,
      coverImage: doc.coverImage ?? undefined,
    },
    body: doc.body,
  };
}

export function getProjectSlugs(): string[] {
  return allProjects.map((doc) => doc.slug);
}

export function getProjectBySlug(slug: string): Project | null {
  const doc = allProjects.find((d) => d.slug === slug);
  return doc ? toProject(doc) : null;
}

export function getAllProjects(): Project[] {
  return allProjects
    .map(toProject)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getAllRulesets(): string[] {
  const rulesets = new Set<string>();
  for (const project of allProjects) {
    rulesets.add(project.ruleset);
  }
  return Array.from(rulesets).sort();
}

export function getProjectsByRuleset(ruleset: string): Project[] {
  return getAllProjects().filter(
    (project) => project.frontmatter.ruleset === ruleset,
  );
}
