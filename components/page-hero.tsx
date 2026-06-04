import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
  /** Retained for API compatibility but no longer used as a watermark */
  pattern?: string
  /** Up to 3 small meta chips rendered below the subtitle */
  meta?: PageHeroMeta[]
  /** Up to 2 CTA buttons */
  ctas?: PageHeroCta[]
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  meta,
  ctas,
}: PageHeroProps) {
  return (
    <div className="relative bg-background overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">

      {/* Subtle top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" aria-hidden />

      {/* Very light tinted half-circle — no image, no pattern */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(700px,120vw)] h-[340px] rounded-full bg-brand-blue-light/40 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
          <div className="h-px w-8 bg-primary/40" aria-hidden />
          <span className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.3em] uppercase">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-primary/40" aria-hidden />
        </div>

        {/* Title */}
        <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-navy text-balance leading-[0.9] mb-4 sm:mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-sm sm:max-w-md mx-auto text-pretty px-2 sm:px-0">
          {subtitle}
        </p>

        {/* Meta chips */}
        {meta && meta.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8 px-2 sm:px-0">
            {meta.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-border shadow-sm min-w-0 max-w-[calc(100vw-3rem)]"
              >
                <span className="label-vintage text-brand-navy/45 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase whitespace-nowrap shrink-0">
                  {m.label}
                </span>
                <div className="w-px h-3 bg-border shrink-0" aria-hidden />
                <span className="label-vintage text-primary text-[10px] sm:text-[11px] font-semibold truncate">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        {ctas && ctas.length > 0 && (
          <div className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center sm:items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8 px-4 sm:px-0">
            {ctas.map((cta) =>
              cta.variant === 'secondary' ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-widest text-[11px] px-5 sm:px-6 py-2.5 rounded-full border border-brand-navy/25 bg-transparent text-brand-navy/75 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  {cta.label}
                </Link>
              ) : (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-widest text-[11px] px-5 sm:px-6 py-2.5 rounded-full bg-brand-navy text-white hover:bg-primary transition-all duration-200 shadow-md shadow-brand-navy/20"
                >
                  {cta.label}
                  <ArrowRight size={12} aria-hidden />
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {/* Bottom divider — gentle wave */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 36"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,36 L0,18 C240,36 480,4 720,18 C960,32 1200,4 1440,18 L1440,36 Z"
          fill="var(--color-primary)"
          fillOpacity="0.07"
        />
      </svg>
    </div>
  )
}
