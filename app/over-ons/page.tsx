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
    description: 'Lisa\'s passie voor verse, seizoensgebonden ingrediënten is te proeven in elk gerecht dat de keuken verlaat.',
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
        subtitle="Hoe een passie voor goed eten en gastvrijheid uitgroeide tot een uniek waterfront restaurant."
      />

      {/* Story */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {/* Stats block instead of photo */}
            <div className="bg-wood-texture rounded-2xl p-10 flex flex-col items-center justify-center gap-2 h-72">
              <p className="heading-display text-7xl text-primary">2012</p>
              <p className="text-sm text-foreground/60 font-medium uppercase tracking-widest">opgericht aan het water</p>
              <div className="w-12 h-px bg-primary/30 my-2" />
              <p className="heading-display text-4xl text-brand-dark">10+</p>
              <p className="text-sm text-foreground/60">jaar onvergetelijke ervaringen</p>
            </div>
          </div>
          <div>
            <p className="label-vintage text-primary mb-3">Hoe het begon</p>
            <h2 className="heading-display text-3xl text-brand-dark leading-tight text-balance mb-5">
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
            <p className="text-foreground/65 leading-relaxed mb-7 text-sm">
              Wij geloven dat goed eten mensen samenbrengt. Elk gerecht is bereid met zorg en liefde, elk bezoek moet voelen als thuiskomen.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              Ontdek ons menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="label-vintage text-primary mb-2">Waar wij voor staan</p>
            <h2 className="heading-display text-3xl text-brand-dark text-balance">Onze waarden</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-card rounded-xl p-7 shadow-sm border border-border text-center flex flex-col items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-brand-blue-light flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="heading-display text-lg text-brand-dark">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="label-vintage text-primary mb-2">Ons team</p>
            <h2 className="heading-display text-3xl text-brand-dark text-balance">
              De mensen achter <BrandName className="text-inherit tracking-normal" />
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <div key={member.name} className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: `oklch(${0.88 - i * 0.03} 0.06 ${210 + i * 8})` }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-md">
                    <span className="heading-display text-2xl text-primary">{member.name[0]}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="heading-display text-base text-brand-dark">{member.name}</h3>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wide mb-2 mt-0.5">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="heading-display text-3xl mb-4 text-balance">Kom langs</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-7">
            U vindt ons op een unieke locatie aan het water. Kom proeven, genieten en uzelf verliezen in het uitzicht.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-brand-blue-light transition-colors shadow-lg text-sm"
          >
            Bekijk routebeschrijving <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
