import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BrandName } from '@/components/brand-name'
import { IconArrowRight, IconHeart, IconPhoto, tablerProps } from '@/lib/site/icons'
import { PageHero } from '@/components/page-hero'
import { blockJson, blockValue, usableCmsImageUrl } from '@/lib/cms/blocks'
import { loadSiteSettings } from '@/lib/cms/settings'
import { resolveHeroMeta } from '@/lib/site/hours'
import { resolveIcon } from '@/lib/cms/icons'
import { DirectionsSection } from '@/components/over-ons/directions-section'
import { getContentPage } from '@/lib/db/repository'
import {
  OVER_ONS_STORY_IMAGE,
  OVER_ONS_STORY_IMAGE_ALT,
  resolveStoryImage,
} from '@/lib/site/images'
import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Over ons',
  description:
    'Ontdek het verhaal van FoodJutters aan de Schelde in Terneuzen. Heropend in 2026 door Rolinda en Jimmy, met het vertrouwde terras en pizza uit de houtoven.',
  path: '/over-ons',
})

type ValueItem = { icon: string; title: string; description: string }

const DEFAULT_STORY_P1 =
  'FoodJutters ontstond als een droom aan het water: een plek waar mensen samenkomen om te genieten van eerlijk, lekker eten met uitzicht op de Schelde. In de loop der jaren groeide het uit tot een van de meest geliefde eetgelegenheden in de regio.'
const DEFAULT_STORY_P2 =
  'Op 31 mei 2024 sloot het restaurant definitief zijn deuren. Maar het verhaal eindigde daar niet: door nieuwe eigenaren is FoodJutters sinds 2026 weer open. Rolinda en Jimmy hebben de plek opgepakt met frisse energie en grote passie voor gastvrijheid.'
const DEFAULT_STORY_P3 =
  'Het vertrouwde terras, pizza uit de houtoven en de sfeervolle binnenruimte zijn terug, klaar om u opnieuw te verwelkomen. Wij geloven dat goed eten mensen samenbrengt, en elk bezoek moet voelen als thuiskomen.'

const DEFAULT_TEAM_IMAGE = '/images/team-foodjutters.png'

const FALLBACK_VALUES: ValueItem[] = [
  { icon: 'Heart', title: 'Gastvrijheid', description: 'Warme ontvangst. Iedereen voelt zich welkom.' },
  { icon: 'Leaf', title: 'Vers & lokaal', description: 'Seizoensproducten van leveranciers uit de regio.' },
  { icon: 'Star', title: 'Beleving', description: 'Uitzicht, sfeer en een warm thuisgevoel aan het water.' },
]

export default async function OverOnsPage() {
  const [page, settings] = await Promise.all([getContentPage('over-ons'), loadSiteSettings()])
  const hero = page?.hero
  const values = blockJson<ValueItem[]>(page, 'values', FALLBACK_VALUES)
  const storyImage = resolveStoryImage(blockValue(page, 'story_image', ''), OVER_ONS_STORY_IMAGE)
  const storyImageAlt = blockValue(page, 'story_image_alt', OVER_ONS_STORY_IMAGE_ALT)
  const teamImage =
    usableCmsImageUrl(blockValue(page, 'team_image', DEFAULT_TEAM_IMAGE)) || DEFAULT_TEAM_IMAGE
  const teamImageAlt = blockValue(page, 'team_image_alt', 'Rolinda en Jimmy, de nieuwe eigenaren van FoodJutters')
  const heroCtas = settings.menuPageVisible
    ? [
        { href: '/menu', label: 'Bekijk ons menu' },
        { href: '/contact', label: 'Contact', variant: 'secondary' as const },
      ]
    : [{ href: '/contact', label: 'Contact' }]

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? 'Ons verhaal'}
        title={hero?.title ?? 'Over ons'}
        subtitle={
          hero?.subtitle ??
          'Een geliefde plek aan de Schelde, na een periode van sluiting weer open door nieuwe eigenaren.'
        }
        meta={resolveHeroMeta(hero?.meta, settings.hoursDisplay, {
          phone: settings.phone,
          addressShort: settings.addressShort,
        })}
        ctas={heroCtas}
      />

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="w-full max-w-md mx-auto md:mx-0">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-2xl overflow-hidden border border-border/80 bg-brand-blue-light/30 shadow-md shadow-brand-navy/5">
              {storyImage ? (
                <Image
                  src={storyImage}
                  alt={storyImageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-wood-3/50 text-brand-navy/45 p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-brand-navy/10">
                    <IconPhoto {...tablerProps(28)} className="text-primary/70" />
                  </div>
                  <p className="font-serif text-xs tracking-[0.18em] uppercase">Afbeelding volgt</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="h-px w-8 bg-primary/40" />
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase">Een nieuw hoofdstuk</p>
            </div>
            <h2 className="section-heading-lg text-brand-dark mb-4 sm:mb-6">
              {blockValue(page, 'story_title', 'Terug aan het water')}
            </h2>
            <p className="text-foreground/65 leading-relaxed mb-4 text-sm">{blockValue(page, 'story_p1', DEFAULT_STORY_P1)}</p>
            <p className="text-foreground/65 leading-relaxed mb-4 text-sm">{blockValue(page, 'story_p2', DEFAULT_STORY_P2)}</p>
            <p className="text-foreground/65 leading-relaxed mb-6 sm:mb-8 text-sm">{blockValue(page, 'story_p3', DEFAULT_STORY_P3)}</p>
            {settings.menuPageVisible ? (
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
              >
                Ontdek ons menu <IconArrowRight {...tablerProps(16)} />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 px-4 sm:px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-7">
            <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">
              Waar wij voor staan
            </p>
            <h2 className="section-heading text-brand-dark">Onze waarden</h2>
          </div>

          <ul className="grid sm:grid-cols-3 gap-2.5 sm:gap-3">
            {values.map((v) => {
              const Icon = resolveIcon(v.icon, IconHeart)
              return (
                <li
                  key={v.title}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/90 px-4 py-4 sm:py-4.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xs sm:text-sm uppercase tracking-wide text-brand-navy leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-muted-foreground leading-snug mt-1">
                      {v.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-wood-plank">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-border" />
            <div className="text-center shrink-0 px-1">
              <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">Ons team</p>
              <h2 className="section-heading text-brand-dark text-balance">
                De mensen achter <BrandName className="text-inherit tracking-normal" />
              </h2>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="relative w-full max-w-4xl mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 shadow-lg shadow-brand-navy/10">
            <Image
              src={teamImage}
              alt={teamImageAlt}
              fill
              unoptimized
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>
      </section>

      <DirectionsSection settings={settings} />
    </>
  )
}
