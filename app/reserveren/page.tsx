import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { BookingWizard } from '@/components/booking-wizard'
import { blockJson, blockValue } from '@/lib/cms/blocks'
import { resolveIcon } from '@/lib/cms/icons'
import { loadSiteSettings } from '@/lib/cms/settings'
import { getContentPage } from '@/lib/db/repository'
import { IconToolsKitchen2 } from '@/lib/site/icons'

export const metadata: Metadata = {
  title: 'Reserveren – FoodJutters',
  description:
    'Reserveer uw tafel bij FoodJutters. Kies uw datum, tijdslot en geef uw gegevens op.',
}

type InfoItem = { icon: string; title: string; body: string }

export default async function ReserverenPage() {
  const [page, settings] = await Promise.all([getContentPage('reserveren'), loadSiteSettings()])
  const hero = page?.hero
  const infoItems = blockJson<InfoItem[]>(page, 'info_items', [
    { icon: 'Calendar', title: 'Openingsdagen', body: 'Woensdag t/m zondag' },
    { icon: 'Clock', title: 'Openingstijden', body: '12:00 – 22:00' },
    { icon: 'Utensils', title: 'Groepen', body: 'Grotere gezelschappen? Neem contact op.' },
  ])

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? 'Tafel boeken'}
        title={hero?.title ?? 'Reserveren'}
        subtitle={
          hero?.subtitle ??
          'Kies uw gewenste datum en tijdslot, vul uw gegevens in en bevestig — klaar in drie stappen.'
        }
        meta={
          hero?.meta?.length
            ? hero.meta
            : [
                { label: 'Geopend', value: settings.hoursDisplay },
                { label: 'Locatie', value: settings.addressShort },
              ]
        }
      />

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 sm:gap-10 lg:gap-14 items-start">
            <div className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-8 md:p-10">
              <BookingWizard mode="full" />
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
              {infoItems.map(({ icon, title, body }) => {
                const Icon = resolveIcon(icon, IconToolsKitchen2)
                return (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-wide text-brand-navy mb-1">
                        {title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                    </div>
                  </div>
                )
              })}

              <div className="rounded-2xl bg-wood-3 p-6 border border-primary/15">
                <p className="font-display text-xs uppercase tracking-widest text-brand-navy/60 mb-2">
                  {blockValue(page, 'payment_note_title', 'Geen betaling vereist')}
                </p>
                <p className="text-sm text-brand-navy/80 leading-relaxed">
                  {blockValue(
                    page,
                    'payment_note_body',
                    'Uw tafel wordt gereserveerd zonder betaalstap.',
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-background px-5 py-4 text-sm text-muted-foreground leading-relaxed">
                Liever telefonisch? Bel ons op{' '}
                <a href={`tel:${settings.phoneTel}`} className="text-primary font-medium hover:underline">
                  {settings.phone}
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
