type ProjectDoc = {
  slug: string;
  title: string;
  // Mirrors the collection schema: .nullish() yields `T | null | undefined`.
  subTitle?: string | null;
  excerpt?: string | null;
  ruleset: string;
  coverImage?: string | null;
  body: string;
};

const mockProjects: ProjectDoc[] = [];

jest.mock(
  "content-collections",
  () => ({
    allProjects: mockProjects,
  }),
  { virtual: true },
);

import {
  getAllProjects,
  getAllRulesets,
  getProjectsByRuleset,
  getRulesetBySlug,
  getRulesetFilterItems,
  rulesetHref,
} from "../projects";

function addDoc(slug: string, ruleset: string) {
  mockProjects.push({ slug, title: slug, ruleset, body: "" });
}

beforeEach(() => {
  mockProjects.length = 0;
});

describe("project shape", () => {
  it("exposes frontmatter fields flat on the project", () => {
    addDoc("saga", "SAGA");

    const [project] = getAllProjects();
    expect(project).toMatchObject({
      slug: "saga",
      title: "saga",
      ruleset: "SAGA",
    });
  });

  it("normalises absent optional fields to undefined", () => {
    mockProjects.push({
      slug: "saga",
      title: "SAGA",
      ruleset: "SAGA",
      subTitle: null,
      excerpt: null,
      coverImage: null,
      body: "",
    });

    const [project] = getAllProjects();
    expect(project.subTitle).toBeUndefined();
    expect(project.excerpt).toBeUndefined();
    expect(project.coverImage).toBeUndefined();
  });
});

describe("getAllRulesets", () => {
  it("returns a sorted, deduplicated list", () => {
    addDoc("a", "SAGA");
    addDoc("b", "Battlegroup");
    addDoc("c", "SAGA");

    expect(getAllRulesets()).toEqual(["Battlegroup", "SAGA"]);
  });

  it("returns empty array with no projects", () => {
    expect(getAllRulesets()).toEqual([]);
  });
});

describe("getProjectsByRuleset", () => {
  it("returns only projects using that ruleset", () => {
    addDoc("a", "SAGA");
    addDoc("b", "Battlegroup");
    addDoc("c", "SAGA");

    expect(getProjectsByRuleset("SAGA").map((p) => p.slug)).toEqual(["a", "c"]);
  });

  it("returns empty array when nothing matches", () => {
    addDoc("a", "SAGA");

    expect(getProjectsByRuleset("Oathmark")).toEqual([]);
  });
});

describe("ruleset routing", () => {
  it("builds a slugified href for a multi-word ruleset", () => {
    expect(rulesetHref("Battlegroup Modern Unofficial")).toBe(
      "/projects/ruleset/battlegroup-modern-unofficial",
    );
  });

  it("round-trips a ruleset through its slug", () => {
    addDoc("a", "Battlegroup Modern Unofficial");

    expect(getRulesetBySlug("battlegroup-modern-unofficial")).toBe(
      "Battlegroup Modern Unofficial",
    );
  });

  it("returns null for an unknown slug", () => {
    addDoc("a", "SAGA");

    expect(getRulesetBySlug("oathmark")).toBeNull();
  });

  it("pairs every ruleset with its href", () => {
    addDoc("a", "SAGA");
    addDoc("b", "Oathmark");

    expect(getRulesetFilterItems()).toEqual([
      { label: "Oathmark", href: "/projects/ruleset/oathmark" },
      { label: "SAGA", href: "/projects/ruleset/saga" },
    ]);
  });
});
