"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { navItems } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <nav className="border-b border-subtle">
      <div className="main-content-wrapper flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-bold">
          {SITE_CONFIG.defaultTitle}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "font-semibold" : ""}`}
              target={item.target}
            >
              {item.name}
            </Link>
          ))}
          {mounted && (
            <button
              className="nav-button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <SunIcon className="nav-theme-icon" />
              ) : (
                <MoonIcon className="nav-theme-icon" />
              )}
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              className="nav-button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <SunIcon className="nav-theme-icon" />
              ) : (
                <MoonIcon className="nav-theme-icon" />
              )}
            </button>
          )}
          <button
            className="nav-button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <Cross2Icon className="nav-theme-icon" />
            ) : (
              <HamburgerMenuIcon className="nav-theme-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-subtle px-4 pb-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link block py-2 ${pathname === item.href ? "font-semibold" : ""}`}
              onClick={() => setMenuOpen(false)}
              target={item.target}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
