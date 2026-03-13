export type NavItem = {
  name: string;
  href: string;
  external?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const footerNavItems = navItems;
