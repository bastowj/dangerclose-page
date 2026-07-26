import { render, screen } from "@testing-library/react";

import { CategoryFilter } from "@/components/CategoryFilter";

const items = [
  { label: "SAGA", href: "/texts/category/saga" },
  { label: "Irish", href: "/texts/category/irish" },
];

function renderFilter(activeLabel?: string) {
  return render(
    <CategoryFilter
      allLabel="All posts"
      allHref="/texts"
      items={items}
      activeLabel={activeLabel}
      ariaLabel="Filter posts by category"
    />,
  );
}

describe("CategoryFilter", () => {
  it("renders nothing when there are no taxonomy values", () => {
    const { container } = render(
      <CategoryFilter
        allLabel="All posts"
        allHref="/texts"
        items={[]}
        ariaLabel="Filter posts by category"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("marks the 'all' chip active on an unfiltered index", () => {
    renderFilter();

    const all = screen.getByRole("link", { name: "All posts" });
    expect(all).toHaveClass("active");
    expect(all).toHaveAttribute("aria-current", "page");
  });

  it("marks exactly the active taxonomy chip", () => {
    renderFilter("SAGA");

    const current = screen.getAllByRole("link", { current: "page" });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("SAGA");

    expect(screen.getByRole("link", { name: "All posts" })).toHaveClass(
      "inactive",
    );
    expect(screen.getByRole("link", { name: "Irish" })).toHaveClass("inactive");
  });

  it("links each chip to its route", () => {
    renderFilter();

    expect(screen.getByRole("link", { name: "SAGA" })).toHaveAttribute(
      "href",
      "/texts/category/saga",
    );
    expect(screen.getByRole("link", { name: "All posts" })).toHaveAttribute(
      "href",
      "/texts",
    );
  });

  it("exposes a labelled navigation landmark", () => {
    renderFilter();
    expect(
      screen.getByRole("navigation", { name: "Filter posts by category" }),
    ).toBeInTheDocument();
  });
});
