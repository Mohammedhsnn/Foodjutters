export function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

/** Navbar-klik: altijd bovenaan, ook op dezelfde route of na een hash. */
export function handleNavLinkClick(href: string, pathname: string) {
  const targetPath = href.split('#')[0] || '/'

  if (targetPath === pathname || href === pathname) {
    if (window.location.hash) {
      window.history.replaceState(null, '', targetPath)
    }
    scrollPageToTop()
  }
}
