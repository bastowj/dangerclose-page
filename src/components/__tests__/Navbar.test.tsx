import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Navbar } from "@/components/Navbar";
import { navItems } from "@/constants/navigation";

const mockUsePathname = jest.fn(() => "/");
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

const setTheme = jest.fn();
jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme }),
}));

beforeEach(() => {
  mockUsePathname.mockReturnValue("/");
  setTheme.mockClear();
});

describe("Navbar", () => {
  it("marks only the current route with aria-current", () => {
    mockUsePathname.mockReturnValue("/texts");
    render(<Navbar />);

    const current = screen.getAllByRole("link", { current: "page" });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", "/texts");
  });

  it("renders every nav item", () => {
    render(<Navbar />);
    for (const item of navItems) {
      expect(
        screen.getAllByRole("link", { name: item.name }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("exposes the menu button's expanded state and toggles it", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "nav-mobile-menu");

    await user.click(button);

    const open = screen.getByRole("button", { name: "Close menu" });
    expect(open).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("nav-mobile-menu")).toBeInTheDocument();
  });

  it("closes the open menu on Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(document.getElementById("nav-mobile-menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(document.getElementById("nav-mobile-menu")).not.toBeInTheDocument();
  });

  it("switches to the light theme when the toggle is pressed", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Desktop and mobile each render a toggle.
    const toggles = screen.getAllByRole("button", {
      name: "Switch to light theme",
    });
    await user.click(toggles[0]);

    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
