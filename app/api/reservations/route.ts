import { NextResponse } from 'next/server'
import { newReservationId } from '@/lib/admin/ids'
import { saveReservation } from '@/lib/db/repository'

export async function POST(request: Request) {
  const body = (await request.json()) as {
    date?: string
    time?: string
    guests?: string
    name?: string
    email?: string
    phone?: string
    notes?: string
  }

  if (!body.name?.trim() || !body.date || !body.time) {
    return NextResponse.json(
      { error: 'Naam, datum en tijd zijn verplicht' },
      { status: 400 },
    )
  }

  const now = new Date().toISOString()
  const reservation = await saveReservation({
    id: newReservationId(),
    date: body.date,
    time: body.time,
    guests: body.guests ?? '2',
    name: body.name.trim(),
    email: body.email?.trim() ?? '',
    phone: body.phone?.trim() ?? '',
    notes: body.notes ?? '',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json({ ok: true, reservation }, { status: 201 })
}
