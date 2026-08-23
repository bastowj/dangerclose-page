"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNavItems } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";
import { isRouteActive } from "@/lib/navigation";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-brand-title">{SITE_CONFIG.defaultTitle}</p>
          <p className="footer-copyright">© {year} All rights reserved</p>
        </div>

        <div className="footer-nav">
          {footerNavItems.map((item) => {
            const isActive = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`footer-nav-link ${isActive ? "font-semibold" : "font-normal"}`}
                target={item.target}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
          <a href="/feed.xml" className="footer-nav-link">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
