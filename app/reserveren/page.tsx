import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { BookingWizard } from '@/components/booking-wizard'
import { Calendar, Clock, Utensils } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reserveren – FoodJutters',
  description: 'Reserveer uw tafel bij FoodJutters. Kies uw datum, tijdslot en geef uw gegevens op. Wij zijn geopend van woensdag tot en met zondag, 12:00–22:00.',
}

const INFO_ITEMS = [
  {
    icon: Calendar,
    title: 'Openingsdagen',
    body: 'Woensdag t/m zondag',
  },
  {
    icon: Clock,
    title: 'Openingstijden',
    body: '12:00 – 22:00',
  },
  {
    icon: Utensils,
    title: 'Groepen',
    body: 'Grotere gezelschappen? Neem contact op via onze contactpagina.',
  },
]

export default function ReserverenPage() {
  return (
    <>
      <PageHero
        eyebrow="Tafel boeken"
        title="Reserveren"
        subtitle="Kies uw gewenste datum en tijdslot, vul uw gegevens in en bevestig — klaar in drie stappen."
        meta={[
          { label: 'Geopend', value: 'Wo – Zo' },
          { label: 'Tijden', value: '12:00 – 22:00' },
          { label: 'Locatie', value: 'Parallelweg 1, Lelystad' },
        ]}
      />

      {/* Main content */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 sm:gap-10 lg:gap-14 items-start">

            {/* Wizard card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-8 md:p-10">
              <BookingWizard mode="full" />
            </div>

            {/* Info sidebar */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
              {/* Opening info cards */}
              {INFO_ITEMS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xs uppercase tracking-wide text-brand-navy mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}

              {/* Wood texture accent block */}
              <div className="rounded-2xl bg-wood-3 p-6 border border-primary/15">
                <p className="font-display text-xs uppercase tracking-widest text-brand-navy/60 mb-2">Geen betaling vereist</p>
                <p className="text-sm text-brand-navy/80 leading-relaxed">
                  Uw tafel wordt gereserveerd zonder betaalstap. Na bevestiging ontvangt u een e-mail met de details.
                </p>
              </div>

              {/* Contact fallback */}
              <div className="rounded-xl border border-border/60 bg-background px-5 py-4 text-sm text-muted-foreground leading-relaxed">
                Liever telefonisch? Bel ons op{' '}
                <a href="tel:+31320000000" className="text-primary font-medium hover:underline">
                  +31 (0)320 00 00 00
                </a>
                .
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
