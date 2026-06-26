import { NextResponse } from 'next/server'
import { formspreeContactFormId, submitToFormspree } from '@/lib/site/formspree'

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

  const email = body.email.trim()
  const result = await submitToFormspree(formspreeContactFormId(), {
    _subject: 'Contactbericht via foodjutters.nl',
    _replyto: email,
    form_type: 'contact',
    name: body.name.trim(),
    email,
    phone: body.phone?.trim() ?? '',
    message: body.message.trim(),
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
