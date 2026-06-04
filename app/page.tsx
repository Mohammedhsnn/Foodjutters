import Link from 'next/link'
import {
  ArrowRight,
  Utensils,
  Sunset,
  Flame,
  Users,
  Waves,
  Sparkles,
  Star,
  Infinity,
} from 'lucide-react'
import { BrandName } from '@/components/brand-name'
import { BrandSurface } from '@/components/brand-surface'
import { BrandWordmark } from '@/components/brand-wordmark'
import { Logo } from '@/components/logo'
import { PlankShowcase } from '@/components/plank-showcase'
import { HeroAmbience } from '@/components/hero-ambience'
import { SmullenTicker } from '@/components/smullen-ticker'

const highlights = [
  {
    icon: Sunset,
    title: 'Uitzicht over het water',
    description: 'Panorama op terras of binnen.',
  },
  {
    icon: Utensils,
    title: 'Verse gerechten',
    description: 'Seizoensmenu & houtoven-pizza.',
  },
  {
    icon: Flame,
    title: 'Knus & sfeervol',
    description: 'Houtkachel en sfeervol licht.',
  },
  {
    icon: Users,
    title: 'Ruimte voor iedereen',
    description: 'Van duo tot groepsreservering.',
  },
] as const

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero-wood relative min-h-[100svh] flex flex-col justify-between overflow-hidden">
        {/* Stronger overlay: softens the wood grain so content pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/20 to-white/50 pointer-events-none z-[1]" aria-hidden />
        {/* Radial vignette behind centre content */}
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 46%, rgb(244 250 253 / 0.7) 0%, transparent 100%)' }} aria-hidden />
        <HeroAmbience />

        {/* Main content — sits slightly above true centre */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-5 sm:px-8 pt-28 sm:pt-32 pb-10">
          <div className="text-center w-full max-w-xl mx-auto">
            <h1 className="sr-only">FoodJutters — smullen, borrelen & genieten aan het water</h1>

            {/* Logo mark + wordmark — stacked */}
            <Logo layout="stack" size="hero" className="mb-7 sm:mb-9 drop-shadow-sm" />

            {/* Tagline — larger, more prominent */}
            <p className="font-serif text-base sm:text-lg md:text-xl text-brand-navy/85 tracking-[0.04em] leading-relaxed mb-8 sm:mb-10 text-pretty max-w-xs sm:max-w-none mx-auto">
              Smullen, borrelen &amp; genieten aan het water
            </p>

            {/* CTAs — clear primary/secondary hierarchy */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/reserveren"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-display uppercase tracking-wide text-sm px-8 py-4 rounded-full shadow-xl shadow-brand-navy/30 hover:bg-primary hover:shadow-primary/30 transition-all duration-200"
              >
                Reserveer een tafel
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-brand-navy font-display uppercase tracking-wide text-sm px-8 py-4 rounded-full border border-brand-navy/20 shadow-md hover:bg-white hover:border-brand-navy/40 transition-all duration-200"
              >
                Bekijk ons menu
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom meta bar — readable labels with proper contrast */}
        <div className="relative z-10 w-full pb-7 sm:pb-9 px-5 sm:px-10">
          <div className="max-w-6xl mx-auto flex items-end justify-between">
            {/* Left: opening hours */}
            <div className="hidden sm:flex flex-col gap-1">
              <p className="font-serif text-[10px] tracking-[0.22em] uppercase text-brand-navy/55">Geopend</p>
              <p className="font-serif text-xs text-brand-navy/80 font-medium">Wo – Zo · 12:00 – 22:00</p>
            </div>

            {/* Centre: scroll indicator */}
            <div className="mx-auto sm:mx-0 flex flex-col items-center gap-2">
              <div className="w-px h-8 bg-gradient-to-b from-brand-navy/35 to-transparent" />
              <span className="font-serif text-[9px] tracking-[0.35em] uppercase text-brand-navy/50">Scroll</span>
            </div>

            {/* Right: address */}
            <div className="hidden sm:flex flex-col items-end gap-1 max-w-[200px]">
              <p className="font-serif text-[10px] tracking-[0.22em] uppercase text-brand-navy/55">Locatie</p>
              <p className="font-serif text-xs text-brand-navy/80 font-medium text-right">Scheldeboulevard 7, Terneuzen</p>
            </div>
          </div>
        </div>
      </section>

      <SmullenTicker />

      {/* ── Opening banner ──────────────────────────── */}
      <section className="bg-background py-6 sm:py-8 md:py-10 px-4 sm:px-6 text-brand-navy border-b border-border/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-1 h-10 bg-primary rounded-full shrink-0" aria-hidden />
            <div>
              <p className="label-vintage text-brand-navy/55 text-[11px] tracking-[0.2em] uppercase mb-0.5">Woensdag t/m zondag</p>
              <h2 className="heading-typewriter text-xl sm:text-2xl md:text-3xl">Kom gezellig tafelen</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 md:gap-8 pl-5 sm:pl-0">
            <div className="text-center">
              <p className="heading-display text-3xl sm:text-4xl md:text-5xl text-primary leading-none">12–22</p>
              <p className="label-vintage text-brand-navy/45 text-[10px] tracking-[0.18em] mt-1">Openingstijden</p>
            </div>
            <Link href="/reserveren" className="btn-brand bg-brand-navy text-white hover:bg-primary shrink-0 text-xs sm:text-sm px-5 sm:px-8 py-2.5 sm:py-3.5">
              Reserveer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Welcome ───────────────────────────────── */}
      <section className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden bg-background">
        <div className="relative max-w-6xl mx-auto">

          {/* Two-column editorial layout: text left, stats right */}
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start mb-12 sm:mb-14 md:mb-16">
            {/* Left: text + pill cards */}
            <div>
              <p className="label-vintage text-primary mb-3 text-[11px] tracking-[0.25em] uppercase">Welkom bij</p>
              <BrandWordmark size="lg" className="mb-4 sm:mb-5" />
              <p className="text-foreground/70 text-sm sm:text-base md:text-lg leading-relaxed text-pretty mb-6 sm:mb-8 max-w-md">
                Brasserie aan het water — terras, open keuken en een warme sfeer voor lunch én diner.
              </p>

              {/* Feature pills */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {[
                  { icon: Waves, title: 'Aan het water', text: 'Terras met uitzicht over de Schelde' },
                  { icon: Utensils, title: 'Verse keuken', text: 'Seizoensgerechten & houtoven-pizza' },
                  { icon: Sparkles, title: 'Gezellige sfeer', text: 'Knus binnen & knap buiten' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-border/70 bg-card/80 px-4 sm:px-5 py-3 sm:py-3.5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-md"
                    >
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light transition-colors group-hover:bg-primary">
                        <Icon size={16} className="text-primary transition-colors group-hover:text-white" />
                      </div>
                      <div>
                        <p className="font-display text-xs sm:text-sm text-brand-navy uppercase tracking-wide">{item.title}</p>
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
                  Bekijk het menu <ArrowRight size={16} />
                </Link>
                <Link
                  href="/over-ons"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                >
                  Ontdek ons verhaal <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: bento stats grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
              {/* Large primary card */}
              <div className="col-span-2 flex items-center justify-between rounded-2xl bg-primary p-5 sm:p-6 md:p-8 text-white shadow-lg shadow-primary/20">
                <div>
                  <p className="heading-display text-5xl sm:text-6xl md:text-7xl leading-none">10+</p>
                  <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-white/80">
                    Jaar aan het water
                  </p>
                </div>
                <Waves size={32} className="text-white/20 sm:size-10" aria-hidden />
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col gap-2 transition-shadow hover:shadow-md">
                <Utensils size={16} className="text-primary sm:size-[18px]" aria-hidden />
                <p className="heading-display text-3xl sm:text-4xl text-primary">5</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 leading-snug">
                  Menu-<br />categorieën
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col gap-2 transition-shadow hover:shadow-md">
                <div className="flex gap-0.5 text-primary" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" className="sm:size-3" />
                  ))}
                </div>
                <p className="heading-display text-3xl sm:text-4xl text-primary">5.0</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50">
                  Gastenreviews
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-brand-blue-light/40 p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 border border-primary/15">
                <div>
                  <p className="heading-display text-3xl sm:text-4xl text-primary">12–22</p>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 mt-1 sm:mt-1.5">
                    Woensdag tot en met Zondag
                  </p>
                </div>
                <Infinity size={28} className="text-primary/30 shrink-0 sm:size-9" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ──────────────────────────── */}
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-wood-2 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-primary/20" />
            <div className="text-center shrink-0 px-1">
              <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">
                Waarom <BrandName className="text-primary" />?
              </p>
              <h2 className="heading-typewriter text-xl sm:text-2xl md:text-3xl text-brand-navy">
                Een unieke beleving
              </h2>
            </div>
            <div className="flex-1 h-px bg-primary/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={[
                    'group flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:p-6 transition-all duration-200',
                    'hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5',
                    index === 0 ? 'border-primary/25 bg-primary/4' : 'border-border/80',
                  ].join(' ')}
                >
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-brand-blue-light transition-colors group-hover:bg-primary">
                    <Icon size={18} className="text-primary transition-colors group-hover:text-white sm:size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xs sm:text-sm text-brand-navy uppercase tracking-wide leading-snug mb-1 sm:mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <PlankShowcase />

      {/* ── CTA Banner ──────────────────────────── */}
      <BrandSurface variant="sky" pattern="SMULLEN" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-brand-navy">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-brand-navy/25" />
            <p className="label-vintage text-brand-navy/60 text-[11px] tracking-[0.25em] uppercase">Reserveer direct</p>
            <div className="h-px w-10 bg-brand-navy/25" />
          </div>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-5 text-balance leading-[0.9]">Open!</h2>
          <p className="text-brand-navy/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
            Wo – zo · 12:00 – 22:00 · Terras, plank & sfeer aan de Schelde.
          </p>
          <Link href="/reserveren" className="btn-brand bg-brand-navy text-white hover:bg-primary shadow-lg shadow-brand-navy/20">
            Maak een reservering <ArrowRight size={16} />
          </Link>
        </div>
      </BrandSurface>

      {/* ── Menu preview ────────────────────────── */}
      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Section header with flanking lines */}
          <div className="flex items-center gap-3 sm:gap-5 mb-10 sm:mb-12">
            <div className="flex-1 h-px bg-border" />
            <div className="text-center shrink-0 px-1">
              <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">Onze keuken</p>
              <h2 className="heading-typewriter text-xl sm:text-2xl md:text-3xl text-brand-navy">
                Een greep uit ons menu
              </h2>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                category: 'Voorgerechten',
                items: ['Garnalencocktail', 'Bruschetta houtoven', 'Soep van de dag'],
                featured: false,
              },
              {
                category: 'Hoofdgerechten',
                items: ["Pizza uit de houtoven", 'Gegrilde zalmfilet', 'Ribeye met garnituur'],
                featured: true,
              },
              {
                category: 'Desserts',
                items: ['Crème brûlée', 'Chocoladefondant', 'Seizoenssorbet'],
                featured: false,
              },
            ].map((section) => (
              <div
                key={section.category}
                className={`rounded-2xl border p-5 sm:p-7 flex flex-col ${
                  section.featured
                    ? 'bg-primary border-primary shadow-xl shadow-primary/20 text-white'
                    : 'bg-card border-border/80 shadow-sm hover:shadow-md transition-shadow'
                }`}
              >
                {/* Category tag + title */}
                {section.featured && (
                  <span className="inline-block self-start text-[10px] font-display uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full mb-3">
                    Populair
                  </span>
                )}
                <h3
                  className={`font-display text-sm sm:text-base uppercase tracking-wide mb-4 sm:mb-5 ${section.featured ? 'text-white' : 'text-brand-navy'}`}
                >
                  {section.category}
                </h3>
                <ul className="flex flex-col flex-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2.5 text-sm py-2 sm:py-2.5 border-b last:border-b-0 ${
                        section.featured
                          ? 'border-white/15 text-white/85'
                          : 'border-border/50 text-foreground/65'
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full shrink-0 ${section.featured ? 'bg-white/50' : 'bg-primary/50'}`}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
            >
              Bekijk het volledige menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
