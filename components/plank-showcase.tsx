import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Instagram } from 'lucide-react'
import { BrandName } from '@/components/brand-name'
import { BrandSurface } from '@/components/brand-surface'

const plankItems = [
  'Jonge kaas',
  'Bayonne ham',
  'Salami',
  'Olijven & druiven',
  'Calamariringen',
  'Mosterd & dips',
] as const

/** Social-stijl plank-sectie — volledig gecodeerd (geen post-afbeeldingen) */
export function PlankShowcase() {
  return (
    <BrandSurface variant="navy" pattern="PLANK" className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 text-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
        <div>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-7xl text-white mb-3 sm:mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <BrandName variant="light" className="text-[0.55em] sm:text-[0.5em]" />
            <span>Plank</span>
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-md">
            Onze borrelplank vol kaas, charcuterie, hapjes en dips — om te delen aan het water.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="btn-brand bg-primary text-white hover:bg-brand-blue-dark">
              Bekijk het menu
            </Link>
            <a
              href="https://www.instagram.com/foodjutters"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand bg-white/10 text-white hover:bg-white/20 border border-white/20"
            >
              <Instagram size={16} />
              Volg ons
            </a>
          </div>
        </div>

        {/* 2×2 card grid — use max-w to cap size on wide single-column layouts */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full">
          <PlankCard variant="sky">
            <p className="label-vintage text-brand-navy/70 text-[10px] sm:text-xs mb-1.5 sm:mb-2">Wo – zo</p>
            <p className="heading-typewriter text-base sm:text-2xl text-brand-navy">Kom smullen</p>
          </PlankCard>

          <PlankCard variant="board">
            <BorrelplankGraphic />
          </PlankCard>

          <PlankCard variant="pattern">
            <p className="label-vintage text-white/55 text-[10px] tracking-[0.18em] uppercase mb-1.5">Aan het water</p>
            <p className="heading-display text-2xl sm:text-4xl text-white leading-none">Terras</p>
            <p className="heading-display text-2xl sm:text-4xl text-primary leading-none">& sfeer</p>
          </PlankCard>

          <PlankCard variant="price">
            <p className="label-vintage text-white/70 text-[10px] sm:text-xs mb-1">Vanaf</p>
            <p className="heading-display text-3xl sm:text-5xl text-white">€34</p>
            <p className="heading-display text-sm sm:text-lg text-primary mt-1">Plank</p>
          </PlankCard>
        </div>
      </div>

      <ul className="max-w-6xl mx-auto mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        {plankItems.map((item) => (
          <li
            key={item}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/75 uppercase tracking-wide"
          >
            {item}
          </li>
        ))}
      </ul>
    </BrandSurface>
  )
}

function PlankCard({
  variant,
  children,
}: {
  variant: 'sky' | 'board' | 'pattern' | 'price'
  children: ReactNode
}) {
  return (
    <div
      className={[
        'aspect-square rounded-xl border-2 p-3 sm:p-4 flex flex-col justify-center overflow-hidden',
        variant === 'sky' && 'brand-surface-sky border-brand-navy/10 text-brand-navy',
        variant === 'board' && 'bg-[#8b5a2b] border-white/20',
        variant === 'pattern' && 'brand-surface-navy border-white/15',
        variant === 'price' && 'bg-brand-navy border-primary/40 shadow-lg shadow-primary/20',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function BorrelplankGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden>
      <div className="absolute inset-2 rounded-full border-4 border-[#6d4528] bg-[#a0714b] shadow-inner" />
      <div className="relative grid grid-cols-3 gap-1 sm:gap-1.5 p-4 sm:p-6">
        {['#f4d03f', '#c0392b', '#27ae60', '#e67e22', '#ecf0f1', '#8e44ad'].map((color, i) => (
          <span
            key={i}
            className="block h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full border border-black/10"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  )
}
