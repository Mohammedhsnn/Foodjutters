import Link from 'next/link'
import { BrandSurface } from '@/components/brand-surface'

interface PageHeroMeta {
  label: string
  value: string
}

interface PageHeroCta {
  href: string
  label: string
  /** secondary renders as ghost/outline style */
  variant?: 'primary' | 'secondary'
}

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  pattern?: string
  /** Up to 3 small meta pills rendered below the subtitle */
  meta?: PageHeroMeta[]
  /** Up to 2 CTA buttons */
  ctas?: PageHeroCta[]
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  pattern = 'SMULLEN',
  meta,
  ctas,
}: PageHeroProps) {
  return (
    <BrandSurface variant="sky" pattern={pattern} className="relative pt-32 pb-24 px-6 text-brand-navy">
      {/* Bottom wave transition */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full z-10"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,56 L0,28 C180,56 360,8 540,28 C720,48 900,8 1080,28 C1260,48 1380,20 1440,28 L1440,56 Z"
          fill="var(--color-background)"
        />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Eyebrow with flanking rules */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-brand-navy/25" />
          <span className="label-vintage text-brand-navy/60 text-[11px] tracking-[0.28em] uppercase">
            {eyebrow}
          </span>
          <div className="h-px w-10 bg-brand-navy/25" />
        </div>

        {/* Title */}
        <h1 className="heading-display text-5xl md:text-7xl text-balance mb-5 leading-[0.9]">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-brand-navy/60 text-base md:text-lg leading-relaxed max-w-lg mx-auto text-pretty mb-0">
          {subtitle}
        </p>

        {/* Meta pills */}
        {meta && meta.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-7">
            {meta.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-2 bg-white/50 border border-brand-navy/12 rounded-full px-4 py-1.5 backdrop-blur-sm"
              >
                <span className="label-vintage text-brand-navy/45 text-[10px] tracking-[0.22em] uppercase">
                  {m.label}
                </span>
                <div className="w-px h-3 bg-brand-navy/20" aria-hidden />
                <span className="label-vintage text-brand-navy/80 text-[11px] font-medium">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        {ctas && ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            {ctas.map((cta) =>
              cta.variant === 'secondary' ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-widest text-[11px] px-7 py-3 rounded-full border border-brand-navy/30 bg-transparent text-brand-navy hover:bg-brand-navy/8 transition-all"
                >
                  {cta.label}
                </Link>
              ) : (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-widest text-[11px] px-7 py-3 rounded-full bg-brand-navy text-white hover:bg-primary transition-all shadow-md shadow-brand-navy/20"
                >
                  {cta.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </BrandSurface>
  )
}
