/**
 * Match a navigation target to its route and any nested routes. The homepage
 * remains exact so it does not become active for every pathname.
 */
export function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href;

  return pathname === href || pathname.startsWith(`${href}/`);
}
