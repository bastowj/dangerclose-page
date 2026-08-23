import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/Footer";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

beforeEach(() => {
  mockUsePathname.mockReturnValue("/texts/example-post");
});

describe("Footer", () => {
  it("marks the parent navigation item active on a nested route", () => {
    render(<Footer />);

    const postsLink = screen.getByRole("link", { name: "Posts" });
    expect(postsLink).toHaveClass("font-semibold");
    expect(postsLink).toHaveAttribute("aria-current", "page");

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveClass("font-normal");
    expect(homeLink).not.toHaveAttribute("aria-current");
  });
});
