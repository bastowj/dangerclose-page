/**
 * Turns a human-readable taxonomy value into a URL segment.
 * "Battlegroup Modern Unofficial" -> "battlegroup-modern-unofficial"
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Resolves a URL segment back to the original taxonomy value.
 * Returns null when nothing matches, which callers turn into a 404.
 */
export function findBySlug(values: string[], slug: string): string | null {
  return values.find((value) => slugify(value) === slug) ?? null;
}

export function isValidSlug(value: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(value);
}

/**
 * A content file's name becomes its public URL verbatim. Unlike a taxonomy
 * value it is deliberately not slugified, because that would silently rewrite
 * already published URLs — so an unsafe filename fails the build instead.
 */
export function assertSafeSlug(slug: string, kind: string): string {
  if (!isValidSlug(slug)) {
    throw new Error(
      `${kind} slug ${JSON.stringify(slug)} is not URL-safe. Rename the file to use only letters, digits, hyphens and underscores.`,
    );
  }
  return slug;
}
