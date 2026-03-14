"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navItems } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = resolvedTheme !== undefined;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <nav className="relative w-full flex items-center justify-between border-b border-subtle px-8 sm:px-20 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="/avatar.png"
            alt={SITE_CONFIG.defaultTitle}
            width={32}
            height={32}
            className="rounded-full"
          />
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
              <XMarkIcon className="nav-theme-icon" />
            ) : (
              <Bars3Icon className="nav-theme-icon" />
            )}
          </button>
        </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 left-0 bg-background border-b border-subtle z-50 md:hidden">
          <div className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link py-2 ${pathname === item.href ? "font-semibold" : ""}`}
                onClick={() => setMenuOpen(false)}
                target={item.target}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
