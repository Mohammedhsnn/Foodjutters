import { notFound } from 'next/navigation'
import { ReservationDetailClient } from '@/components/admin/reservation-detail-client'
import { getReservation } from '@/lib/admin/store'

type Params = { params: Promise<{ id: string }> }

export default async function AdminReservationDetailPage({ params }: Params) {
  const { id } = await params
  const reservation = await getReservation(id)
  if (!reservation) notFound()
  return <ReservationDetailClient reservationId={id} initialReservation={reservation} />
}
