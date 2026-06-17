import Link from 'next/link'
import { IconArrowRight, tablerProps } from '@/lib/site/icons'
import { PageHero } from '@/components/page-hero'
import { sanitizeVisibleCopy } from '@/lib/site/copy'
import { cn } from '@/lib/utils'

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

export type LegalSection = {
  id: string
  title: string
  blocks: LegalBlock[]
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === 'p') {
    return <p className="text-sm sm:text-[15px] text-foreground/70 leading-relaxed">{sanitizeVisibleCopy(block.text)}</p>
  }
  if (block.type === 'ul') {
    return (
      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-foreground/70 leading-relaxed">
        {block.items.map((item) => (
          <li key={item}>{sanitizeVisibleCopy(item)}</li>
        ))}
      </ul>
    )
  }
  return (
    <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-[15px] text-foreground/70 leading-relaxed">
      {block.items.map((item) => (
        <li key={item}>{sanitizeVisibleCopy(item)}</li>
      ))}
    </ol>
  )
}

export function LegalDocument({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  eyebrow: string
  title: string
  subtitle: string
  lastUpdated?: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 bg-background">
        <div className="max-w-3xl mx-auto">
          {lastUpdated ? (
            <p className="text-xs text-muted-foreground mb-8 sm:mb-10 text-center sm:text-left">
              Laatst bijgewerkt: {lastUpdated}
            </p>
          ) : null}

          <nav
            aria-label="Inhoudsopgave"
            className="mb-10 sm:mb-12 rounded-xl border border-border/80 bg-card/80 p-5 sm:p-6 shadow-sm"
          >
            <p className="font-display text-xs uppercase tracking-wide text-brand-navy mb-3">Inhoud</p>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-primary hover:underline underline-offset-2"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-10 sm:gap-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-border/60 pt-8 sm:pt-10 first:border-t-0 first:pt-0"
              >
                <h2 className="font-display text-lg sm:text-xl uppercase tracking-tight text-brand-dark mb-4 sm:mb-5">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {section.blocks.map((block, index) => (
                    <LegalBlockView key={`${section.id}-${index}`} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div
            className={cn(
              'mt-12 sm:mt-14 rounded-xl border border-border/80 bg-muted/30 p-5 sm:p-6',
              'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
            )}
          >
            <p className="text-sm text-foreground/65 leading-relaxed">
              Vragen over dit document? Neem gerust contact met ons op.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-colors"
            >
              Contact <IconArrowRight {...tablerProps(16)} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
