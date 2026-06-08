import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandName } from '@/components/brand-name'
import { IconArrowRight, IconHeart, tablerProps } from '@/lib/site/icons'
import { PageHero } from '@/components/page-hero'
import { blockJson, blockValue } from '@/lib/cms/blocks'
import { resolveIcon } from '@/lib/cms/icons'
import { getContentPage } from '@/lib/db/repository'

export const metadata: Metadata = {
  title: 'Over ons – FoodJutters',
  description:
    'Ontdek het verhaal achter FoodJutters. Een waterfront restaurant met passie voor eten, sfeer en gastvrijheid.',
}

type ValueItem = { icon: string; title: string; description: string }
type TeamMember = { name: string; role: string; description: string }

const FALLBACK_VALUES: ValueItem[] = [
  { icon: 'Heart', title: 'Gastvrijheid', description: 'Elk gast verdient een warme ontvangst en een onvergetelijke avond. Dat is onze belofte.' },
  { icon: 'Leaf', title: 'Vers & lokaal', description: 'Wij werken met seizoensgebonden producten van lokale leveranciers voor de beste smaken.' },
  { icon: 'Star', title: 'Beleving', description: 'Van het uitzicht over het water tot de knapperende houtkachel — alles draagt bij aan de sfeer.' },
]

export default async function OverOnsPage() {
  const page = await getContentPage('over-ons')
  const hero = page?.hero
  const values = blockJson<ValueItem[]>(page, 'values', FALLBACK_VALUES)
  const team = blockJson<TeamMember[]>(page, 'team', [])

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow ?? 'Ons verhaal'}
        title={hero?.title ?? 'Over ons'}
        subtitle={
          hero?.subtitle ??
          'Hoe een passie voor goed eten en gastvrijheid uitgroeide tot een uniek waterfront restaurant aan de Schelde.'
        }
        meta={hero?.meta}
        ctas={[
          { href: '/menu', label: 'Bekijk ons menu' },
          { href: '/reserveren', label: 'Reserveer een tafel', variant: 'secondary' },
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="relative max-w-sm mx-auto md:mx-0 w-full">
            <div className="bg-wood-texture rounded-2xl overflow-hidden">
              <div className="p-8 sm:p-10 flex flex-col items-center justify-center gap-3 h-64 sm:h-80">
                <p className="label-vintage text-primary/70 text-[11px] tracking-[0.25em] uppercase">Opgericht</p>
                <p className="heading-display text-7xl sm:text-8xl text-primary leading-none">
                  {blockValue(page, 'founded_year', '2012')}
                </p>
                <div className="w-10 h-px bg-primary/30 my-1" />
                <p className="heading-display text-4xl sm:text-5xl text-brand-dark">10+</p>
                <p className="label-vintage text-foreground/55 text-[11px] tracking-[0.2em] text-center">
                  jaar onvergetelijke ervaringen
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-primary rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg shadow-primary/25 text-white text-center">
              <p className="heading-display text-xl sm:text-2xl leading-none">5.0</p>
              <p className="text-[10px] text-white/75 uppercase tracking-widest mt-0.5">Reviews</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="h-px w-8 bg-primary/40" />
              <p className="label-vintage text-primary text-[11px] tracking-[0.25em] uppercase">Hoe het begon</p>
            </div>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl text-brand-dark leading-[0.95] text-balance mb-4 sm:mb-6">
              {blockValue(page, 'story_title', 'Een droom aan het water')}
            </h2>
            <p className="text-foreground/65 leading-relaxed mb-4 text-sm">{blockValue(page, 'story_p1', '')}</p>
            <p className="text-foreground/65 leading-relaxed mb-4 text-sm">{blockValue(page, 'story_p2', '')}</p>
            <p className="text-foreground/65 leading-relaxed mb-6 sm:mb-8 text-sm">{blockValue(page, 'story_p3', '')}</p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
            >
              Ontdek ons menu <IconArrowRight {...tablerProps(16)} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-background border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-primary/20" />
            <div className="text-center shrink-0 px-1">
              <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">
                Waar wij voor staan
              </p>
              <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl text-brand-dark">Onze waarden</h2>
            </div>
            <div className="flex-1 h-px bg-primary/20" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {values.map((v, i) => {
              const Icon = resolveIcon(v.icon, IconHeart)
              return (
                <div
                  key={v.title}
                  className={`rounded-2xl p-5 sm:p-7 shadow-sm border flex flex-col gap-4 ${
                    i === 1
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-card border-border/80 hover:shadow-md transition-shadow'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                      i === 1 ? 'bg-white/20' : 'bg-brand-blue-light'
                    }`}
                  >
                    <Icon size={20} className={i === 1 ? 'text-white' : 'text-primary'} />
                  </div>
                  <div>
                    <h3 className={`heading-display text-base sm:text-lg mb-2 ${i === 1 ? 'text-white' : 'text-brand-dark'}`}>
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

      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-wood-plank">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-border" />
            <div className="text-center shrink-0 px-1">
              <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1">Ons team</p>
              <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl text-brand-dark text-balance">
                De mensen achter <BrandName className="text-inherit tracking-normal" />
              </h2>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="rounded-2xl overflow-hidden border border-border/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
              >
                <div
                  className="h-36 sm:h-44 flex items-end justify-start p-4 sm:p-5"
                  style={{ background: `oklch(${0.88 - i * 0.03} 0.06 ${210 + i * 8})` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md shrink-0">
                      <span className="heading-display text-lg sm:text-xl text-primary">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-display text-xs sm:text-sm text-brand-navy uppercase tracking-wide leading-tight">
                        {member.name}
                      </p>
                      <p className="text-primary text-[10px] font-semibold uppercase tracking-widest mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-brand-navy">
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-white/20" />
            <p className="label-vintage text-white/50 text-[11px] tracking-[0.25em] uppercase">Wij verwelkomen u</p>
            <div className="h-px w-10 bg-white/20" />
          </div>
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 text-balance leading-[0.95]">
            {blockValue(page, 'cta_title', 'Kom langs')}
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto">
            {blockValue(page, 'cta_text', '')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-lg shadow-primary/25 text-sm"
          >
            Bekijk routebeschrijving <IconArrowRight {...tablerProps(16)} />
          </Link>
        </div>
      </section>
    </>
  )
}
