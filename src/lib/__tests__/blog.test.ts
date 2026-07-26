type TextDoc = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  // Mirrors the collection schema: .nullish() yields `T | null | undefined`.
  coverImage?: string | null;
  author?: string | null;
  body: string;
};

const mockTexts: TextDoc[] = [];

jest.mock(
  "content-collections",
  () => ({
    allTexts: mockTexts,
    allPages: [],
  }),
  { virtual: true },
);

import {
  categoryHref,
  getAllBlogPosts,
  getAllCategories,
  getBlogPostSlugs,
  getBlogPostsByCategory,
  getCategoryBySlug,
  getCategoryFilterItems,
} from "../blog";

function addDoc(slug: string, date: string, categories: string[]) {
  mockTexts.push({
    slug,
    title: slug,
    date,
    excerpt: "",
    categories,
    body: "",
  });
}

beforeEach(() => {
  mockTexts.length = 0;
});

describe("getAllBlogPosts", () => {
  it("returns posts sorted newest first", () => {
    addDoc("old", "2023-01-01", []);
    addDoc("new", "2024-06-01", []);
    addDoc("mid", "2023-12-01", []);

    const posts = getAllBlogPosts();
    expect(posts.map((p) => p.slug)).toEqual(["new", "mid", "old"]);
  });
});

describe("getAllCategories", () => {
  it("returns a sorted, deduplicated list of categories", () => {
    addDoc("a", "2024-01-01", ["Painting", "Warhammer"]);
    addDoc("b", "2024-02-01", ["Painting", "Bases"]);

    expect(getAllCategories()).toEqual(["Bases", "Painting", "Warhammer"]);
  });

  it("returns empty array when there are no posts", () => {
    expect(getAllCategories()).toEqual([]);
  });
});

describe("getBlogPostsByCategory", () => {
  it("returns only posts matching the given category", () => {
    addDoc("a", "2024-01-01", ["Painting"]);
    addDoc("b", "2024-02-01", ["Bases"]);
    addDoc("c", "2024-03-01", ["Painting", "Warhammer"]);

    const result = getBlogPostsByCategory("Painting");
    expect(result.map((p) => p.slug)).toEqual(["c", "a"]);
  });

  it("returns empty array when no posts match", () => {
    addDoc("a", "2024-01-01", ["Painting"]);

    expect(getBlogPostsByCategory("Bases")).toEqual([]);
  });
});

describe("post shape", () => {
  it("exposes frontmatter fields flat on the post", () => {
    addDoc("a", "2024-01-01", ["Painting"]);

    const [post] = getAllBlogPosts();
    expect(post).toMatchObject({
      slug: "a",
      title: "a",
      date: "2024-01-01",
      categories: ["Painting"],
    });
  });

  it("normalises absent optional fields to undefined", () => {
    mockTexts.push({
      slug: "a",
      title: "A",
      date: "2024-01-01",
      excerpt: "",
      categories: [],
      coverImage: null,
      author: null,
      body: "",
    });

    const [post] = getAllBlogPosts();
    expect(post.coverImage).toBeUndefined();
    expect(post.author).toBeUndefined();
  });
});

describe("post slug safety", () => {
  it("accepts the slug shapes real filenames produce", () => {
    addDoc("cold_war_gone_hot_1984", "2024-01-01", []);
    addDoc("example-post", "2024-02-01", []);

    expect(getBlogPostSlugs()).toEqual([
      "cold_war_gone_hot_1984",
      "example-post",
    ]);
  });

  it("fails the build on a filename that is not URL-safe", () => {
    addDoc("my post", "2024-01-01", []);

    expect(() => getBlogPostSlugs()).toThrow(/not URL-safe/);
    expect(() => getAllBlogPosts()).toThrow(/not URL-safe/);
  });
});

describe("category routing", () => {
  it("builds a slugified href", () => {
    expect(categoryHref("Wargames Atlantic")).toBe(
      "/texts/category/wargames-atlantic",
    );
  });

  it("round-trips a category through its slug", () => {
    addDoc("a", "2024-01-01", ["Wargames Atlantic"]);

    expect(getCategoryBySlug("wargames-atlantic")).toBe("Wargames Atlantic");
  });

  it("returns null for a slug with no category behind it", () => {
    addDoc("a", "2024-01-01", ["Painting"]);

    expect(getCategoryBySlug("bases")).toBeNull();
  });

  it("pairs every category with its href, sorted", () => {
    addDoc("a", "2024-01-01", ["Painting", "Bases"]);

    expect(getCategoryFilterItems()).toEqual([
      { label: "Bases", href: "/texts/category/bases" },
      { label: "Painting", href: "/texts/category/painting" },
    ]);
  });
});
