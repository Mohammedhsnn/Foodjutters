'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminError, AdminLoading } from '@/components/admin/admin-states'
import { ReservationForm } from '@/components/admin/reservation-form'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { Reservation } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function AdminReservationDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await adminFetch<{ reservation: Reservation }>(
        `/api/admin/reservations/${id}`,
      )
      setReservation(data.reservation)
    } catch (e) {
      setReservation(null)
      setError(e instanceof ApiError ? e.message : 'Laden mislukt')
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  async function handleSave() {
    if (!reservation) return
    setSaving(true)
    try {
      const data = await adminFetch<{ reservation: Reservation }>(
        `/api/admin/reservations/${id}`,
        { method: 'PUT', body: JSON.stringify(reservation) },
      )
      setReservation(data.reservation)
      toast.success('Reservering opgeslagen')
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await adminFetch(`/api/admin/reservations/${id}`, { method: 'DELETE' })
      toast.success('Reservering verwijderd')
      router.push('/admin/reservations')
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Verwijderen mislukt')
      setDeleting(false)
    }
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/reservations">
            <ArrowLeft className="size-4" /> Terug
          </Link>
        </Button>
        <AdminError message={error} onRetry={load} />
      </div>
    )
  }

  if (!reservation) return <AdminLoading label="Reservering laden…" />

  return (
    <div className="space-y-6 pb-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/reservations">
          <ArrowLeft className="size-4" /> Terug naar overzicht
        </Link>
      </Button>

      <AdminPageHeader
        title={reservation.name}
        description={`${reservation.date} om ${reservation.time} · ${reservation.guests} gasten`}
        actions={
          <div className="flex flex-wrap gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="size-4" /> Verwijderen
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reservering verwijderen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    De reservering van {reservation.name} wordt permanent verwijderd.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSave} disabled={saving} className="rounded-full">
              <Save className="size-4" />
              {saving ? 'Opslaan…' : 'Opslaan'}
            </Button>
          </div>
        }
      />

      <ReservationForm value={reservation} onChange={setReservation} />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          <Save className="size-4" />
          Wijzigingen opslaan
        </Button>
      </div>
    </div>
  )
}
