import Link from "next/link";
import { footerNavItems } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle mt-auto">
      <div className="main-content-wrapper">
        <div className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-semibold">{SITE_CONFIG.defaultTitle}</p>
            <p className="text-muted text-sm">© {year} All rights reserved</p>
          </div>

          <div className="flex gap-6">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm"
                target={item.target}
              >
                {item.name}
              </Link>
            ))}
            <a href="/feed.xml" className="nav-link text-sm">RSS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
