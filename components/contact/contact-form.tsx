'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import type { ContentPage } from '@/lib/admin/types'
import type { SiteSettingsProps } from '@/components/site-chrome'
import { blockValue } from '@/lib/cms/blocks'

const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']

const inputClass =
  'w-full border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

export function ContactForm({
  page,
  settings,
}: {
  page: ContentPage | null
  settings: SiteSettingsProps
}) {
  const hero = page?.hero
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const todayName = dayNames[new Date().getDay()]

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: form.guests,
          notes: form.message,
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setError(data.error ?? 'Verzenden mislukt')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Verbinding mislukt. Probeer het later opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? 'Kom langs'}
        title={hero?.title ?? 'Contact & Reservering'}
        subtitle={
          hero?.subtitle ??
          'Reserveer uw tafel, stel een vraag of plan een groepsarrangement. Wij helpen u graag verder.'
        }
        pattern="WELKOM"
        meta={
          hero?.meta?.length
            ? hero.meta
            : [
                { label: 'Adres', value: settings.addressShort },
                { label: 'Geopend', value: settings.hoursDisplay },
                { label: 'Telefoon', value: settings.phone },
              ]
        }
        ctas={[
          { href: '#reserveer', label: 'Reserveer een tafel' },
          { href: `tel:${settings.phoneTel}`, label: 'Bel ons direct', variant: 'secondary' },
        ]}
      />

      <section id="reserveer" className="py-10 sm:py-12 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          <aside className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
            <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="heading-display text-lg sm:text-xl text-brand-dark mb-4 sm:mb-5">
                Contactgegevens
              </h2>
              <ul className="flex flex-col gap-3.5 sm:gap-4">
                <li className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-primary sm:size-[15px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark mb-0.5 uppercase tracking-wide">Adres</p>
                    <p className="text-sm text-muted-foreground">
                      {settings.addressLine1}
                      <br />
                      {settings.addressLine2}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-primary sm:size-[15px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark mb-0.5 uppercase tracking-wide">Telefoon</p>
                    <a href={`tel:${settings.phoneTel}`} className="text-sm text-primary hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-primary sm:size-[15px]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark mb-0.5 uppercase tracking-wide">E-mail</p>
                    <a href={`mailto:${settings.email}`} className="text-sm text-primary hover:underline break-all">
                      {settings.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-primary sm:size-[15px]" />
                </div>
                <h2 className="heading-display text-lg sm:text-xl text-brand-dark">Openingstijden</h2>
              </div>
              <ul className="flex flex-col divide-y divide-border/50">
                {settings.openingHours.map((row) => {
                  const isToday = row.day === todayName
                  const isClosed = row.hours === 'Gesloten'
                  return (
                    <li
                      key={row.day}
                      className={`flex justify-between items-center py-2 text-sm ${isToday ? 'font-semibold' : ''}`}
                    >
                      <span className={isToday ? 'text-primary' : 'text-foreground/70'}>{row.day}</span>
                      <span
                        className={
                          isClosed ? 'text-muted-foreground' : isToday ? 'text-primary' : 'text-foreground/70'
                        }
                      >
                        {row.hours}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="rounded-xl overflow-hidden border border-border shadow-sm h-32 sm:h-40 bg-wood-3 flex flex-col items-center justify-center gap-2">
              <MapPin size={24} className="text-primary sm:size-7" />
              <p className="text-sm text-foreground/60 font-medium text-center px-4">{settings.addressShort}</p>
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs font-semibold hover:underline"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-5 sm:p-7 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center">
                    <Check size={22} className="text-white sm:size-6" />
                  </div>
                  <h2 className="heading-display text-xl sm:text-2xl text-brand-dark">Bedankt!</h2>
                  <p className="text-foreground/60 leading-relaxed max-w-xs text-sm">
                    {blockValue(
                      page,
                      'form_success',
                      'Uw reserveringsaanvraag is ontvangen. We nemen zo snel mogelijk contact met u op.',
                    )}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="heading-display text-lg sm:text-xl text-brand-dark mb-1">
                    {blockValue(page, 'form_title', 'Tafel reserveren')}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-5 sm:mb-6">
                    {blockValue(
                      page,
                      'form_description',
                      'Vul het formulier in en wij bevestigen uw reservering zo spoedig mogelijk.',
                    )}
                  </p>
                  {error ? (
                    <p className="text-sm text-destructive mb-4" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Naam <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Voor- en achternaam"
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          E-mailadres <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="u@voorbeeld.nl"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                        Telefoonnummer
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+31 6 00 00 00 00"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="date" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Datum <span className="text-primary">*</span>
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          required
                          value={form.date}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="time" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Tijdstip <span className="text-primary">*</span>
                        </label>
                        <select
                          id="time"
                          name="time"
                          required
                          value={form.time}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Kies tijd</option>
                          {[
                            '12:00', '12:30', '13:00', '13:30', '14:00', '17:00', '17:30',
                            '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
                          ].map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="guests" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Gasten <span className="text-primary">*</span>
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          required
                          value={form.guests}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          {Array.from({ length: 19 }, (_, i) => i + 2).map((n) => (
                            <option key={n} value={String(n)}>
                              {n} personen
                            </option>
                          ))}
                          <option value="20+">20+ personen</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                        Bijzonderheden
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Allergieën, dieetwensen, speciale gelegenheid..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-brand-blue-dark text-white font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm mt-1 disabled:opacity-60"
                    >
                      <Send size={15} />
                      {loading ? 'Verzenden…' : 'Reservering aanvragen'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
