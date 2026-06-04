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
      <section className="hero-wood relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-white/15 pointer-events-none" aria-hidden />
        <HeroAmbience />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-16">
          <h1 className="sr-only">FoodJutters — smullen, borrelen & genieten aan het water</h1>
          <Logo layout="stack" size="hero" className="mb-8 md:mb-10" />
          <p className="label-vintage text-brand-navy/90 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Smullen, borrelen & genieten aan het water
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-brand bg-brand-navy text-white hover:bg-brand-blue-dark">
              Bekijk ons menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-brand bg-white text-brand-navy hover:bg-brand-blue-light border border-brand-navy/10"
            >
              Reserveer een tafel
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-navy/40 z-10">
          <span className="label-vintage text-[10px] tracking-[0.25em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-navy/25 to-transparent" />
        </div>
      </section>

      <SmullenTicker />

      {/* ── Opening banner ──────────────────────────── */}
      <section className="bg-white py-10 md:py-12 px-6 text-brand-navy border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="label-vintage text-brand-navy/70 mb-2">Woensdag t/m zondag</p>
            <h2 className="heading-typewriter text-3xl md:text-4xl">Kom smullen</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="heading-display text-3xl md:text-4xl text-primary">12–22</p>
            <Link href="/contact" className="btn-brand bg-brand-navy text-white hover:bg-primary shrink-0">
              Reserveer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Welcome ───────────────────────────────── */}
      <section className="relative py-20 md:py-24 px-6 overflow-hidden bg-wood-welcome">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <p className="label-vintage text-primary mb-3">Welkom bij</p>
            <BrandWordmark size="lg" className="mb-4" />
            <p className="text-foreground/70 text-base md:text-lg leading-relaxed text-pretty">
              Brasserie aan het water — terras, open keuken en een warme sfeer voor lunch én diner.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12">
            {[
              { icon: Waves, title: 'Aan het water', text: 'Terras met uitzicht' },
              { icon: Utensils, title: 'Verse keuken', text: 'Seizoensgerechten & pizza' },
              { icon: Sparkles, title: 'Gezellige sfeer', text: 'Knus binnen & buiten' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-light transition-colors group-hover:bg-primary">
                    <Icon size={22} className="text-primary transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-display text-base text-brand-navy uppercase">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-2 lg:col-span-1 row-span-2 flex flex-col justify-between rounded-2xl bg-primary p-6 md:p-8 text-white shadow-lg shadow-primary/20">
              <Waves size={28} className="text-white/80" aria-hidden />
              <div>
                <p className="heading-display text-5xl md:text-6xl">10+</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/85">
                  Jaar aan het water
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 transition-shadow hover:shadow-md">
              <Utensils size={20} className="text-primary" aria-hidden />
              <p className="heading-display text-3xl text-primary">5</p>
              <p className="text-xs font-medium uppercase tracking-wider text-foreground/55">
                Menu-categorieën
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2 transition-shadow hover:shadow-md">
              <div className="flex gap-0.5 text-primary" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="heading-display text-3xl text-primary">5.0</p>
              <p className="text-xs font-medium uppercase tracking-wider text-foreground/55">
                Gastenreviews
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 rounded-2xl bg-wood-muted p-5 md:p-6 flex items-center justify-between gap-4 border border-primary/15">
              <div>
                <p className="heading-display text-3xl text-primary">12–22</p>
                <p className="text-xs font-medium uppercase tracking-wider text-foreground/55 mt-1">
                  Wo – Zo geopend
                </p>
              </div>
              <Infinity size={32} className="text-primary/40 shrink-0" aria-hidden />
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
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
      </section>

      {/* ── Highlights ──────────────────────────── */}
      <section className="py-12 md:py-14 px-6 bg-wood-muted border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="label-vintage text-primary mb-1.5">
                Waarom <BrandName className="text-primary" />?
              </p>
              <h2 className="heading-typewriter text-2xl md:text-3xl text-brand-navy text-balance">
                Een unieke beleving
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs sm:text-right">
              Terras, houtoven en uitzicht — aan de Schelde.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={[
                    'group flex gap-3.5 rounded-xl border bg-card p-4 transition-all duration-200',
                    'hover:border-primary/40 hover:shadow-md',
                    index === 0 ? 'border-primary/30 bg-primary/5' : 'border-border',
                  ].join(' ')}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light transition-colors group-hover:bg-primary">
                    <Icon size={18} className="text-primary transition-colors group-hover:text-white" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-display text-sm text-brand-navy uppercase leading-snug mb-0.5">
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
      <BrandSurface variant="sky" pattern="SMULLEN" className="py-20 px-6 text-brand-navy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="label-vintage text-brand-navy/75 mb-3">Reserveer direct</p>
          <h2 className="heading-display text-4xl md:text-6xl mb-4 text-balance">Open!</h2>
          <p className="text-brand-navy/80 text-base leading-relaxed mb-8">
            Wo – zo · 12:00 – 22:00 · Terras, plank & sfeer aan de Schelde.
          </p>
          <Link href="/contact" className="btn-brand bg-brand-navy text-white hover:bg-primary">
            Maak een reservering <ArrowRight size={16} />
          </Link>
        </div>
      </BrandSurface>

      {/* ── Menu preview ────────────────────────── */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="label-vintage text-primary mb-2">Onze keuken</p>
            <h2 className="heading-typewriter text-3xl md:text-4xl text-brand-navy text-balance">
              Een greep uit ons menu
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              {
                category: 'Starters',
                items: ['Garnalencocktail', 'Bruschetta houtoven', 'Soep van de dag'],
                featured: false,
              },
              {
                category: 'Hoofdgerechten',
                items: ['Pizza uit de houtoven', 'Gegrilde zalmfilet', 'Ribeye met garnituur'],
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
                className={`rounded-xl border p-6 ${
                  section.featured
                    ? 'bg-primary border-primary shadow-lg text-white'
                    : 'bg-card border-border shadow-sm'
                }`}
              >
                <h3
                  className={`font-display text-lg uppercase mb-4 ${section.featured ? 'text-white' : 'text-brand-navy'}`}
                >
                  {section.category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className={`text-sm py-2.5 border-b last:border-b-0 ${
                        section.featured
                          ? 'border-white/20 text-white/85'
                          : 'border-border text-foreground/65'
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
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
