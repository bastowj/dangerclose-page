type ImageDoc = {
  slug: string;
  src: string;
  alt: string;
  // Mirrors the collection schema: .nullish() yields `T | null | undefined`.
  caption?: string | null;
  date: string;
  project?: string | null;
  categories: string[];
  showcase: boolean;
  gallery: boolean;
};

const mockImages: ImageDoc[] = [];

jest.mock(
  "content-collections",
  () => ({
    allImages: mockImages,
  }),
  { virtual: true },
);

import {
  getAllImageCategories,
  getAllImages,
  getImageCategoryBySlug,
  getImageCategoryFilterItems,
  getImagesByCategory,
  imageCategoryHref,
} from "../images";

function addDoc(
  slug: string,
  date: string,
  categories: string[],
  gallery = true,
) {
  mockImages.push({
    slug,
    src: `/images/${slug}.jpg`,
    alt: slug,
    date,
    categories,
    showcase: false,
    gallery,
  });
}

beforeEach(() => {
  mockImages.length = 0;
});

describe("getAllImages", () => {
  it("sorts newest first", () => {
    addDoc("old", "2023-01-01", []);
    addDoc("new", "2024-06-01", []);

    expect(getAllImages().map((i) => i.slug)).toEqual(["new", "old"]);
  });
});

describe("gallery scoping", () => {
  it("omits non-gallery images from category listings", () => {
    addDoc("shown", "2024-01-01", ["Irish"]);
    addDoc("hidden", "2024-02-01", ["Irish"], false);

    expect(getImagesByCategory("Irish").map((i) => i.slug)).toEqual(["shown"]);
  });

  it("does not surface a category that only non-gallery images carry", () => {
    addDoc("shown", "2024-01-01", ["Irish"]);
    addDoc("hidden", "2024-02-01", ["Workbench"], false);

    expect(getAllImageCategories()).toEqual(["Irish"]);
  });

  it("returns a sorted, deduplicated category list", () => {
    addDoc("a", "2024-01-01", ["SAGA", "Irish"]);
    addDoc("b", "2024-02-01", ["Irish"]);

    expect(getAllImageCategories()).toEqual(["Irish", "SAGA"]);
  });
});

describe("image category routing", () => {
  it("builds a slugified href", () => {
    expect(imageCategoryHref("Wargames Atlantic")).toBe(
      "/images/category/wargames-atlantic",
    );
  });

  it("round-trips a category through its slug", () => {
    addDoc("a", "2024-01-01", ["Wargames Atlantic"]);

    expect(getImageCategoryBySlug("wargames-atlantic")).toBe(
      "Wargames Atlantic",
    );
  });

  it("returns null for a category only non-gallery images carry", () => {
    addDoc("hidden", "2024-01-01", ["Workbench"], false);

    expect(getImageCategoryBySlug("workbench")).toBeNull();
  });

  it("pairs every category with its href", () => {
    addDoc("a", "2024-01-01", ["Irish", "SAGA"]);

    expect(getImageCategoryFilterItems()).toEqual([
      { label: "Irish", href: "/images/category/irish" },
      { label: "SAGA", href: "/images/category/saga" },
    ]);
  });
});
