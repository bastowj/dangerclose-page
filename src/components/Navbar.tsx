"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE_CONFIG } from "@/constants/config";
import { navItems } from "@/constants/navigation";

const MOBILE_MENU_ID = "nav-mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const renderLink = (
    item: (typeof navItems)[number],
    extraClassName?: string,
  ) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`nav-link ${extraClassName ?? ""} ${isActive ? "font-semibold" : ""}`}
        target={item.target}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand-link">
        <Image
          src="/avatar.png"
          alt={SITE_CONFIG.defaultTitle}
          width={32}
          height={32}
          className="nav-brand-avatar"
        />
        {SITE_CONFIG.defaultTitle}
      </Link>

      {/* Desktop nav */}
      <div className="nav-desktop">
        {navItems.map((item) => renderLink(item))}
        <ThemeToggle />
      </div>

      {/* Mobile controls */}
      <div className="nav-mobile-buttons">
        <ThemeToggle />
        <button
          type="button"
          className="nav-button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
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
        <div className="nav-mobile-menu" id={MOBILE_MENU_ID}>
          <div className="nav-mobile-menu-inner">
            {navItems.map((item) => renderLink(item, "py-2"))}
          </div>
        </div>
      )}
    </nav>
  );
}
