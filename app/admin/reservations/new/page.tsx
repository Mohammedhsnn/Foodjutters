'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ReservationForm } from '@/components/admin/reservation-form'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { Reservation } from '@/lib/admin/types'
import { newReservationId } from '@/lib/admin/ids'
import { Button } from '@/components/ui/button'

function emptyReservation(): Reservation {
  const now = new Date().toISOString()
  const d = new Date()
  d.setDate(d.getDate() + 2)
  const date = d.toISOString().slice(0, 10)
  return {
    id: newReservationId(),
    date,
    time: '18:30',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    notes: '',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }
}

export default function AdminReservationNewPage() {
  const router = useRouter()
  const [reservation, setReservation] = useState<Reservation>(emptyReservation)
  const [saving, setSaving] = useState(false)

  async function handleCreate() {
    if (!reservation.name.trim()) {
      toast.error('Naam is verplicht')
      return
    }
    setSaving(true)
    try {
      const data = await adminFetch<{ reservation: Reservation }>(
        '/api/admin/reservations',
        { method: 'POST', body: JSON.stringify(reservation) },
      )
      toast.success('Reservering aangemaakt')
      router.push(`/admin/reservations/${data.reservation.id}`)
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Aanmaken mislukt')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 pb-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/reservations">
          <ArrowLeft className="size-4" /> Terug naar overzicht
        </Link>
      </Button>

      <AdminPageHeader
        eyebrow="Reserveringen"
        title="Nieuwe reservering"
        description="Voeg handmatig een reservering toe (telefoon, walk-in of groep)."
        actions={
          <Button onClick={handleCreate} disabled={saving} className="rounded-full">
            <Save className="size-4" />
            {saving ? 'Aanmaken…' : 'Aanmaken'}
          </Button>
        }
      />

      <ReservationForm value={reservation} onChange={setReservation} />

      <div className="flex justify-end">
        <Button onClick={handleCreate} disabled={saving} className="rounded-full">
          <Save className="size-4" />
          Reservering aanmaken
        </Button>
      </div>
    </div>
  )
}
