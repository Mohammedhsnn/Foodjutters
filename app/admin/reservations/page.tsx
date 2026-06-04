'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { CalendarPlus, Eye, Search } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminEmpty, AdminError, AdminLoading } from '@/components/admin/admin-states'
import { adminFetch, ApiError } from '@/lib/admin/api'
import {
  RESERVATION_STATUS_LABELS,
  type Reservation,
  type ReservationStatus,
} from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const STATUS_OPTIONS: ReservationStatus[] = [
  'pending',
  'confirmed',
  'seated',
  'completed',
  'cancelled',
  'no_show',
]

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState('')

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await adminFetch<{ reservations: Reservation[] }>(
        '/api/admin/reservations',
      )
      setReservations(data.reservations)
    } catch (e) {
      setReservations(null)
      setError(e instanceof ApiError ? e.message : 'Laden mislukt')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    if (!reservations) return []
    return reservations.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (dateFilter && r.date !== dateFilter) return false
      const q = query.toLowerCase()
      if (!q) return true
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      )
    })
  }, [reservations, query, statusFilter, dateFilter])

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Reserveringen"
        title="Overzicht"
        description="Beheer alle tafelreserveringen, status en gastgegevens."
        actions={
          <Button asChild className="rounded-full">
            <Link href="/admin/reservations/new">
              <CalendarPlus className="size-4" />
              Nieuwe reservering
            </Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam, e-mail, telefoon…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {RESERVATION_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-[180px] bg-card"
          aria-label="Filter op datum"
        />
        {(query || statusFilter !== 'all' || dateFilter) ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('')
              setStatusFilter('all')
              setDateFilter('')
            }}
          >
            Filters wissen
          </Button>
        ) : null}
      </div>

      {error ? <AdminError message={error} onRetry={load} /> : null}
      {!error && reservations === null ? <AdminLoading /> : null}
      {!error && reservations && filtered.length === 0 ? (
        <AdminEmpty
          title="Geen reserveringen"
          description="Pas filters aan of maak een nieuwe reservering aan."
          action={
            <Button asChild className="rounded-full">
              <Link href="/admin/reservations/new">
                <CalendarPlus className="size-4" /> Nieuwe reservering
              </Link>
            </Button>
          }
        />
      ) : null}

      {!error && reservations && filtered.length > 0 ? (
        <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Tijd</TableHead>
                  <TableHead>Gast</TableHead>
                  <TableHead className="hidden sm:table-cell">Gasten</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="tabular-nums whitespace-nowrap">{r.date}</TableCell>
                    <TableCell className="tabular-nums">{r.time}</TableCell>
                    <TableCell>
                      <div className="min-w-0">
                        <p className="font-medium text-brand-navy truncate">{r.name}</p>
                        <p className="text-xs text-muted-foreground truncate hidden md:block">
                          {r.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{r.guests}</TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/reservations/${r.id}`}>
                          <Eye className="size-3.5" />
                          Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="px-4 py-3 text-xs text-muted-foreground border-t border-border/60">
            {filtered.length} van {reservations.length} reserveringen
          </p>
        </div>
      ) : null}
    </div>
  )
}

function StatusBadge({ status }: { status: ReservationStatus }) {
  const variant =
    status === 'cancelled' || status === 'no_show'
      ? 'destructive'
      : status === 'pending'
        ? 'outline'
        : 'secondary'
  return <Badge variant={variant}>{RESERVATION_STATUS_LABELS[status]}</Badge>
}
