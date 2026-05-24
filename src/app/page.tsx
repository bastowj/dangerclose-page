import Showcase, { type ShowcaseSlide } from "@/components/showcase";
import Latest from "@/components/latest";
import { getShowcaseImages } from "@/lib/images";
import { getProjectBySlug } from "@/lib/projects";

export default function Home() {
  const slides: ShowcaseSlide[] = getShowcaseImages().map((image) => {
    const project = image.project ? getProjectBySlug(image.project) : null;
    return {
      slug: image.slug,
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      date: image.date,
      categories: image.categories,
      projectTitle: project?.frontmatter.title ?? null,
      projectHref: project ? `/projects/${project.slug}` : null,
      href: `/images/${image.slug}`,
    };
  });

  return (
    <>
      <Showcase slides={slides} />
      <Latest />
    </>
  );
}
