'use client'

import { useState } from 'react'
import {
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconCircleCheck,
  IconClock,
  IconMail,
  IconMessage,
  IconPhone,
  IconUser,
  IconUsers,
  tablerProps,
} from '@/lib/site/icons'
import { cn } from '@/lib/utils'

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
]

const GUEST_OPTIONS = [
  '8', '10', '12', '15', '18', '20', '25', '30', '40', '50+',
]

const inputCls =
  'w-full border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

type FormData = {
  organisation: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  notes: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function GroupReservationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [data, setData] = useState<FormData>({
    organisation: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '8',
    notes: '',
  })

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const next: FormErrors = {}
    const org = data.organisation.trim()
    const guestNum = parseInt(data.guests.replace('+', ''), 10)

    if (!data.name.trim()) next.name = 'Vul uw naam in.'
    if (!data.email.trim()) {
      next.email = 'Vul uw e-mailadres in.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Vul een geldig e-mailadres in.'
    }
    if (!data.date) next.date = 'Kies een datum.'
    if (!data.time) next.time = 'Kies een tijdstip.'
    if (!org && (Number.isNaN(guestNum) || guestNum < 8)) {
      next.guests = 'Groepsreserveringen zijn vanaf 8 personen, of vul een organisatie in.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organisation: data.organisation.trim() || undefined,
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          date: data.date,
          time: data.time,
          guests: data.guests,
          notes: data.notes.trim(),
        }),
      })
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string }
        setErrors({ name: err.error ?? 'Verzenden mislukt. Probeer het opnieuw.' })
        return
      }
      setSubmitted(true)
    } catch {
      setErrors({ name: 'Verbinding mislukt. Probeer het later opnieuw.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-8 sm:py-10 px-2 gap-5">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <IconCircleCheck {...tablerProps(36)} className="text-primary" />
        </div>
        <div>
          <h3 className="heading-typewriter text-2xl text-brand-navy mb-2">Aanvraag ontvangen!</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            Bedankt, {data.name.split(' ')[0]}. We nemen zo snel mogelijk contact met u op over uw
            groepsreservering op <strong className="text-primary">{data.date}</strong> om{' '}
            <strong className="text-primary">{data.time}</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setData({
              organisation: '',
              name: '',
              email: '',
              phone: '',
              date: '',
              time: '',
              guests: '8',
              notes: '',
            })
          }}
          className="text-sm text-primary font-medium hover:underline"
        >
          Nieuwe aanvraag indienen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6" noValidate>
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5 text-sm text-brand-navy/80 leading-relaxed">
        Reserveren is alleen nodig voor <strong className="text-brand-navy">organisaties</strong> of{' '}
        <strong className="text-brand-navy">groepen vanaf 8 personen</strong>. Kleinere gezelschappen
        zijn welkom zonder reservering. Loop gerust binnen.
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="organisation" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
          Organisatie / bedrijf
        </label>
        <div className="relative">
          <IconBuilding
            {...tablerProps(16)}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="organisation"
            type="text"
            value={data.organisation}
            onChange={(e) => update('organisation', e.target.value)}
            placeholder="Optioneel. Verplicht voor organisatiereserveringen onder 8 personen"
            className={cn(inputCls, 'pl-10')}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="name" label="Contactpersoon" required icon={IconUser} error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Voor- en achternaam"
            className={cn(inputCls, errors.name && 'border-destructive')}
          />
        </Field>
        <Field id="email" label="E-mailadres" required icon={IconMail} error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="u@voorbeeld.nl"
            className={cn(inputCls, errors.email && 'border-destructive')}
          />
        </Field>
      </div>

      <Field id="phone" label="Telefoonnummer" icon={IconPhone} error={errors.phone}>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="+31 6 13449728"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field id="date" label="Datum" required icon={IconCalendar} error={errors.date}>
          <input
            id="date"
            type="date"
            value={data.date}
            onChange={(e) => update('date', e.target.value)}
            className={cn(inputCls, errors.date && 'border-destructive')}
          />
        </Field>
        <Field id="time" label="Tijdstip" required icon={IconClock} error={errors.time}>
          <select
            id="time"
            value={data.time}
            onChange={(e) => update('time', e.target.value)}
            className={cn(inputCls, errors.time && 'border-destructive')}
          >
            <option value="">Kies tijd</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="guests" label="Aantal personen" required icon={IconUsers} error={errors.guests}>
          <select
            id="guests"
            value={data.guests}
            onChange={(e) => update('guests', e.target.value)}
            className={cn(inputCls, errors.guests && 'border-destructive')}
          >
            {GUEST_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g} personen
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="notes" label="Bijzonderheden" icon={IconMessage} error={errors.notes}>
        <textarea
          id="notes"
          rows={3}
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Arrangement, dieetwensen, gelegenheid, facturatie…"
          className={cn(inputCls, 'resize-none')}
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-start bg-brand-navy hover:bg-primary text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-sm text-sm disabled:opacity-60"
      >
        <IconCheck {...tablerProps(16)} />
        {loading ? 'Verzenden…' : 'Groepsreservering aanvragen'}
      </button>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  icon: Icon,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  icon: typeof IconUser
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <div className="relative">
        <Icon
          {...tablerProps(16)}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <div className="[&_input]:pl-10 [&_select]:pl-10 [&_textarea]:pl-10">{children}</div>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
