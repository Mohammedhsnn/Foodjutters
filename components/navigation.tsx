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
        )}
      >
        <div
          className={cn(
            'max-w-6xl mx-auto transition-all duration-300',
            mobileShell &&
              'max-md:rounded-2xl max-md:bg-white/95 max-md:backdrop-blur-xl max-md:shadow-[0_8px_28px_rgba(27,67,100,0.12)] max-md:ring-1 max-md:ring-white/80 max-md:overflow-hidden',
            !mobileShell && 'px-5 sm:px-8',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-4',
              mobileShell ? 'h-11 px-3' : 'h-14 sm:h-[68px]',
            )}
          >
            <Link
              href="/"
              className="flex items-center shrink-0 min-w-0"
              aria-label="FoodJutters – naar de homepage"
            >
              <Logo
                size="sm"
                layout="row"
                className={cn(mobileShell && 'max-md:[&_img]:h-8 max-md:[&_span]:text-[0.95rem]')}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-0.5" aria-label="Hoofdnavigatie">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-200',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/65 hover:text-primary hover:bg-primary/5',
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      aria-hidden
                    />
                  )}
                </Link>
              ))}
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
