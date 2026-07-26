type PageDoc = {
  slug: string;
  title: string;
  // Mirrors the collection schema: .nullish() yields `string | null | undefined`.
  description?: string | null;
  body: string;
};

const mockPages: PageDoc[] = [];

jest.mock(
  "content-collections",
  () => ({
    allTexts: [],
    allPages: mockPages,
  }),
  { virtual: true },
);

import { getStaticPageSlugs, getStaticPageBySlug } from "../pages";

beforeEach(() => {
  mockPages.length = 0;
});

describe("getStaticPageSlugs", () => {
  it("returns slugs from the pages directory", () => {
    mockPages.push(
      { slug: "imprint", title: "Imprint", description: "", body: "" },
      { slug: "contact", title: "Contact", description: "", body: "" },
    );
    expect(getStaticPageSlugs()).toEqual(["imprint", "contact"]);
  });

  it("returns empty array when no pages exist", () => {
    expect(getStaticPageSlugs()).toEqual([]);
  });
});

describe("getStaticPageBySlug", () => {
  it("returns the page for a valid slug", () => {
    mockPages.push({
      slug: "imprint",
      title: "Imprint",
      description: "Site imprint",
      body: "Imprint content",
    });
    const page = getStaticPageBySlug("imprint");
    expect(page?.slug).toBe("imprint");
    expect(page?.title).toBe("Imprint");
  });

  it("returns null when the slug is missing", () => {
    expect(getStaticPageBySlug("nope")).toBeNull();
  });
});

describe("page shape", () => {
  it("normalises an absent description to undefined", () => {
    mockPages.push({
      slug: "imprint",
      title: "Imprint",
      description: null,
      body: "",
    });
    expect(getStaticPageBySlug("imprint")?.description).toBeUndefined();
  });
});
