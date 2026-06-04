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
      <section className="hero-wood relative min-h-screen flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30 pointer-events-none" aria-hidden />
        <HeroAmbience />

        {/* Centered content — positioned at 38% from top for a slightly high center of gravity */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            <h1 className="sr-only">FoodJutters — smullen, borrelen & genieten aan het water</h1>
            <Logo layout="stack" size="hero" className="mb-6 md:mb-7" />

            {/* thin divider */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-brand-navy/30" />
              <p className="label-vintage text-brand-navy/80 text-sm md:text-base tracking-[0.18em]">
                Smullen, borrelen & genieten aan het water
              </p>
              <div className="h-px w-12 bg-brand-navy/30" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/menu" className="btn-brand bg-brand-navy text-white hover:bg-brand-blue-dark shadow-lg shadow-brand-navy/25">
                Bekijk ons menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-brand bg-white/90 text-brand-navy hover:bg-white border border-brand-navy/15 shadow-sm"
              >
                Reserveer een tafel
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom meta bar */}
        <div className="relative z-10 w-full pb-8 px-8">
          <div className="max-w-6xl mx-auto flex items-end justify-between">
            <div className="hidden sm:flex flex-col gap-0.5">
              <p className="label-vintage text-brand-navy/50 text-[10px] tracking-[0.22em] uppercase">Geopend</p>
              <p className="label-vintage text-brand-navy/70 text-xs">Wo – Zo · 12:00 – 22:00</p>
            </div>
            <div className="mx-auto sm:mx-0 flex flex-col items-center gap-1.5 text-brand-navy/35">
              <div className="w-px h-7 bg-gradient-to-b from-brand-navy/20 to-transparent" />
              <span className="label-vintage text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-0.5">
              <p className="label-vintage text-brand-navy/50 text-[10px] tracking-[0.22em] uppercase">Locatie</p>
              <p className="label-vintage text-brand-navy/70 text-xs">Parallelweg 1, Lelystad</p>
            </div>
          </div>
        </div>
      </section>

      <SmullenTicker />

      {/* ── Opening banner ──────────────────────────── */}
      <section className="bg-background py-8 md:py-10 px-6 text-brand-navy border-b border-border/60">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-1 h-10 bg-primary rounded-full shrink-0" aria-hidden />
            <div>
              <p className="label-vintage text-brand-navy/55 text-[11px] tracking-[0.2em] uppercase mb-0.5">Woensdag t/m zondag</p>
              <h2 className="heading-typewriter text-2xl md:text-3xl">Kom smullen</h2>
            </div>
          </div>
          <div className="flex items-center gap-5 sm:gap-8">
            <div className="text-center">
              <p className="heading-display text-4xl md:text-5xl text-primary leading-none">12–22</p>
              <p className="label-vintage text-brand-navy/45 text-[10px] tracking-[0.18em] mt-1">Openingstijden</p>
            </div>
            <Link href="/contact" className="btn-brand bg-brand-navy text-white hover:bg-primary shrink-0">
              Reserveer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Welcome ───────────────────────────────── */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden bg-background">
        <div className="relative max-w-6xl mx-auto">

          {/* Two-column editorial layout: text left, stats right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-14 md:mb-16">
            {/* Left: text + pill cards */}
            <div>
              <p className="label-vintage text-primary mb-3 text-[11px] tracking-[0.25em] uppercase">Welkom bij</p>
              <BrandWordmark size="lg" className="mb-5" />
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed text-pretty mb-8 max-w-md">
                Brasserie aan het water — terras, open keuken en een warme sfeer voor lunch én diner.
              </p>

              {/* Feature pills */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: Waves, title: 'Aan het water', text: 'Terras met uitzicht over de Schelde' },
                  { icon: Utensils, title: 'Verse keuken', text: 'Seizoensgerechten & houtoven-pizza' },
                  { icon: Sparkles, title: 'Gezellige sfeer', text: 'Knus binnen & knap buiten' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="group flex items-center gap-4 rounded-xl border border-border/70 bg-card/80 px-5 py-3.5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light transition-colors group-hover:bg-primary">
                        <Icon size={18} className="text-primary transition-colors group-hover:text-white" />
                      </div>
                      <div>
                        <p className="font-display text-sm text-brand-navy uppercase tracking-wide">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-snug mt-0.5">{item.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-8">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
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
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Large primary card */}
              <div className="col-span-2 flex items-center justify-between rounded-2xl bg-primary p-6 md:p-8 text-white shadow-lg shadow-primary/20">
                <div>
                  <p className="heading-display text-6xl md:text-7xl leading-none">10+</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/80">
                    Jaar aan het water
                  </p>
                </div>
                <Waves size={40} className="text-white/20" aria-hidden />
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 transition-shadow hover:shadow-md">
                <Utensils size={18} className="text-primary" aria-hidden />
                <p className="heading-display text-4xl text-primary">5</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 leading-snug">
                  Menu-<br />categorieën
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 transition-shadow hover:shadow-md">
                <div className="flex gap-0.5 text-primary" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="heading-display text-4xl text-primary">5.0</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50">
                  Gastenreviews
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-brand-blue-light/40 p-5 md:p-6 flex items-center justify-between gap-4 border border-primary/15">
                <div>
                  <p className="heading-display text-4xl text-primary">12–22</p>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/50 mt-1.5">
                    Woensdag tot en met Zondag
                  </p>
                </div>
                <Infinity size={36} className="text-primary/30 shrink-0" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ──────────────────────────── */}
      <section className="py-14 md:py-16 px-6 bg-wood-2 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="flex-1 h-px bg-primary/20" />
            <div className="text-center shrink-0">
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase mb-1">
                Waarom <BrandName className="text-primary" />?
              </p>
              <h2 className="heading-typewriter text-2xl md:text-3xl text-brand-navy">
                Een unieke beleving
              </h2>
            </div>
            <div className="flex-1 h-px bg-primary/20" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={[
                    'group flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-all duration-200',
                    'hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5',
                    index === 0 ? 'border-primary/25 bg-primary/4' : 'border-border/80',
                  ].join(' ')}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-light transition-colors group-hover:bg-primary">
                    <Icon size={20} className="text-primary transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm text-brand-navy uppercase tracking-wide leading-snug mb-1.5">
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
      <BrandSurface variant="sky" pattern="SMULLEN" className="py-20 md:py-24 px-6 text-brand-navy">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-brand-navy/25" />
            <p className="label-vintage text-brand-navy/60 text-[11px] tracking-[0.25em] uppercase">Reserveer direct</p>
            <div className="h-px w-10 bg-brand-navy/25" />
          </div>
          <h2 className="heading-display text-5xl md:text-7xl mb-5 text-balance leading-[0.9]">Open!</h2>
          <p className="text-brand-navy/70 text-base leading-relaxed mb-8 max-w-sm mx-auto">
            Wo – zo · 12:00 – 22:00 · Terras, plank & sfeer aan de Schelde.
          </p>
          <Link href="/contact" className="btn-brand bg-brand-navy text-white hover:bg-primary shadow-lg shadow-brand-navy/20">
            Maak een reservering <ArrowRight size={16} />
          </Link>
        </div>
      </BrandSurface>

      {/* ── Menu preview ────────────────────────── */}
      <section className="py-16 md:py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Section header with flanking lines */}
          <div className="flex items-center gap-5 mb-12">
            <div className="flex-1 h-px bg-border" />
            <div className="text-center shrink-0">
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase mb-1">Onze keuken</p>
              <h2 className="heading-typewriter text-2xl md:text-3xl text-brand-navy">
                Een greep uit ons menu
              </h2>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
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
                className={`rounded-2xl border p-7 flex flex-col ${
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
                  className={`font-display text-base uppercase tracking-wide mb-5 ${section.featured ? 'text-white' : 'text-brand-navy'}`}
                >
                  {section.category}
                </h3>
                <ul className="flex flex-col flex-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2.5 text-sm py-2.5 border-b last:border-b-0 ${
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

          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
            >
              Bekijk het volledige menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
