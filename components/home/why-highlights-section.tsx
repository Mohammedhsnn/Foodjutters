import { BrandName } from '@/components/brand-name'

type Highlight = { icon: string; title: string; description: string }

export function WhyHighlightsSection({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-muted/30 border-y border-border/50 text-brand-navy">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-brand-navy mb-5 sm:mb-6 text-center sm:text-left">
          Waarom <BrandName className="text-primary" />?
        </h2>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border/60 bg-card/80 px-3 py-3 sm:px-3.5 sm:py-3.5"
            >
              <p className="font-display text-[11px] sm:text-xs uppercase tracking-wide text-brand-navy leading-snug">
                {item.title}
              </p>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
