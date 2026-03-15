import Link from "next/link";
import { footerNavItems } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-brand-title">{SITE_CONFIG.defaultTitle}</p>
          <p className="footer-copyright">© {year} All rights reserved</p>
        </div>

        <div className="footer-nav">
          {footerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="footer-nav-link"
              target={item.target}
            >
              {item.name}
            </Link>
          ))}
          <a href="/feed.xml" className="footer-nav-link">RSS</a>
        </div>
      </div>
    </footer>
  );
}
