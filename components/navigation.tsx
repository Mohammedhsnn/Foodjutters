'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconMenu2, IconX, tablerProps } from '@/lib/site/icons'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { getPublicNavLinks } from '@/lib/site/nav'
import type { SiteSettingsProps } from '@/lib/cms/settings'

export function Navigation({ settings }: { settings: SiteSettingsProps }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navLinks = getPublicNavLinks(settings.menuPageVisible)
  const desktopNavLinks = navLinks.filter((link) => link.href !== '/contact')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isHome = pathname === '/'
  const atHomeTop = isHome && !scrolled
  const mobileShell = atHomeTop || menuOpen
  const solidHeader = scrolled || (menuOpen && !atHomeTop)
  const desktopFloating = atHomeTop

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-40 bg-brand-navy/20 backdrop-blur-[2px]"
          aria-label="Menu sluiten"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          mobileShell && 'max-md:pt-[max(0.5rem,env(safe-area-inset-top))] max-md:px-3',
          solidHeader && 'bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]',
          !solidHeader && !isHome && 'md:bg-white/92 md:backdrop-blur-md md:border-b md:border-border/50 md:shadow-sm',
          desktopFloating && 'md:bg-transparent md:shadow-none md:border-none',
        )}
      >
        <div
          className={cn(
            'max-w-6xl mx-auto transition-all duration-300',
            mobileShell &&
              'max-md:rounded-2xl max-md:bg-white/95 max-md:backdrop-blur-xl max-md:shadow-[0_8px_28px_rgba(27,67,100,0.12)] max-md:ring-1 max-md:ring-white/80 max-md:overflow-hidden',
            !mobileShell && 'px-5 sm:px-8',
            desktopFloating && 'md:px-6 lg:px-8 md:pt-5',
            scrolled && 'md:pt-0 md:px-6 lg:px-8',
            !isHome && !scrolled && 'md:px-6 lg:px-8',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-4',
              mobileShell ? 'h-11 px-3' : 'h-14 sm:h-[68px]',
              desktopFloating &&
                'md:h-[4.25rem] md:px-5 md:rounded-2xl md:bg-white/88 md:backdrop-blur-xl md:border md:border-white/75 md:shadow-[0_14px_44px_rgba(27,67,100,0.12)]',
              scrolled && 'md:h-[4.5rem] md:px-0 md:rounded-none md:bg-transparent md:border-0 md:shadow-none md:backdrop-blur-none',
              !isHome && !scrolled && 'md:h-[4.5rem] md:px-0 md:rounded-none md:bg-transparent md:border-0 md:shadow-none',
            )}
          >
            <Link
              href="/"
              className="flex items-center shrink-0 min-w-0 md:pr-2"
              aria-label="FoodJutters – naar de homepage"
            >
              <Logo
                size="sm"
                layout="row"
                className={cn(
                  mobileShell && 'max-md:[&_img]:h-8 max-md:[&_span]:text-[0.95rem]',
                  'md:[&_img]:h-10 md:[&_img]:max-w-[6.75rem] md:[&_span]:text-[1.05rem]',
                )}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-3 lg:gap-4" aria-label="Hoofdnavigatie">
              <div className="flex items-center gap-0.5 rounded-full bg-brand-navy/[0.05] p-1 ring-1 ring-brand-navy/10">
                {desktopNavLinks.map((link) => {
                  const active = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'relative rounded-full px-4 py-2 font-display text-[11px] uppercase tracking-[0.14em] transition-all duration-200',
                        active
                          ? 'bg-white text-brand-navy shadow-sm ring-1 ring-brand-navy/10'
                          : 'text-brand-navy/60 hover:bg-white/70 hover:text-brand-navy',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-5 py-2.5',
                  'font-display text-[11px] uppercase tracking-[0.14em] font-semibold',
                  'bg-brand-navy text-white shadow-md shadow-brand-navy/20',
                  'hover:bg-primary hover:shadow-primary/25 transition-all duration-200',
                  pathname === '/contact' && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-white/80',
                )}
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                Contact
              </Link>
            </nav>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                'md:hidden flex h-8 w-8 items-center justify-center rounded-lg transition-colors text-brand-navy',
                mobileShell
                  ? 'bg-brand-navy/8 hover:bg-brand-navy/12'
                  : 'bg-white/70 shadow-sm ring-1 ring-brand-navy/10 hover:bg-white/90',
              )}
              aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <IconX {...tablerProps(18)} /> : <IconMenu2 {...tablerProps(18)} />}
            </button>
          </div>

          {menuOpen ? (
            <nav
              className="md:hidden border-t border-border/50 px-1.5 py-1.5 pb-2"
              aria-label="Mobiele navigatie"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-brand-navy/80 hover:bg-primary/5 hover:text-primary',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </header>
    </>
  )
}
