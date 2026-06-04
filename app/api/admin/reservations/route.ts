import { NextResponse } from 'next/server'
import type { Reservation } from '@/lib/admin/types'
import {
  getReservations,
  newReservationId,
  saveReservation,
} from '@/lib/admin/store'

export async function GET() {
  const reservations = await getReservations()
  return NextResponse.json({ reservations })
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Reservation>
  const now = new Date().toISOString()
  const reservation: Reservation = {
    id: body.id ?? newReservationId(),
    date: body.date ?? '',
    time: body.time ?? '',
    guests: body.guests ?? '2',
    name: body.name?.trim() ?? '',
    email: body.email?.trim() ?? '',
    phone: body.phone?.trim() ?? '',
    notes: body.notes ?? '',
    status: body.status ?? 'pending',
    createdAt: body.createdAt ?? now,
    updatedAt: now,
  }
  if (!reservation.name || !reservation.date || !reservation.time) {
    return NextResponse.json(
      { error: 'Naam, datum en tijd zijn verplicht' },
      { status: 400 },
    )
  }
  const saved = await saveReservation(reservation)
  return NextResponse.json({ reservation: saved }, { status: 201 })
}
