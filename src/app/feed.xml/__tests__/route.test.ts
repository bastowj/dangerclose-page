jest.mock(
  "content-collections",
  () => ({
    allTexts: [],
    allPages: [],
  }),
  { virtual: true },
);

import { GET } from "../route";
import * as blog from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

jest.mock("@/lib/blog");

function makePost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    slug: "test-post",
    body: "",
    title: "Test Post",
    date: "2024-06-01",
    excerpt: "A test excerpt.",
    categories: ["Painting"],
    author: "Danger Close! Painting",
    ...overrides,
  };
}

beforeEach(() => {
  jest.spyOn(blog, "getAllBlogPosts").mockReturnValue([]);
});

describe("GET /feed.xml", () => {
  it("returns 200 with correct content type", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe(
      "application/rss+xml; charset=utf-8",
    );
  });

  it("returns valid RSS envelope", async () => {
    const res = await GET();
    const xml = await res.text();
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("</rss>");
    expect(xml).toContain("<channel>");
  });

  it("includes post title, link, date, and excerpt", async () => {
    jest.spyOn(blog, "getAllBlogPosts").mockReturnValue([makePost()]);
    const xml = await (await GET()).text();
    expect(xml).toContain("<![CDATA[Test Post]]>");
    expect(xml).toContain("/texts/test-post");
    expect(xml).toContain("<![CDATA[A test excerpt.]]>");
    expect(xml).toContain(new Date("2024-06-01").toUTCString());
  });

  it("declares the Dublin Core namespace used for creator", async () => {
    const xml = await (await GET()).text();
    expect(xml).toContain('xmlns:dc="http://purl.org/dc/elements/1.1/"');
  });

  it("includes author as dc:creator when present", async () => {
    jest.spyOn(blog, "getAllBlogPosts").mockReturnValue([makePost()]);
    const xml = await (await GET()).text();
    // RSS 2.0 <author> requires an email address, so use dc:creator for a name.
    expect(xml).toContain(
      "<dc:creator><![CDATA[Danger Close! Painting]]></dc:creator>",
    );
    expect(xml).not.toContain("<author>");
  });

  it("omits the creator tag when no author is present", async () => {
    jest
      .spyOn(blog, "getAllBlogPosts")
      .mockReturnValue([makePost({ author: undefined })]);
    const xml = await (await GET()).text();
    expect(xml).not.toContain("<dc:creator>");
  });

  it("sets lastBuildDate from the newest post", async () => {
    jest
      .spyOn(blog, "getAllBlogPosts")
      .mockReturnValue([makePost({ date: "2024-06-01" })]);
    const xml = await (await GET()).text();
    expect(xml).toContain(
      `<lastBuildDate>${new Date("2024-06-01").toUTCString()}</lastBuildDate>`,
    );
  });

  it("omits lastBuildDate when there are no posts", async () => {
    const xml = await (await GET()).text();
    expect(xml).not.toContain("<lastBuildDate>");
  });

  it("includes categories", async () => {
    jest
      .spyOn(blog, "getAllBlogPosts")
      .mockReturnValue([makePost({ categories: ["Painting", "Warhammer"] })]);
    const xml = await (await GET()).text();
    expect(xml).toContain("<category>Painting</category>");
    expect(xml).toContain("<category>Warhammer</category>");
  });

  it("renders one item per post", async () => {
    jest
      .spyOn(blog, "getAllBlogPosts")
      .mockReturnValue([
        makePost({ title: "Post A" }),
        makePost({ title: "Post B" }),
      ]);
    const xml = await (await GET()).text();
    expect(xml).toContain("<![CDATA[Post A]]>");
    expect(xml).toContain("<![CDATA[Post B]]>");
  });
});
