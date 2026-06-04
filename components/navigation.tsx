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
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const navSolid = scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        navSolid
          ? 'bg-white/97 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo — beeldmerk boven, FoodJutters onder */}
        <Link
          href="/"
          className="flex items-center shrink-0 min-w-0"
          aria-label="FoodJutters – naar de homepage"
        >
          <Logo size="sm" layout="row" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Hoofdnavigatie">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[13px] font-medium tracking-wide transition-colors relative group',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-primary'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-0.5 left-0 h-px bg-primary rounded-full transition-all duration-200',
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              'ml-1 font-display uppercase tracking-wide text-xs px-5 py-2 rounded-full transition-all shadow-sm',
              'bg-brand-navy text-white hover:bg-primary'
            )}
          >
            Reserveer
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors',
            'text-brand-dark hover:bg-white/40'
          )}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg">
          <nav className="flex flex-col px-6 py-3 gap-0" aria-label="Mobiele navigatie">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'py-3 text-sm font-medium border-b border-border/40 transition-colors',
                  pathname === link.href ? 'text-primary' : 'text-foreground/75 hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 mb-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-brand-blue-dark transition-colors"
            >
              Reserveer een tafel
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
