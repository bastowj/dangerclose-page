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
      caption: image.caption,
      date: image.date,
      categories: image.categories,
      title: project?.frontmatter.title ?? image.alt,
      href: project ? `/projects/${project.slug}` : null,
    };
  });

  return (
    <>
      <Showcase slides={slides} />
      <Latest />
    </>
  );
}
