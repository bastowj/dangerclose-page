type PageDoc = {
  slug: string;
  title: string;
  description: string;
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

import {
  getStaticPageSlugs,
  getStaticPageBySlug,
  getAllStaticPages,
} from "../pages";

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
    expect(page?.frontmatter.title).toBe("Imprint");
  });

  it("returns null when the slug is missing", () => {
    expect(getStaticPageBySlug("nope")).toBeNull();
  });
});

describe("getAllStaticPages", () => {
  it("returns all pages", () => {
    mockPages.push(
      { slug: "imprint", title: "Imprint", description: "Site imprint", body: "" },
      { slug: "contact", title: "Contact", description: "Contact me", body: "" },
    );
    const pages = getAllStaticPages();
    expect(pages).toHaveLength(2);
    expect(pages.map((p) => p.slug)).toEqual(["imprint", "contact"]);
  });
});
