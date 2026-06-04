'use client'

import { useState, useId } from 'react'
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, User, Mail, Phone, Users, MessageSquare, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────
interface BookingData {
  date: string        // ISO yyyy-mm-dd
  time: string        // e.g. "18:00"
  guests: string
  name: string
  email: string
  phone: string
  notes: string
}

// ── Constants ────────────────────────────────────────────────────
const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30',
  '21:00',
]
const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8+']
const OPEN_DAYS = [3, 4, 5, 6, 0] // Wed–Sun (0=Sun)
const NL_DAYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
const NL_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
]

function formatDateNL(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const dayName = NL_DAYS[date.getDay()]
  return `${dayName} ${d} ${NL_MONTHS[m - 1]} ${y}`
}

function isOpenDay(date: Date): boolean {
  return OPEN_DAYS.includes(date.getDay())
}

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function todayISO(): string {
  return toISO(new Date())
}

// ── Mini Calendar ────────────────────────────────────────────────
function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (iso: string) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // blank cells before first day (Mon-start grid)
  const startPad = (firstDay.getDay() + 6) % 7

  const cells: (Date | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: lastDay.getDate() }, (_, i) => new Date(year, month, i + 1)),
  ]

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 3)

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={year === today.getFullYear() && month <= today.getMonth()}
          className="p-1.5 rounded-lg hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Vorige maand"
        >
          <ChevronLeft size={18} className="text-brand-navy" />
        </button>
        <p className="font-display uppercase tracking-wide text-sm text-brand-navy">
          {NL_MONTHS[month]} {year}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          disabled={viewDate >= maxDate}
          className="p-1.5 rounded-lg hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Volgende maand"
        >
          <ChevronRight size={18} className="text-brand-navy" />
        </button>
      </div>

      {/* Day headers Mon–Sun */}
      <div className="grid grid-cols-7 mb-1">
        {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} />
          const iso = toISO(date)
          const isPast = date < today
          const isClosed = !isOpenDay(date)
          const disabled = isPast || isClosed || date > maxDate
          const isSelected = iso === selected
          const isToday = iso === todayISO()

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(iso)}
              aria-label={`${date.getDate()} ${NL_MONTHS[month]}`}
              aria-pressed={isSelected}
              className={cn(
                'relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all',
                disabled && 'opacity-30 cursor-not-allowed',
                !disabled && !isSelected && 'hover:bg-primary/10 text-brand-navy cursor-pointer',
                isSelected && 'bg-primary text-white shadow-md shadow-primary/30',
                !isSelected && isToday && !disabled && 'ring-1 ring-primary/40',
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      <p className="text-[11px] text-muted-foreground mt-3 text-center">
        Geopend wo – zo. Grijze datums zijn niet beschikbaar.
      </p>
    </div>
  )
}

// ── Step indicator ────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ['Datum & tijd', 'Uw gegevens', 'Bevestigen']
  return (
    <div className="flex items-center justify-center gap-0 mb-8 sm:mb-10">
      {labels.map((label, i) => {
        const step = i + 1
        const done = step < current
        const active = step === current
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                  done && 'bg-primary text-white',
                  active && 'bg-brand-navy text-white ring-4 ring-brand-navy/20',
                  !done && !active && 'bg-border text-muted-foreground',
                )}
              >
                {done ? <Check size={15} /> : step}
              </div>
              <span className={cn(
                'hidden sm:block text-[11px] font-medium whitespace-nowrap',
                active ? 'text-brand-navy' : 'text-muted-foreground',
              )}>
                {label}
              </span>
            </div>
            {step < total && (
              <div className={cn(
                'w-12 sm:w-20 h-px mx-1 sm:mx-2 mt-[-12px] transition-colors',
                done ? 'bg-primary' : 'bg-border',
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Field wrapper ─────────────────────────────────────────────────
function Field({
  label,
  required,
  error,
  icon: Icon,
  children,
  id,
}: {
  label: string
  required?: boolean
  error?: string
  icon?: React.ElementType
  children: React.ReactNode
  id: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-brand-navy">
        {Icon && <Icon size={14} className="text-primary shrink-0" />}
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

const inputCls = cn(
  'w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-muted-foreground',
  'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all',
)

// ── Main wizard ───────────────────────────────────────────────────
interface BookingWizardProps {
  /** compact = widget mode (homepage), full = page mode */
  mode?: 'compact' | 'full'
}

export function BookingWizard({ mode = 'full' }: BookingWizardProps) {
  const uid = useId()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [data, setData] = useState<BookingData>({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({})

  function update<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  // ── Validation per step ───────────────────────────────────────
  function validateStep1(): boolean {
    const errs: typeof errors = {}
    if (!data.date) errs.date = 'Kies een datum.'
    if (!data.time) errs.time = 'Kies een tijdslot.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateStep2(): boolean {
    const errs: typeof errors = {}
    if (!data.name.trim()) errs.name = 'Vul uw naam in.'
    if (!data.email.trim()) {
      errs.email = 'Vul uw e-mailadres in.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Vul een geldig e-mailadres in.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep((s) => s + 1)
  }

  function back() {
    setStep((s) => s - 1)
    setErrors({})
  }

  function confirm() {
    // In production: POST to API here
    setSubmitted(true)
  }

  // ── Success screen ───────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-8 px-4 gap-5">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle size={36} className="text-primary" />
        </div>
        <div>
          <h3 className="heading-typewriter text-2xl text-brand-navy mb-2">Aanvraag ontvangen!</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            Bedankt, {data.name.split(' ')[0]}. We sturen u een bevestiging op{' '}
            <strong className="text-brand-navy">{data.email}</strong>. Tot{' '}
            <strong className="text-primary">{formatDateNL(data.date)} om {data.time}</strong>!
          </p>
        </div>

        {/* Summary card */}
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 text-left flex flex-col gap-3">
          {[
            { label: 'Datum', value: formatDateNL(data.date) },
            { label: 'Tijdstip', value: data.time },
            { label: 'Gasten', value: data.guests },
            { label: 'Naam', value: data.name },
            { label: 'E-mail', value: data.email },
            ...(data.phone ? [{ label: 'Telefoon', value: data.phone }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm gap-3 min-w-0">
              <span className="text-muted-foreground shrink-0">{label}</span>
              <span className="text-brand-navy font-medium text-right break-all min-w-0">{value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => { setSubmitted(false); setStep(1); setData({ date: '', time: '', guests: '2', name: '', email: '', phone: '', notes: '' }) }}
          className="text-sm text-primary font-medium hover:underline"
        >
          Nieuwe reservering maken
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <StepIndicator current={step} total={3} />

      {/* ── Step 1: Date + time ──────────────────────────────── */}
      {step === 1 && (
        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <h3 className="heading-typewriter text-lg sm:text-xl text-brand-navy mb-1">Kies uw datum</h3>
            <p className="text-sm text-muted-foreground">Selecteer een beschikbare dag (wo – zo).</p>
          </div>

          <MiniCalendar selected={data.date} onSelect={(iso) => { update('date', iso); update('time', '') }} />
          {errors.date && <p className="text-xs text-destructive -mt-4">{errors.date}</p>}

          {/* Time slots — only shown when date is selected */}
          {data.date && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Clock size={15} className="text-primary shrink-0" />
                <h4 className="text-sm font-medium text-brand-navy">
                  Tijdslot kiezen voor <span className="text-primary">{formatDateNL(data.date)}</span>
                </h4>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update('time', t)}
                    className={cn(
                      'rounded-xl border py-2.5 text-sm font-medium transition-all',
                      data.time === t
                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/25'
                        : 'border-border bg-card text-brand-navy hover:border-primary/40 hover:bg-primary/5',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-xs text-destructive mt-2">{errors.time}</p>}
            </div>
          )}

          {/* Guests */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Users size={15} className="text-primary shrink-0" />
              <h4 className="text-sm font-medium text-brand-navy">Aantal gasten</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {GUEST_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => update('guests', g)}
                  className={cn(
                    'w-12 h-10 rounded-xl border text-sm font-medium transition-all',
                    data.guests === g
                      ? 'bg-brand-navy border-brand-navy text-white'
                      : 'border-border bg-card text-brand-navy hover:border-primary/40 hover:bg-primary/5',
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Details ─��─────────────────────────────────── */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="heading-typewriter text-lg sm:text-xl text-brand-navy mb-1">Uw gegevens</h3>
            <p className="text-sm text-muted-foreground">
              Reservering voor <strong className="text-primary">{formatDateNL(data.date)} om {data.time}</strong> ({data.guests} {data.guests === '1' ? 'gast' : 'gasten'}).
            </p>
          </div>

          <Field id={`${uid}-name`} label="Naam" required icon={User} error={errors.name}>
            <input
              id={`${uid}-name`}
              type="text"
              autoComplete="name"
              placeholder="Jan de Vries"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              className={cn(inputCls, errors.name && 'border-destructive focus:ring-destructive/30')}
            />
          </Field>

          <Field id={`${uid}-email`} label="E-mailadres" required icon={Mail} error={errors.email}>
            <input
              id={`${uid}-email`}
              type="email"
              autoComplete="email"
              placeholder="jan@voorbeeld.nl"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              className={cn(inputCls, errors.email && 'border-destructive focus:ring-destructive/30')}
            />
          </Field>

          <Field id={`${uid}-phone`} label="Telefoonnummer" icon={Phone} error={errors.phone}>
            <input
              id={`${uid}-phone`}
              type="tel"
              autoComplete="tel"
              placeholder="+31 6 12345678 (optioneel)"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field id={`${uid}-notes`} label="Bijzonderheden" icon={MessageSquare} error={errors.notes}>
            <textarea
              id={`${uid}-notes`}
              rows={3}
              placeholder="Allergieën, speciale gelegenheid, kinderstoel nodig… (optioneel)"
              value={data.notes}
              onChange={(e) => update('notes', e.target.value)}
              className={cn(inputCls, 'resize-none')}
            />
          </Field>
        </div>
      )}

      {/* ── Step 3: Confirm ───────────────────────────────────── */}
      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="heading-typewriter text-lg sm:text-xl text-brand-navy mb-1">Controleer uw aanvraag</h3>
            <p className="text-sm text-muted-foreground">Klopt alles? Bevestig dan uw reserveringsaanvraag.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header row */}
            <div className="bg-primary/8 border-b border-border px-5 py-3 flex items-center gap-2">
              <Calendar size={15} className="text-primary" />
              <span className="text-sm font-semibold text-brand-navy">
                {formatDateNL(data.date)} · {data.time} · {data.guests} {data.guests === '1' ? 'gast' : 'gasten'}
              </span>
            </div>

            {/* Detail rows */}
            <div className="px-5 py-4 flex flex-col gap-3">
              {[
                { label: 'Naam', value: data.name },
                { label: 'E-mail', value: data.email },
                ...(data.phone ? [{ label: 'Telefoon', value: data.phone }] : []),
                ...(data.notes ? [{ label: 'Bijzonderheden', value: data.notes }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3 text-sm min-w-0">
                  <span className="text-muted-foreground w-24 sm:w-28 shrink-0">{label}</span>
                  <span className="text-brand-navy font-medium break-all min-w-0">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Na bevestiging ontvangt u een e-mail op <strong className="text-brand-navy">{data.email}</strong>.
            Er is geen betaling vereist — uw tafel wordt voor u gereserveerd.
          </p>
        </div>
      )}

      {/* ── Navigation buttons ────────────────────────────────── */}
      <div className={cn(
        'flex gap-3 mt-8',
        step === 1 ? 'justify-end' : 'justify-between',
      )}>
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-brand-navy text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <ChevronLeft size={15} /> Vorige
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-brand-blue-dark transition-colors shadow-sm"
          >
            Volgende <ChevronRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            onClick={confirm}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-navy text-white text-sm font-semibold hover:bg-primary transition-colors shadow-md"
          >
            <Check size={15} /> Bevestig reservering
          </button>
        )}
      </div>
    </div>
  )
}
