export const MENU_PAGE_VISIBLE_KEY = 'menu_page_visible'

export type PublicNavLink = { href: string; label: string }

const BASE_NAV_LINKS: PublicNavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/menu', label: 'Menu' },
  { href: '/impressie', label: 'Impressie' },
  { href: '/contact', label: 'Contact' },
]

export function parseMenuPageVisible(value: string | undefined | null): boolean {
  return value === 'true' || value === '1'
}

export function getPublicNavLinks(menuPageVisible: boolean): PublicNavLink[] {
  if (menuPageVisible) return BASE_NAV_LINKS
  return BASE_NAV_LINKS.filter((link) => link.href !== '/menu')
}
