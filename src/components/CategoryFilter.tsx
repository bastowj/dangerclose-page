import Link from "next/link";

export interface CategoryFilterProps {
  /** Label for the "show everything" chip, e.g. "All posts". */
  allLabel: string;
  /** Href of the unfiltered index, e.g. "/texts". */
  allHref: string;
  /** Taxonomy values with the route each one filters to. */
  items: { label: string; href: string }[];
  /** The value currently being filtered on; omit when showing the index. */
  activeLabel?: string;
  /** Accessible name for the nav landmark, e.g. "Filter posts by category". */
  ariaLabel: string;
}

export function CategoryFilter({
  allLabel,
  allHref,
  items,
  activeLabel,
  ariaLabel,
}: CategoryFilterProps) {
  if (items.length === 0) return null;

  const chip = (isActive: boolean) =>
    `category-chip ${isActive ? "active" : "inactive"}`;

  return (
    <nav className="category-filter" aria-label={ariaLabel}>
      <Link
        href={allHref}
        className={chip(!activeLabel)}
        aria-current={!activeLabel ? "page" : undefined}
      >
        {allLabel}
      </Link>
      {items.map((item) => {
        const isActive = item.label === activeLabel;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={chip(isActive)}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
