import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { CategoryFilter } from "@/components/CategoryFilter";
import { CardGrid, ContentCard } from "@/components/ContentCard";
import { buildMetadata } from "@/lib/metadata";
import {
  getAllRulesets,
  getProjectsByRuleset,
  getRulesetBySlug,
  getRulesetFilterItems,
  rulesetHref,
} from "@/lib/projects";
import { slugify } from "@/lib/slug";

const cachedGetRulesetBySlug = cache(getRulesetBySlug);

export const dynamicParams = false;

interface RulesetPageProps {
  params: Promise<{ ruleset: string }>;
}

export function generateStaticParams() {
  return getAllRulesets().map((ruleset) => ({ ruleset: slugify(ruleset) }));
}

export async function generateMetadata({
  params,
}: RulesetPageProps): Promise<Metadata> {
  const { ruleset: slug } = await params;
  const ruleset = cachedGetRulesetBySlug(slug);
  if (!ruleset) notFound();

  return buildMetadata({
    title: `${ruleset} projects`,
    description: `Painting and wargaming projects played with ${ruleset}.`,
    path: rulesetHref(ruleset),
  });
}

export default async function RulesetPage({ params }: RulesetPageProps) {
  const { ruleset: slug } = await params;
  const ruleset = cachedGetRulesetBySlug(slug);
  if (!ruleset) notFound();

  const projects = getProjectsByRuleset(ruleset);

  return (
    <div className="main-content-wrapper">
      <h1 className="page-title">{ruleset}</h1>
      <CategoryFilter
        allLabel="All projects"
        allHref="/projects"
        items={getRulesetFilterItems()}
        activeLabel={ruleset}
        ariaLabel="Filter projects by ruleset"
      />
      {projects.length === 0 ? (
        <p className="empty-state">No projects for this ruleset yet.</p>
      ) : (
        <CardGrid>
          {projects.map((project) => {
            const { title, subTitle, excerpt, coverImage } = project;
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
