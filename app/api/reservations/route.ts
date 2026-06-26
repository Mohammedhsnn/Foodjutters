import { NextResponse } from 'next/server'
import { formspreeGroupFormId, submitToFormspree } from '@/lib/site/formspree'

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

  const email = body.email?.trim() ?? ''
  const fields: Record<string, string> = {
    _subject: 'Groepsreservering via foodjutters.nl',
    form_type: 'groepsreservering',
    organisation,
    name: body.name.trim(),
    email,
    phone: body.phone?.trim() ?? '',
    date: body.date,
    time: body.time,
    guests,
    notes: body.notes?.trim() ?? '',
  }
  if (email) fields._replyto = email

  const result = await submitToFormspree(formspreeGroupFormId(), fields)

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
