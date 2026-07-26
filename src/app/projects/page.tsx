import type { Metadata } from "next";

import { CategoryFilter } from "@/components/CategoryFilter";
import { CardGrid, ContentCard } from "@/components/ContentCard";
import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getRulesetFilterItems } from "@/lib/projects";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Painting and wargaming projects",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="main-content-wrapper">
      <h1 className="page-title">Projects</h1>
      <CategoryFilter
        allLabel="All projects"
        allHref="/projects"
        items={getRulesetFilterItems()}
        ariaLabel="Filter projects by ruleset"
      />
      {projects.length === 0 ? (
        <p className="empty-state">No projects yet.</p>
      ) : (
        <CardGrid>
          {projects.map((project) => {
            const { title, subTitle, excerpt, ruleset, coverImage } = project;
            return (
              <ContentCard
                key={project.slug}
                href={`/projects/${project.slug}`}
                title={title}
                image={coverImage}
                subtitle={subTitle}
                meta={{ label: "Ruleset", value: ruleset }}
                excerpt={excerpt}
              />
            );
          })}
        </CardGrid>
      )}
    </div>
  );
}
