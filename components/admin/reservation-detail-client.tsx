'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Group, Stack } from '@mantine/core'
import { adminNotify } from '@/lib/admin/icons'
import { AdminBackButton } from '@/components/admin/admin-back-button'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button'
import { ReservationForm } from '@/components/admin/reservation-form'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { Reservation } from '@/lib/admin/types'

export function ReservationDetailClient({
  reservationId,
  initialReservation,
}: {
  reservationId: string
  initialReservation: Reservation
}) {
  const router = useRouter()
  const [reservation, setReservation] = useState(initialReservation)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const data = await adminFetch<{ reservation: Reservation }>(
        `/api/admin/reservations/${reservationId}`,
        { method: 'PUT', body: JSON.stringify(reservation) },
      )
      setReservation(data.reservation)
      adminNotify.success('Opgeslagen', 'De reservering is bijgewerkt')
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await adminFetch(`/api/admin/reservations/${reservationId}`, { method: 'DELETE' })
      adminNotify.success('Reservering verwijderd')
      router.push('/admin/reservations')
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Verwijderen mislukt')
      setDeleting(false)
    }
  }

  return (
    <Stack gap="lg" pb="xl">
      <AdminBackButton href="/admin/reservations" label="Terug naar alle reserveringen" />

      <AdminPageHeader
        title={reservation.name}
        description={`${reservation.date} om ${reservation.time} · ${reservation.guests} gasten`}
        actions={
          <Group gap="sm">
            <ConfirmDeleteButton
              title="Reservering verwijderen?"
              description={`De reservering van ${reservation.name} wordt permanent verwijderd.`}
              onConfirm={handleDelete}
              loading={deleting}
            />
            <Button onClick={handleSave} loading={saving} color="navy">
              Wijzigingen opslaan
            </Button>
          </Group>
        }
        help={
          <AdminHelpBox title="Status wijzigen">
            Zet de status op <strong>Bevestigd</strong> zodra u de gast heeft ingepland. Voeg opmerkingen toe
            als er speciale wensen zijn (allergieën, kinderstoel, enz.).
          </AdminHelpBox>
        }
      />

      <ReservationForm value={reservation} onChange={setReservation} />

      <Group justify="flex-end">
        <Button onClick={handleSave} loading={saving} color="navy">
          Wijzigingen opslaan
        </Button>
      </Group>
    </Stack>
  )
}
