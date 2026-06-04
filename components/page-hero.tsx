import { BrandSurface } from '@/components/brand-surface'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  pattern?: string
}

export function PageHero({ eyebrow, title, subtitle, pattern = 'SMULLEN' }: PageHeroProps) {
  return (
    <BrandSurface variant="sky" pattern={pattern} className="relative pt-28 pb-14 px-6 text-brand-navy">
      <svg
        className="absolute bottom-0 left-0 right-0 w-full z-10"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,48 L0,20 Q150,0 300,20 Q450,40 600,20 Q750,0 900,20 Q1050,40 1200,20 L1200,48 Z"
          fill="var(--color-background)"
        />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="label-vintage text-brand-navy/80 mb-3">{eyebrow}</p>
        <h1 className="heading-display text-4xl md:text-6xl text-balance mb-4">{title}</h1>
        <p className="text-brand-navy/70 text-base leading-relaxed max-w-xl mx-auto">{subtitle}</p>
      </div>
    </BrandSurface>
  )
}
