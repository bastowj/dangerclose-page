import { assertSafeSlug, findBySlug, isValidSlug, slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates multi-word values", () => {
    expect(slugify("Battlegroup Modern Unofficial")).toBe(
      "battlegroup-modern-unofficial",
    );
    expect(slugify("Wargames Atlantic")).toBe("wargames-atlantic");
  });

  it("leaves single lowercase words untouched", () => {
    expect(slugify("saga")).toBe("saga");
  });

  it("collapses runs of punctuation into a single hyphen", () => {
    expect(slugify("Sci-Fi / Fantasy!!")).toBe("sci-fi-fantasy");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  --Painting--  ")).toBe("painting");
  });

  it("strips diacritics rather than dropping the letter", () => {
    expect(slugify("Blitzkrieg Österreich")).toBe("blitzkrieg-osterreich");
  });

  it("returns an empty string when nothing survives", () => {
    expect(slugify("!!!")).toBe("");
  });
});

describe("findBySlug", () => {
  const values = ["SAGA", "Wargames Atlantic", "Battlegroup"];

  it("resolves a slug back to its original value", () => {
    expect(findBySlug(values, "wargames-atlantic")).toBe("Wargames Atlantic");
    expect(findBySlug(values, "saga")).toBe("SAGA");
  });

  it("returns null for an unknown slug", () => {
    expect(findBySlug(values, "oathmark")).toBeNull();
  });

  it("does not match on the raw value, only the slug", () => {
    expect(findBySlug(values, "Wargames Atlantic")).toBeNull();
  });

  it("returns null against an empty list", () => {
    expect(findBySlug([], "saga")).toBeNull();
  });
});

describe("isValidSlug", () => {
  it("accepts the shapes real content filenames produce", () => {
    expect(isValidSlug("example-post")).toBe(true);
    expect(isValidSlug("cold_war_gone_hot_1984")).toBe(true);
    expect(isValidSlug("Caen1944")).toBe(true);
  });

  it("rejects anything that would need percent-encoding in a URL", () => {
    expect(isValidSlug("my post")).toBe(false);
    expect(isValidSlug("post/../etc")).toBe(false);
    expect(isValidSlug("bücher")).toBe(false);
    expect(isValidSlug("post?x=1")).toBe(false);
    expect(isValidSlug("")).toBe(false);
  });
});

describe("assertSafeSlug", () => {
  it("returns a safe slug unchanged", () => {
    expect(assertSafeSlug("example-post", "Post")).toBe("example-post");
  });

  it("throws naming the kind and the offending slug", () => {
    expect(() => assertSafeSlug("my post", "Post")).toThrow(
      /Post slug "my post" is not URL-safe/,
    );
  });

  it("throws on a slug that could escape its route segment", () => {
    expect(() => assertSafeSlug("../secret", "Page")).toThrow(/not URL-safe/);
  });
});
