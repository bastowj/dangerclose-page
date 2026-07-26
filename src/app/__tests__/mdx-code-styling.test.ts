import { readFileSync } from "node:fs";
import path from "node:path";

const css = readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf8",
);

/** Body of a rule whose selector starts its own line, so `.mdx-code` does not
 *  accidentally match the `.mdx-pre .mdx-code` reset. */
function ruleBody(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`^\\s*${escaped}\\s*\\{([^}]*)\\}`, "m"));
  return match ? match[1] : "";
}

/**
 * Guards a coupling between MDXContent.tsx and globals.css: the `code`
 * override merges its base class with the `language-*` class remark adds, so a
 * fenced block renders `<pre class="mdx-pre"><code class="mdx-code ...">`.
 * Without the reset the inline chip's border and padding nest inside the
 * already-bordered pre — see the double-decoration regression.
 */
describe("MDX code styling", () => {
  it("styles inline code as a bordered, padded chip", () => {
    const chip = ruleBody(".mdx-code");
    expect(chip).toContain("border");
    expect(chip).toContain("px-1.5");
  });

  it("neutralises that chip when the code sits inside a pre", () => {
    const reset = ruleBody(".mdx-pre .mdx-code");
    expect(reset).not.toBe("");
    expect(reset).toContain("bg-transparent");
    expect(reset).toContain("border-0");
    expect(reset).toContain("rounded-none");
    expect(reset).toContain("p-0");
  });

  it("keeps the reset more specific than the chip so it wins", () => {
    const chipAt = css.search(/^\s*\.mdx-code\s*\{/m);
    const resetAt = css.search(/^\s*\.mdx-pre \.mdx-code\s*\{/m);
    expect(chipAt).toBeGreaterThan(-1);
    expect(resetAt).toBeGreaterThan(-1);
    // Two classes beat one regardless of order, but keeping the reset after the
    // chip also makes the intent readable.
    expect(resetAt).toBeGreaterThan(chipAt);
  });
});
