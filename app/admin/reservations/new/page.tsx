'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Group, Stack } from '@mantine/core'
import { adminNotify } from '@/lib/admin/icons'
import { AdminBackButton } from '@/components/admin/admin-back-button'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ReservationForm } from '@/components/admin/reservation-form'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { Reservation } from '@/lib/admin/types'
import { newReservationId } from '@/lib/admin/ids'

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
      adminNotify.error('Naam is verplicht')
      return
    }
    setSaving(true)
    try {
      const data = await adminFetch<{ reservation: Reservation }>(
        '/api/admin/reservations',
        { method: 'POST', body: JSON.stringify(reservation) },
      )
      adminNotify.success('Aangemaakt', 'De reservering staat nu in uw overzicht')
      router.push(`/admin/reservations/${data.reservation.id}`)
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Aanmaken mislukt')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Stack gap="lg" pb="xl">
      <AdminBackButton href="/admin/reservations" label="Terug naar overzicht" />

      <AdminPageHeader
        eyebrow="Reserveringen"
        title="Nieuwe reservering"
        description="Gebruik dit voor telefonische boekingen of walk-ins. Vul de gegevens in en klik op opslaan."
        actions={
          <Button onClick={handleCreate} loading={saving} color="navy">
            Reservering aanmaken
          </Button>
        }
        help={
          <AdminHelpBox title="Wanneer gebruikt u dit?">
            Als een gast belt of langskomt zonder via de website te reserveren. Na het aanmaken kunt u de status
            beheren zoals bij andere reserveringen.
          </AdminHelpBox>
        }
      />

      <ReservationForm value={reservation} onChange={setReservation} />

      <Group justify="flex-end">
        <Button onClick={handleCreate} loading={saving} color="navy">
          Reservering aanmaken
        </Button>
      </Group>
    </Stack>
  )
}
