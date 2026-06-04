import Link from 'next/link'
import { ArrowRight, CalendarDays, FileText, UtensilsCrossed } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminStatCard } from '@/components/admin/admin-stat-card'
import { Button } from '@/components/ui/button'
import {
  getContentPages,
  getMenuSections,
  getReservations,
} from '@/lib/admin/store'
import type { ReservationStatus } from '@/lib/admin/types'

export default async function AdminDashboardPage() {
  const [pages, sections, reservations] = await Promise.all([
    getContentPages(),
    getMenuSections(),
    getReservations(),
  ])

  const itemCount = sections.reduce((n, s) => n + s.items.length, 0)
  const pending = reservations.filter((r) => r.status === 'pending').length
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = reservations.filter(
    (r) => r.date >= today && !['cancelled', 'completed', 'no_show'].includes(r.status),
  ).length

  const quickLinks = [
    {
      href: '/admin/content',
      title: 'Contentbeheer',
      description: `${pages.length} pagina's beheren`,
      icon: FileText,
    },
    {
      href: '/admin/menu',
      title: 'Menu beheer',
      description: `${sections.length} categorieën · ${itemCount} gerechten`,
      icon: UtensilsCrossed,
    },
    {
      href: '/admin/reservations',
      title: 'Reserveringen',
      description: `${pending} openstaand · ${upcoming} komend`,
      icon: CalendarDays,
    },
  ] as const

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Overzicht"
        description="Beheer content, menu en reserveringen vanuit één centrale omgeving."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminStatCard label="Contentpagina's" value={pages.length} icon={FileText} />
        <AdminStatCard
          label="Menugerechten"
          value={itemCount}
          hint={`${sections.length} categorieën`}
          icon={UtensilsCrossed}
        />
        <AdminStatCard
          label="Reserveringen"
          value={reservations.length}
          hint={`${pending} in afwachting`}
          icon={CalendarDays}
        />
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <Icon className="size-5" />
            </div>
            <h2 className="font-semibold text-brand-navy group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4">
              Openen <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-5">
          <h2 className="font-display text-sm uppercase tracking-wide text-brand-navy">
            Recente reserveringen
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/reservations">Alles bekijken</Link>
          </Button>
        </div>
        <ul className="divide-y divide-border/60">
          {reservations.slice(0, 5).map((r) => (
            <li key={r.id}>
              <Link
                href={`/admin/reservations/${r.id}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 sm:px-5 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-brand-navy truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.date} · {r.time} · {r.guests} gasten
                  </p>
                </div>
                <StatusPill status={r.status} />
              </Link>
            </li>
          ))}
          {reservations.length === 0 ? (
            <li className="px-5 py-8 text-center text-sm text-muted-foreground">
              Nog geen reserveringen
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  )
}

function StatusPill({ status }: { status: ReservationStatus }) {
  const styles: Record<ReservationStatus, string> = {
    pending: 'bg-amber-100 text-amber-900',
    confirmed: 'bg-primary/15 text-brand-navy',
    seated: 'bg-brand-blue-light text-brand-navy',
    completed: 'bg-muted text-muted-foreground',
    cancelled: 'bg-destructive/10 text-destructive',
    no_show: 'bg-destructive/10 text-destructive',
  }
  const labels: Record<ReservationStatus, string> = {
    pending: 'In afwachting',
    confirmed: 'Bevestigd',
    seated: 'Aan tafel',
    completed: 'Afgerond',
    cancelled: 'Geannuleerd',
    no_show: 'No-show',
  }
  return (
    <span
      className={`inline-flex shrink-0 self-start sm:self-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
