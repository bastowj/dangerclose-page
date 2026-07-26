import Image from "next/image";
import Link from "next/link";

export interface ContentCardProps {
  href: string;
  title: string;
  image?: string;
  subtitle?: string;
  /** Rendered as "<label>: <value>", e.g. "Ruleset: SAGA" or "Date: 2026-05-27". */
  meta?: { label: string; value: string };
  excerpt?: string;
}

/** One entry in a <CardGrid>. Renders an <li>, so it must live inside one. */
export function ContentCard({
  href,
  title,
  image,
  subtitle,
  meta,
  excerpt,
}: ContentCardProps) {
  return (
    <li className="card">
      {image && (
        <Link href={href} className="card-image-wrap">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="card-image"
          />
        </Link>
      )}
      <div className="card-body">
        <h2 className="card-title">
          <Link href={href}>{title}</Link>
        </h2>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {meta && (
          <p className="card-meta">
            <span className="card-meta-label">{meta.label}:</span> {meta.value}
          </p>
        )}
        {excerpt && <p className="card-excerpt">{excerpt}</p>}
      </div>
    </li>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <ul className="card-grid">{children}</ul>;
}
