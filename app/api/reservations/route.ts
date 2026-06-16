import { NextResponse } from 'next/server'
import { newReservationId } from '@/lib/admin/ids'
import { saveReservation } from '@/lib/db/repository'

export async function POST(request: Request) {
  const body = (await request.json()) as {
    organisation?: string
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

  const organisation = body.organisation?.trim() ?? ''
  const guests = body.guests ?? '8'
  const guestCount = parseInt(guests.replace('+', ''), 10)

  if (!organisation && (Number.isNaN(guestCount) || guestCount < 8)) {
    return NextResponse.json(
      {
        error:
          'Reserveren is alleen mogelijk voor organisaties of groepen vanaf 8 personen.',
      },
      { status: 400 },
    )
  }

  const notesParts: string[] = []
  if (organisation) notesParts.push(`[Organisatie: ${organisation}]`)
  if (body.notes?.trim()) notesParts.push(body.notes.trim())
  const notes = notesParts.join('\n\n')

  const now = new Date().toISOString()
  const reservation = await saveReservation({
    id: newReservationId(),
    date: body.date,
    time: body.time,
    guests,
    name: body.name.trim(),
    email: body.email?.trim() ?? '',
    phone: body.phone?.trim() ?? '',
    notes,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json({ ok: true, reservation }, { status: 201 })
}
