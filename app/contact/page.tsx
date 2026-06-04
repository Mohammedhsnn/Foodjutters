'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

const openingHours = [
  { day: 'Maandag', hours: 'Gesloten' },
  { day: 'Dinsdag', hours: 'Gesloten' },
  { day: 'Woensdag', hours: '12:00 – 22:00' },
  { day: 'Donderdag', hours: '12:00 – 22:00' },
  { day: 'Vrijdag', hours: '12:00 – 22:00' },
  { day: 'Zaterdag', hours: '12:00 – 22:00' },
  { day: 'Zondag', hours: '12:00 – 21:00' },
]

const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']

const inputClass =
  'w-full border border-input rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const todayName = dayNames[new Date().getDay()]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Kom langs"
        title="Contact & Reservering"
        subtitle="Reserveer uw tafel, stel een vraag of plan een groepsarrangement. Wij helpen u graag verder."
        pattern="WELKOM"
        meta={[
          { label: 'Adres', value: 'Parallelweg 1, Lelystad' },
          { label: 'Geopend', value: 'Wo – Zo · 12–22' },
          { label: 'Telefoon', value: '+31 (0)320 00 00 00' },
        ]}
        ctas={[
          { href: '#reserveer', label: 'Reserveer een tafel' },
          { href: 'tel:+31320000000', label: 'Bel ons direct', variant: 'secondary' },
        ]}
      />

      {/* Main content */}
      <section id="reserveer" className="py-12 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">

          {/* Left column: info + hours + map */}
          <aside className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact info */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="heading-display text-xl text-brand-dark mb-5">Contactgegevens</h2>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark mb-0.5 uppercase tracking-wide">Adres</p>
                    <p className="text-sm text-muted-foreground">Parallelweg 1<br />8218 NA Lelystad</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark mb-0.5 uppercase tracking-wide">Telefoon</p>
                    <a href="tel:+31320000000" className="text-sm text-primary hover:underline">
                      +31 (0)320 00 00 00
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark mb-0.5 uppercase tracking-wide">E-mail</p>
                    <a href="mailto:info@foodjutters.nl" className="text-sm text-primary hover:underline">
                      info@foodjutters.nl
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Opening hours */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                  <Clock size={15} className="text-primary" />
                </div>
                <h2 className="heading-display text-xl text-brand-dark">Openingstijden</h2>
              </div>
              <ul className="flex flex-col divide-y divide-border/50">
                {openingHours.map((row) => {
                  const isToday = row.day === todayName
                  const isClosed = row.hours === 'Gesloten'
                  return (
                    <li
                      key={row.day}
                      className={`flex justify-between items-center py-2 text-sm ${
                        isToday ? 'font-semibold' : ''
                      }`}
                    >
                      <span className={isToday ? 'text-primary' : 'text-foreground/70'}>{row.day}</span>
                      <span className={
                        isClosed ? 'text-muted-foreground' :
                        isToday ? 'text-primary' : 'text-foreground/70'
                      }>
                        {row.hours}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Map link */}
            <div className="rounded-xl overflow-hidden border border-border shadow-sm h-40 bg-wood-3 flex flex-col items-center justify-center gap-2">
              <MapPin size={28} className="text-primary" />
              <p className="text-sm text-foreground/60 font-medium">Parallelweg 1, Lelystad</p>
              <a
                href="https://maps.google.com/?q=Parallelweg+1+Lelystad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs font-semibold hover:underline"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </aside>

          {/* Reservation form */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-xl p-7 shadow-sm h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-16 gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <Check size={24} className="text-white" />
                  </div>
                  <h2 className="heading-display text-2xl text-brand-dark">Bedankt!</h2>
                  <p className="text-foreground/60 leading-relaxed max-w-xs text-sm">
                    Uw reserveringsaanvraag is ontvangen. We nemen zo snel mogelijk contact met u op.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' })
                    }}
                    className="text-sm text-primary font-semibold hover:underline mt-2"
                  >
                    Nieuwe aanvraag indienen
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="heading-display text-xl text-brand-dark mb-1">Tafel reserveren</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Vul het formulier in en wij bevestigen uw reservering zo spoedig mogelijk.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Naam <span className="text-primary">*</span>
                        </label>
                        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                          placeholder="Voor- en achternaam" className={inputClass} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          E-mailadres <span className="text-primary">*</span>
                        </label>
                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                          placeholder="u@voorbeeld.nl" className={inputClass} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">Telefoonnummer</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                        placeholder="+31 6 00 00 00 00" className={inputClass} />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="date" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Datum <span className="text-primary">*</span>
                        </label>
                        <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} className={inputClass} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="time" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Tijdstip <span className="text-primary">*</span>
                        </label>
                        <select id="time" name="time" required value={form.time} onChange={handleChange} className={inputClass}>
                          <option value="">Kies tijd</option>
                          {['12:00','12:30','13:00','13:30','14:00','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="guests" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                          Gasten <span className="text-primary">*</span>
                        </label>
                        <select id="guests" name="guests" required value={form.guests} onChange={handleChange} className={inputClass}>
                          {Array.from({ length: 19 }, (_, i) => i + 2).map(n => (
                            <option key={n} value={n}>{n} personen</option>
                          ))}
                          <option value="20+">20+ personen</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-brand-dark uppercase tracking-wide">
                        Bijzonderheden
                      </label>
                      <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange}
                        placeholder="Allergieën, dieetwensen, speciale gelegenheid..."
                        className={`${inputClass} resize-none`} />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-brand-blue-dark text-white font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm mt-1"
                    >
                      <Send size={15} />
                      Reservering aanvragen
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      Wij nemen binnen 24 uur contact met u op ter bevestiging.
                    </p>
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
