import { NextResponse } from 'next/server'
import { newReservationId } from '@/lib/admin/ids'
import { saveReservation } from '@/lib/db/repository'

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string
    email?: string
    phone?: string
    message?: string
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { error: 'Naam, e-mail en bericht zijn verplicht' },
      { status: 400 },
    )
  }

  const now = new Date().toISOString()
  const today = now.slice(0, 10)

  await saveReservation({
    id: newReservationId(),
    date: today,
    time: '—',
    guests: '—',
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim() ?? '',
    notes: `[Contactformulier]\n\n${body.message.trim()}`,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
