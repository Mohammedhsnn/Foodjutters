import Link from 'next/link'
import { IconArrowRight, IconWaveSine, tablerProps } from '@/lib/site/icons'
import { BrandSurface } from '@/components/brand-surface'
import { BrandWordmark } from '@/components/brand-wordmark'
import { Logo } from '@/components/logo'
import { PlankShowcase } from '@/components/plank-showcase'
import { WelcomeSection } from '@/components/home/welcome-section'
import { WhyHighlightsSection } from '@/components/home/why-highlights-section'
import { HeroAmbience } from '@/components/hero-ambience'
import { SmullenTicker } from '@/components/smullen-ticker'
import { blockJson, blockValue } from '@/lib/cms/blocks'
import { resolveIcon } from '@/lib/cms/icons'
import type { ContentPage } from '@/lib/admin/types'
import type { SiteSettingsProps } from '@/components/site-chrome'
type Highlight = { icon: string; title: string; description: string }
type Feature = { icon: string; title: string; text: string }

export function HomePage({
  page,
  settings,
}: {
  page: ContentPage | null
  settings: SiteSettingsProps
}) {
  const highlights = blockJson<Highlight[]>(page, 'highlights', [])
  const features = blockJson<Feature[]>(page, 'features', [])

  return (
    <>
      <section className="hero-wood relative flex flex-col overflow-hidden max-sm:h-[100dvh] max-sm:max-h-[100dvh] sm:min-h-[100svh]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-white/40 pointer-events-none z-[1]" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none z-[2] max-sm:opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 38%, rgb(255 255 255 / 0.55) 0%, transparent 72%)',
          }}
          aria-hidden
        />
        <HeroAmbience />

        <div className="relative z-10 flex flex-1 min-h-0 flex-col max-sm:justify-between sm:justify-center px-5 sm:px-8 pt-[3.75rem] sm:pt-32 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-10">
          <div className="flex flex-1 min-h-0 flex-col items-center justify-center text-center w-full max-w-xl mx-auto">
            <h1 className="sr-only">
              FoodJutters — {blockValue(page, 'tagline', 'smullen, borrelen & genieten aan het water')}
            </h1>
            <Logo
              layout="stack"
              size="hero"
              className="mb-6 sm:mb-9 drop-shadow-[0_8px_24px_rgba(15,45,74,0.12)] [&_img]:max-sm:h-[6.75rem] [&_span]:max-sm:text-[3rem]"
            />
            <p className="font-serif text-base sm:text-lg md:text-xl text-brand-navy/90 tracking-[0.02em] leading-relaxed mb-8 sm:mb-10 text-pretty max-w-[22ch] sm:max-w-none mx-auto">
              {blockValue(page, 'tagline', 'Smullen, borrelen & genieten aan het water')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[300px] sm:max-w-none mx-auto">
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-display uppercase tracking-[0.1em] text-sm px-8 py-3.5 sm:py-4 rounded-full shadow-xl shadow-brand-navy/20 hover:bg-primary hover:shadow-primary/25 transition-all duration-200"
              >
                Bekijk ons menu
                <IconArrowRight {...tablerProps(16)} />
              </Link>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center gap-2 bg-white/85 backdrop-blur-sm text-brand-navy font-display uppercase tracking-wide text-sm px-8 py-4 rounded-full border border-brand-navy/15 shadow-md hover:bg-white hover:border-brand-navy/35 transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="w-full shrink-0 max-sm:mt-4 sm:mt-0 sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:pb-9 sm:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="sm:hidden grid grid-cols-2 gap-px rounded-xl bg-brand-navy/8 p-px shadow-sm max-w-sm mx-auto">
                <div className="rounded-l-[11px] bg-white/75 backdrop-blur-md px-3 py-2.5 text-center">
                  <p className="font-serif text-[8px] tracking-[0.18em] uppercase text-brand-navy/45 mb-0.5">Geopend</p>
                  <p className="font-serif text-[11px] text-brand-navy font-medium leading-snug">{settings.hoursDisplay}</p>
                </div>
                <div className="rounded-r-[11px] bg-white/75 backdrop-blur-md px-3 py-2.5 text-center">
                  <p className="font-serif text-[8px] tracking-[0.18em] uppercase text-brand-navy/45 mb-0.5">Locatie</p>
                  <p className="font-serif text-[11px] text-brand-navy font-medium leading-snug">
                    {blockValue(page, 'location_short', settings.addressShort)}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-[10px] tracking-[0.22em] uppercase text-brand-navy/55">Geopend</p>
                  <p className="font-serif text-xs text-brand-navy/80 font-medium">{settings.hoursDisplay}</p>
                </div>
                <div className="flex flex-col items-end gap-1 max-w-[200px]">
                  <p className="font-serif text-[10px] tracking-[0.22em] uppercase text-brand-navy/55">Locatie</p>
                  <p className="font-serif text-xs text-brand-navy/80 font-medium text-right">
                    {blockValue(page, 'location_short', settings.addressShort)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SmullenTicker />

      <section className="bg-background py-6 sm:py-8 md:py-10 px-4 sm:px-6 text-brand-navy border-b border-border/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-1 h-10 bg-primary rounded-full shrink-0" aria-hidden />
            <div>
              <p className="label-vintage text-brand-navy/55 text-[11px] tracking-[0.2em] uppercase mb-0.5">
                {blockValue(page, 'banner_eyebrow', 'Woensdag t/m zondag')}
              </p>
              <h2 className="section-heading-typewriter">
                {blockValue(page, 'banner_title', 'Kom gezellig tafelen')}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 md:gap-8 pl-5 sm:pl-0">
            <div className="text-center">
              <p className="heading-display text-3xl sm:text-4xl md:text-5xl text-primary leading-none">12–22</p>
              <p className="label-vintage text-brand-navy/45 text-[10px] tracking-[0.18em] mt-1">Openingstijden</p>
            </div>
          </div>
        </div>
      </section>

      <WelcomeSection
        storyEyebrow={blockValue(page, 'welcome_story_eyebrow', 'Ons verhaal')}
        storyTitle={blockValue(page, 'welcome_story_title', 'Een droom aan het water')}
        storyText={blockValue(
          page,
          'welcome_story_text',
          'FoodJutters ontstond uit een eenvoudige droom: een plek aan het water waar mensen kunnen genieten van eerlijk, lekker eten in een ontspannen sfeer.\n\nWat begon als een bescheiden terrasrestaurant groeide uit tot een geliefde plek aan de Schelde — met houten terras, houtoven en een warme, gastvrije sfeer.',
        )}
        storyImage={blockValue(
          page,
          'welcome_story_image',
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0091.JPG-AMp6yqfKtGnflTqhpghBFBhZIZu1SY.jpeg',
        )}
        storyImageAlt={blockValue(
          page,
          'welcome_story_image_alt',
          'Terras van FoodJutters aan het water bij zonsondergang',
        )}
      >
        <p className="label-vintage text-primary mb-3 text-[11px] tracking-[0.25em] uppercase">
          {blockValue(page, 'welcome_eyebrow', 'Welkom bij')}
        </p>
        <BrandWordmark size="lg" className="mb-4 sm:mb-5" />
        <p className="text-foreground/70 text-sm sm:text-base md:text-lg leading-relaxed text-pretty mb-6 sm:mb-8 max-w-md">
          {blockValue(page, 'welcome_text', blockValue(page, 'intro', ''))}
        </p>
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {features.map((item) => {
            const Icon = resolveIcon(item.icon, IconWaveSine)
            return (
              <div
                key={item.title}
                className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-border/70 bg-card/80 px-4 sm:px-5 py-3 sm:py-3.5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-md"
              >
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light transition-colors group-hover:bg-primary">
                  <Icon size={16} className="text-primary transition-colors group-hover:text-white" />
                </div>
                <div>
                  <p className="font-display text-xs sm:text-sm text-brand-navy uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6 sm:mt-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
          >
            Bekijk het menu <IconArrowRight {...tablerProps(16)} />
          </Link>
          <Link
            href="/over-ons"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            Ontdek ons verhaal <IconArrowRight {...tablerProps(16)} />
          </Link>
        </div>
      </WelcomeSection>

      <WhyHighlightsSection highlights={highlights} />

      <PlankShowcase />

      <BrandSurface variant="sky" pattern="SMULLEN" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-brand-navy">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-heading-xl mb-4 sm:mb-5">
            {blockValue(page, 'cta_banner_title', 'Open!')}
          </h2>
          <p className="text-brand-navy/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
            {blockValue(page, 'cta_banner_text', settings.hoursDisplay)}
          </p>
          <Link href="/contact#groepsreservering" className="btn-brand bg-brand-navy text-white hover:bg-primary shadow-lg shadow-brand-navy/20">
            Groepsreservering aanvragen <IconArrowRight {...tablerProps(16)} />
          </Link>
        </div>
      </BrandSurface>
    </>
  )
}
