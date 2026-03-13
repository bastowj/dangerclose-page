import StaticPage, { generateStaticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return generateStaticPageMetadata({ slug: "imprint" });
}

export default function ImprintPage() {
  return <StaticPage slug="imprint" className="main-content-wrapper" />;
}
