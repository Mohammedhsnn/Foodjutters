'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconChevronRight,
  IconMenu2,
  IconX,
  tablerProps,
} from '@/lib/site/icons'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/menu', label: 'Menu' },
  { href: '/impressie', label: 'Impressie' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
  const atTop = isHome && !scrolled
  const mobileHeroBar = atTop
  const solidHeader = scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          mobileHeroBar && 'max-md:pt-[max(0.65rem,env(safe-area-inset-top))] max-md:px-3.5',
          solidHeader
            ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]'
            : 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-[68px] flex items-center justify-between gap-4 sm:gap-6 transition-all duration-300',
            mobileHeroBar &&
              'max-md:px-3.5 max-md:h-12 max-md:rounded-2xl max-md:bg-white/60 max-md:backdrop-blur-xl max-md:shadow-[0_8px_32px_rgba(27,67,100,0.1)] max-md:ring-1 max-md:ring-white/70',
          )}
        >
          <Link
            href="/"
            className="flex items-center shrink-0 min-w-0 transition-opacity duration-300"
            aria-label="FoodJutters – naar de homepage"
          >
            <Logo
              size="sm"
              layout="row"
              className={cn(
                mobileHeroBar && 'max-md:[&_img]:h-8 max-md:[&_span]:text-[0.95rem]',
              )}
            />
          </Link>

          {/* Desktop nav */}
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
              'md:hidden flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200',
              'text-brand-navy',
              mobileHeroBar
                ? 'bg-brand-navy/8 hover:bg-brand-navy/12 active:scale-95'
                : 'bg-white/70 shadow-sm ring-1 ring-brand-navy/10 hover:bg-white/90',
            )}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX {...tablerProps(20)} /> : <IconMenu2 {...tablerProps(20)} />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col hero-wood"
          role="dialog"
          aria-modal="true"
          aria-label="Navigatiemenu"
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/50 via-brand-blue-light/30 to-white/60 pointer-events-none"
            aria-hidden
          />
          <div className="relative flex flex-1 flex-col pt-[calc(4.5rem+env(safe-area-inset-top))] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <p className="label-vintage text-brand-navy/45 text-[10px] tracking-[0.28em] uppercase mb-4 px-1">
              Ontdek FoodJutters
            </p>
            <nav className="flex flex-col gap-1.5 flex-1" aria-label="Mobiele navigatie">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'nav-menu-link group flex items-center justify-between rounded-2xl px-4 py-4 text-[17px] font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'bg-white/85 text-primary shadow-md shadow-brand-navy/8 ring-1 ring-primary/20'
                      : 'bg-white/55 text-brand-navy/85 hover:bg-white/75 hover:text-primary',
                  )}
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <span>{link.label}</span>
                  <IconChevronRight
                    {...tablerProps(18)}
                    className={cn(
                      'opacity-35 transition-all duration-200 group-hover:opacity-80 group-hover:translate-x-0.5',
                      pathname === link.href && 'opacity-70 text-primary',
                    )}
                  />
                </Link>
              ))}
            </nav>
            <div className="mt-6 rounded-2xl bg-white/65 backdrop-blur-md px-4 py-4 ring-1 ring-white/80 shadow-sm">
              <p className="font-serif text-[10px] tracking-[0.2em] uppercase text-brand-navy/45 mb-1">
                Direct contact
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Stuur ons een bericht
                <IconChevronRight {...tablerProps(16)} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
