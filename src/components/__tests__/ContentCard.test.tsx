import { render, screen } from "@testing-library/react";

import { CardGrid, ContentCard } from "@/components/ContentCard";

function renderCard(props: Partial<React.ComponentProps<typeof ContentCard>>) {
  return render(
    <CardGrid>
      <ContentCard href="/texts/a" title="A Post" {...props} />
    </CardGrid>,
  );
}

describe("ContentCard", () => {
  it("links the title to the target href", () => {
    renderCard({});
    expect(screen.getByRole("link", { name: "A Post" })).toHaveAttribute(
      "href",
      "/texts/a",
    );
  });

  it("renders meta as 'label: value'", () => {
    renderCard({ meta: { label: "Ruleset", value: "SAGA" } });
    expect(screen.getByText("Ruleset:")).toBeInTheDocument();
    expect(screen.getByText(/SAGA/)).toBeInTheDocument();
  });

  it("omits optional blocks when not provided", () => {
    const { container } = renderCard({});
    expect(container.querySelector(".card-subtitle")).toBeNull();
    expect(container.querySelector(".card-meta")).toBeNull();
    expect(container.querySelector(".card-excerpt")).toBeNull();
    expect(container.querySelector(".card-image-wrap")).toBeNull();
  });

  it("renders the cover image with the title as alt text", () => {
    renderCard({ image: "/images/showcase1.jpg" });
    expect(screen.getByAltText("A Post")).toBeInTheDocument();
  });

  it("renders subtitle and excerpt when provided", () => {
    renderCard({ subtitle: "SAGA, Irish", excerpt: "A short summary." });
    expect(screen.getByText("SAGA, Irish")).toBeInTheDocument();
    expect(screen.getByText("A short summary.")).toBeInTheDocument();
  });
});
