import StaticPage, { generateStaticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return generateStaticPageMetadata({ slug: "tutorials" });
}

export default function TutorialsPage() {
  return <StaticPage slug="tutorials" className="main-content-wrapper" />;
}
