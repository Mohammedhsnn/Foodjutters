export type AdminSection = 'dashboard' | 'content' | 'menu' | 'reservations' | 'login'

export type AdminNavItem = {
  href: string
  label: string
  hint: string
  section: AdminSection
  /** Short intro on dashboard cards */
  description: string
  /** CTA label on dashboard cards */
  actionLabel: string
}

export const ADMIN_NAV: readonly AdminNavItem[] = [
  {
    href: '/admin',
    label: 'Dashboard',
    hint: 'Overzicht',
    section: 'dashboard',
    description: '',
    actionLabel: '',
  },
  {
    href: '/admin/content',
    label: 'Content',
    hint: 'Teksten op de website',
    section: 'content',
    description: 'Koppen, intro’s en tekstblokken per pagina aanpassen.',
    actionLabel: 'Pagina’s beheren',
  },
  {
    href: '/admin/menu',
    label: 'Menu',
    hint: 'Gerechten en prijzen',
    section: 'menu',
    description: 'Categorieën, gerechten en prijzen bijwerken.',
    actionLabel: 'Menu openen',
  },
  {
    href: '/admin/reservations',
    label: 'Reserveringen',
    hint: 'Tafels en gasten',
    section: 'reservations',
    description: 'Aanvragen bevestigen en status bijhouden.',
    actionLabel: 'Reserveringen bekijken',
  },
] as const

/** Nav items excluding dashboard — used for dashboard cards and login hints */
export const ADMIN_MODULES = ADMIN_NAV.filter((item) => item.section !== 'dashboard')

export function resolveAdminPageMeta(pathname: string) {
  if (pathname === '/admin/login') {
    return { title: 'Inloggen', section: 'login' as AdminSection }
  }
  if (pathname === '/admin' || pathname === '/admin/') {
    return {
      title: 'Dashboard',
      subtitle: 'Overzicht van uw website',
      section: 'dashboard' as AdminSection,
    }
  }
  if (pathname.startsWith('/admin/content')) {
    return {
      title: 'Contentbeheer',
      subtitle: 'Teksten op uw websitepagina’s',
      section: 'content' as AdminSection,
    }
  }
  if (pathname.startsWith('/admin/menu')) {
    return {
      title: 'Menu beheer',
      subtitle: 'Categorieën en gerechten',
      section: 'menu' as AdminSection,
    }
  }
  if (pathname.startsWith('/admin/reservations')) {
    return {
      title: 'Reserveringen',
      subtitle: 'Aanvragen en boekingen',
      section: 'reservations' as AdminSection,
    }
  }
  return { title: 'Beheer', section: 'dashboard' as AdminSection }
}
