'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  CalendarDays,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  UtensilsCrossed,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { adminFetch } from '@/lib/admin/api'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/admin/reservations', label: 'Reserveringen', icon: CalendarDays },
] as const

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col gap-1', className)} aria-label="Admin navigatie">
      {NAV.map(({ href, label, icon: Icon, ...rest }) => {
        const exact = 'exact' in rest && rest.exact
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/60',
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await adminFetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-svh flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 border-r border-sidebar-border bg-sidebar">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <Logo layout="row" size="sm" className="shrink-0" />
          <div className="min-w-0">
            <p className="font-display text-xs uppercase tracking-wide text-brand-navy leading-none">
              Admin
            </p>
            <p className="text-[10px] text-muted-foreground truncate">FoodJutters</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-4">
          <NavLinks />
          <div className="mt-auto space-y-2 border-t border-sidebar-border pt-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-brand-navy hover:bg-sidebar-accent/40 transition-colors"
            >
              <ExternalLink className="size-4" />
              Website bekijken
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="size-4" />
              Uitloggen
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-navy/40 lg:hidden"
          aria-label="Menu sluiten"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Logo layout="row" size="sm" />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Sluiten"
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          <NavLinks onNavigate={() => setMobileOpen(false)} />
          <div className="mt-auto space-y-2 border-t border-sidebar-border pt-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <ExternalLink className="size-4" />
              Website
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="size-4" />
              Uitloggen
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-3 border-b border-border/80 bg-card/95 backdrop-blur-sm px-4 sm:px-6">
          <Button
            variant="outline"
            size="icon-sm"
            className="lg:hidden shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu openen"
          >
            <Menu className="size-5" />
          </Button>
          <p className="font-display text-sm uppercase tracking-wide text-brand-navy lg:hidden">
            FoodJutters Admin
          </p>
        </header>
        <div className="flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
