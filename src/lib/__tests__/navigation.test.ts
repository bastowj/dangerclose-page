import { isRouteActive } from "../navigation";

describe("isRouteActive", () => {
  it("matches a route exactly", () => {
    expect(isRouteActive("/texts", "/texts")).toBe(true);
  });

  it("matches nested routes", () => {
    expect(isRouteActive("/texts/example-post", "/texts")).toBe(true);
  });

  it("does not treat matching prefixes as nested routes", () => {
    expect(isRouteActive("/texts-extra", "/texts")).toBe(false);
  });

  it("keeps the homepage exact", () => {
    expect(isRouteActive("/texts", "/")).toBe(false);
  });
});
