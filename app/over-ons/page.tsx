import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandName } from '@/components/brand-name'
import { ArrowRight, Heart, Leaf, Star } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Over ons – FoodJutters',
  description: 'Ontdek het verhaal achter FoodJutters. Een waterfront restaurant met passie voor eten, sfeer en gastvrijheid.',
}

const values = [
  {
    icon: Heart,
    title: 'Gastvrijheid',
    description: 'Elk gast verdient een warme ontvangst en een onvergetelijke avond. Dat is onze belofte.',
  },
  {
    icon: Leaf,
    title: 'Vers & lokaal',
    description: 'Wij werken met seizoensgebonden producten van lokale leveranciers voor de beste smaken.',
  },
  {
    icon: Star,
    title: 'Beleving',
    description: 'Van het uitzicht over het water tot de knapperende houtkachel — alles draagt bij aan de sfeer.',
  },
]

const team = [
  {
    name: 'Jurrien de Lutter',
    role: 'Eigenaar & Gastheer',
    description: 'Met meer dan 15 jaar horecaervaring weet Jurrien als geen ander hoe hij gasten in de watten legt.',
  },
  {
    name: 'Lisa van der Berg',
    role: 'Chef-kok',
    description: "Lisa's passie voor verse, seizoensgebonden ingrediënten is te proeven in elk gerecht dat de keuken verlaat.",
  },
  {
    name: 'Marco Stam',
    role: 'Barman & Barista',
    description: 'Van een perfecte espresso tot een handgemaakte cocktail — Marco zorgt dat uw drankje altijd klopt.',
  },
]

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ons verhaal"
        title="Over ons"
        subtitle="Hoe een passie voor goed eten en gastvrijheid uitgroeide tot een uniek waterfront restaurant aan de Schelde."
        meta={[
          { label: 'Opgericht', value: '2012' },
          { label: 'Ervaring', value: '10+ jaar' },
          { label: 'Gastoordeel', value: '5.0 ★' },
        ]}
        ctas={[
          { href: '/menu', label: 'Bekijk ons menu' },
          { href: '/contact', label: 'Reserveer een tafel', variant: 'secondary' },
        ]}
      />

      {/* ── Story ──────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 bg-wood-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Stats block */}
          <div className="relative">
            <div className="bg-wood-texture rounded-2xl overflow-hidden">
              <div className="p-10 flex flex-col items-center justify-center gap-3 h-80">
                <p className="label-vintage text-primary/70 text-[11px] tracking-[0.25em] uppercase">Opgericht</p>
                <p className="heading-display text-8xl text-primary leading-none">2012</p>
                <div className="w-10 h-px bg-primary/30 my-1" />
                <p className="heading-display text-5xl text-brand-dark">10+</p>
                <p className="label-vintage text-foreground/55 text-[11px] tracking-[0.2em]">jaar onvergetelijke ervaringen</p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary rounded-xl px-5 py-3 shadow-lg shadow-primary/25 text-white text-center">
              <p className="heading-display text-2xl leading-none">5.0</p>
              <p className="text-[10px] text-white/75 uppercase tracking-widest mt-0.5">Reviews</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary/40" />
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase">Hoe het begon</p>
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-brand-dark leading-[0.95] text-balance mb-6">
              Een droom aan het water
            </h2>
            <p className="text-foreground/65 leading-relaxed mb-4 text-sm">
              <BrandName className="text-inherit tracking-normal" /> ontstond uit een eenvoudige droom:
              een plek aan het water creëren waar mensen kunnen genieten van eerlijk, lekker eten in een
              ontspannen sfeer. Met een prachtig uitzicht en een unieke locatie sloeg het idee direct aan.
            </p>
            <p className="text-foreground/65 leading-relaxed mb-4 text-sm">
              Wat begon als een bescheiden terrasrestaurant groeide uit tot een van de meest geliefde eetgelegenheden in de regio. Het houten terras, de houtgestookte pizza-oven en de sfeervolle binnenruimte zijn inmiddels vaste waarden geworden.
            </p>
            <p className="text-foreground/65 leading-relaxed mb-8 text-sm">
              Wij geloven dat goed eten mensen samenbrengt. Elk gerecht is bereid met zorg en liefde, elk bezoek moet voelen als thuiskomen.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
            >
              Ontdek ons menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────── */}
      <section className="py-14 md:py-16 px-6 bg-wood-2 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          {/* Centered section header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="flex-1 h-px bg-primary/20" />
            <div className="text-center shrink-0">
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase mb-1">Waar wij voor staan</p>
              <h2 className="heading-display text-3xl md:text-4xl text-brand-dark">Onze waarden</h2>
            </div>
            <div className="flex-1 h-px bg-primary/20" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className={`rounded-2xl p-7 shadow-sm border flex flex-col gap-4 ${
                    i === 1
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-card border-border/80 hover:shadow-md transition-shadow'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      i === 1 ? 'bg-white/20' : 'bg-brand-blue-light'
                    }`}
                  >
                    <Icon size={22} className={i === 1 ? 'text-white' : 'text-primary'} />
                  </div>
                  <div>
                    <h3 className={`heading-display text-lg mb-2 ${i === 1 ? 'text-white' : 'text-brand-dark'}`}>
                      {v.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${i === 1 ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {v.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────── */}
      <section className="py-14 md:py-16 px-6 bg-wood-plank">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-5 mb-10">
            <div className="flex-1 h-px bg-border" />
            <div className="text-center shrink-0">
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase mb-1">Ons team</p>
              <h2 className="heading-display text-3xl md:text-4xl text-brand-dark text-balance">
                De mensen achter{' '}
                <BrandName className="text-inherit tracking-normal" />
              </h2>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="rounded-2xl overflow-hidden border border-border/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div
                  className="h-44 flex items-end justify-start p-5"
                  style={{ background: `oklch(${0.88 - i * 0.03} 0.06 ${210 + i * 8})` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md shrink-0">
                      <span className="heading-display text-xl text-primary">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-display text-sm text-brand-navy uppercase tracking-wide leading-tight">{member.name}</p>
                      <p className="text-primary text-[10px] font-semibold uppercase tracking-widest mt-0.5">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location CTA ───────────────────────────── */}
      <section className="py-16 md:py-20 px-6 bg-brand-navy">
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-white/20" />
            <p className="label-vintage text-white/50 text-[11px] tracking-[0.25em] uppercase">Wij verwelkomen u</p>
            <div className="h-px w-10 bg-white/20" />
          </div>
          <h2 className="heading-display text-4xl md:text-5xl mb-5 text-balance leading-[0.95]">Kom langs</h2>
          <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            U vindt ons op een unieke locatie aan het water. Kom proeven, genieten en uzelf verliezen in het uitzicht.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-lg shadow-primary/25 text-sm"
          >
            Bekijk routebeschrijving <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
