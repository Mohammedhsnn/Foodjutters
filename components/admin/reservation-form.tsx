'use client'

import type { Reservation, ReservationStatus } from '@/lib/admin/types'
import { RESERVATION_STATUS_LABELS } from '@/lib/admin/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const STATUSES: ReservationStatus[] = [
  'pending',
  'confirmed',
  'seated',
  'completed',
  'cancelled',
  'no_show',
]

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00',
]

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8+']

type Props = {
  value: Reservation
  onChange: (value: Reservation) => void
}

export function ReservationForm({ value, onChange }: Props) {
  function patch(partial: Partial<Reservation>) {
    onChange({ ...value, ...partial })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="heading-display text-lg text-brand-navy">
            Reservering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                type="date"
                required
                value={value.date}
                onChange={(e) => patch({ date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Tijd</Label>
              <Select value={value.time} onValueChange={(t) => patch({ time: t })}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Kies tijd" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Aantal gasten</Label>
              <Select value={value.guests} onValueChange={(g) => patch({ guests: g })}>
                <SelectTrigger id="guests">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GUEST_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={value.status}
                onValueChange={(s) => patch({ status: s as ReservationStatus })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {RESERVATION_STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Opmerkingen</Label>
            <Textarea
              id="notes"
              rows={4}
              value={value.notes}
              onChange={(e) => patch({ notes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="heading-display text-lg text-brand-navy">Gast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Naam</Label>
            <Input
              id="name"
              required
              value={value.name}
              onChange={(e) => patch({ name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={value.email}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefoon</Label>
            <Input
              id="phone"
              type="tel"
              value={value.phone}
              onChange={(e) => patch({ phone: e.target.value })}
            />
          </div>
          {value.id ? (
            <p className="text-xs text-muted-foreground pt-2">
              ID: {value.id}
              {value.createdAt ? (
                <>
                  {' '}
                  · Aangemaakt{' '}
                  {new Date(value.createdAt).toLocaleString('nl-NL', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </>
              ) : null}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
