'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
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

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/98 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-border)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 min-w-0"
          aria-label="FoodJutters – naar de homepage"
        >
          <Logo size="sm" layout="row" />
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
                  : 'text-foreground/65 hover:text-primary hover:bg-primary/5'
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

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center font-display uppercase tracking-widest text-[11px] px-5 py-2.5 rounded-full transition-all duration-200 bg-brand-navy text-white hover:bg-primary shadow-sm"
          >
            Reserveer
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              'text-brand-dark hover:bg-primary/10'
            )}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border/40 shadow-lg">
          <nav className="flex flex-col px-6 py-2" aria-label="Mobiele navigatie">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center py-3.5 text-sm font-medium border-b border-border/30 transition-colors',
                  pathname === link.href ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 mb-3 bg-brand-navy text-white text-sm font-display uppercase tracking-widest px-5 py-3 rounded-full text-center hover:bg-primary transition-colors"
            >
              Reserveer een tafel
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
