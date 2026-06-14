import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight, tablerProps } from '@/lib/site/icons'
import { PageHero } from '@/components/page-hero'
import { blockValue } from '@/lib/cms/blocks'
import { getContentPage, getMenuSections } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Menu – FoodJutters',
  description:
    "Ontdek het menu van FoodJutters. Verse gerechten, pizza's uit de houtoven en seizoensgebonden specialiteiten.",
}

export default async function MenuPage() {
  const [page, menuSections] = await Promise.all([
    getContentPage('menu'),
    getMenuSections(),
  ])

  const hero = page?.hero
  const availableSections = menuSections
    .map((section) => ({
      ...section,
      items: section.items.filter((i) => i.available),
    }))
    .filter((s) => s.items.length > 0)

  const categoryCount = availableSections.length
  const itemCount = availableSections.reduce((n, s) => n + s.items.length, 0)

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? 'Onze keuken'}
        title={hero?.title ?? 'Menu'}
        subtitle={
          hero?.subtitle ??
          'Vers, seizoensgebonden en met liefde bereid. Van pizza uit de houtoven tot gegrilde specialiteiten.'
        }
        pattern="SMULLEN"
        meta={
          hero?.meta?.length
            ? hero.meta
            : [
                { label: 'Categorieën', value: `${categoryCount} categorieën` },
                { label: 'Gerechten', value: `${itemCount} items` },
                { label: 'Geopend', value: 'Wo – Zo 12–22' },
              ]
        }
        ctas={[
          { href: '#menu-inhoud', label: 'Bekijk het menu' },
          { href: '/contact', label: 'Contact', variant: 'secondary' },
        ]}
      />

      <div id="menu-inhoud" className="px-4 sm:px-6 pt-6 sm:pt-8 pb-2 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start sm:items-center gap-3 bg-brand-blue-light/50 border border-primary/15 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-sm text-foreground/65">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1 sm:mt-0" aria-hidden />
            <span>
              <strong className="text-brand-dark font-semibold">Allergenen:</strong>{' '}
              {blockValue(
                page,
                'allergen_note',
                'Informeer uw bediening bij allergieën of dieetwensen. Alle prijzen zijn inclusief BTW.',
              )}
            </span>
          </div>
        </div>
      </div>

      <section className="py-6 sm:py-8 px-4 sm:px-6 pb-12 sm:pb-14 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 sm:gap-14">
          {availableSections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
                <div className="flex-1 h-px bg-border/60" />
                <div className="text-center px-2 sm:px-3 shrink-0 max-w-[60%]">
                  <h2 className="section-heading-menu text-brand-dark">
                    {section.title}
                  </h2>
                  <p className="label-vintage text-muted-foreground text-[10px] tracking-[0.2em] mt-1">
                    {section.subtitle}
                  </p>
                </div>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div className="grid sm:grid-cols-2 gap-2 sm:gap-2.5">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-start justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-card border border-border/70 hover:border-primary/25 hover:shadow-sm transition-all duration-150"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-dark text-sm group-hover:text-primary transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-primary font-bold text-sm whitespace-nowrap shrink-0 tabular-nums">
                      &euro;&nbsp;{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-wood-3 border-t border-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-primary/30" />
            <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase">
              Groepsreservering
            </p>
            <div className="h-px w-8 bg-primary/30" />
          </div>
          <h2 className="section-heading-lg text-brand-dark mb-4">
            {blockValue(page, 'cta_title', 'Zin gekregen?')}
          </h2>
          <p className="text-foreground/60 text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
            {blockValue(
              page,
              'cta_text',
              'Kom langs wanneer het u uitkomt. Voor organisaties of groepen vanaf 10 personen kunt u een reservering aanvragen.',
            )}
          </p>
          <Link
            href="/contact#groepsreservering"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
          >
            Groepsreservering aanvragen <IconArrowRight {...tablerProps(16)} />
          </Link>
        </div>
      </section>
    </>
  )
}
