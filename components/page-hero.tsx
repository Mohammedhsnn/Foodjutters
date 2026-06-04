import { BrandSurface } from '@/components/brand-surface'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  pattern?: string
}

export function PageHero({ eyebrow, title, subtitle, pattern = 'SMULLEN' }: PageHeroProps) {
  return (
    <BrandSurface variant="sky" pattern={pattern} className="relative pt-32 pb-20 px-6 text-brand-navy">
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
        {/* Eyebrow with flanking lines */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-8 bg-brand-navy/30" />
          <span className="label-vintage text-brand-navy/65 text-[11px] tracking-[0.25em] uppercase">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-brand-navy/30" />
        </div>

        <h1 className="heading-display text-5xl md:text-7xl text-balance mb-5 leading-[0.9]">{title}</h1>

        <p className="text-brand-navy/65 text-base md:text-lg leading-relaxed max-w-lg mx-auto text-pretty">
          {subtitle}
        </p>
      </div>
    </BrandSurface>
  )
}
