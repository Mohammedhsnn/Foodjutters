import { ReservationsListClient } from '@/components/admin/reservations-list-client'
import { getReservations } from '@/lib/admin/store'

export default async function AdminReservationsPage() {
  const reservations = await getReservations()
  return <ReservationsListClient reservations={reservations} />
}
