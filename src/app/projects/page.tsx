import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Painting and wargaming projects",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="main-content-wrapper">
      <h1 className="projects-page-title">Projects</h1>
      {projects.length === 0 ? (
        <p className="projects-empty">No projects yet.</p>
      ) : (
        <ul className="projects-grid">
          {projects.map((project) => {
            const { title, subTitle, excerpt, ruleset, coverImage } =
              project.frontmatter;
            const href = `/projects/${project.slug}`;
            return (
              <li key={project.slug} className="project-card">
                {coverImage && (
                  <Link href={href} className="project-card-image-wrap">
                    <Image
                      src={coverImage}
                      alt={title}
                      width={600}
                      height={400}
                      className="project-card-image"
                    />
                  </Link>
                )}
                <div className="project-card-body">
                  <h2 className="project-card-title">
                    <Link href={href}>{title}</Link>
                  </h2>
                  {subTitle && (
                    <p className="project-card-subtitle">{subTitle}</p>
                  )}
                  <p className="project-card-ruleset">
                    <span className="project-card-ruleset-label">Ruleset:</span>{" "}
                    {ruleset}
                  </p>
                  {excerpt && (
                    <p className="project-card-excerpt">{excerpt}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
