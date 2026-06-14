import { BrandName } from '@/components/brand-name'
import { BrandSurface } from '@/components/brand-surface'
import { resolveIcon } from '@/lib/cms/icons'
import { IconSunset2 } from '@/lib/site/icons'
import { cn } from '@/lib/utils'

type Highlight = { icon: string; title: string; description: string }

const layoutClass: Record<number, string> = {
  0: 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
  1: 'lg:col-span-1',
  2: 'lg:col-span-1',
  3: 'sm:col-span-2 lg:col-span-2',
}

export function WhyHighlightsSection({ highlights }: { highlights: Highlight[] }) {
  return (
    <BrandSurface
      variant="sky"
      pattern="BELEVING"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 text-brand-navy border-y border-primary/10"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 sm:mb-12 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10">
          <div className="max-w-2xl">
            <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-3">
              Waarom <BrandName className="text-primary" />?
            </p>
            <h2 className="heading-display text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[0.92] text-balance">
              Een unieke beleving
            </h2>
          </div>
          <p className="text-foreground/60 text-sm sm:text-[15px] leading-relaxed max-w-sm md:text-right md:pb-1">
            Terras, keuken en sfeer aan de Schelde — ontdek wat FoodJutters bijzonder maakt.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto] gap-3 sm:gap-4">
          {highlights.map((item, index) => {
            const Icon = resolveIcon(item.icon, IconSunset2)
            const featured = index === 0
            const banner = index === 3

            return (
              <article
                key={item.title}
                className={cn(
                  'group relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300',
                  'hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5',
                  layoutClass[index] ?? '',
                  featured
                    ? 'border-primary/30 bg-gradient-to-br from-primary/12 via-card to-brand-blue-light/40 p-6 sm:p-8 min-h-[220px] lg:min-h-0'
                    : banner
                      ? 'border-border/70 bg-card/90 backdrop-blur-sm p-5 sm:p-6 sm:flex sm:items-center sm:gap-6'
                      : 'border-border/70 bg-card/90 backdrop-blur-sm p-5 sm:p-6',
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute select-none opacity-[0.07] text-primary',
                    featured ? '-right-4 -bottom-6' : banner ? 'right-4 top-1/2 -translate-y-1/2' : '-right-2 -bottom-3',
                  )}
                  aria-hidden
                >
                  <Icon size={featured ? 120 : banner ? 72 : 88} stroke={1} />
                </div>

                <div
                  className={cn(
                    'relative z-10 flex',
                    banner ? 'flex-col sm:flex-row sm:items-center sm:gap-5 w-full' : 'flex-col h-full',
                    featured && 'justify-between gap-6',
                  )}
                >
                  <div className={cn('flex items-start gap-4', banner && 'sm:shrink-0')}>
                    <div
                      className={cn(
                        'flex shrink-0 items-center justify-center rounded-2xl transition-colors duration-300',
                        'bg-white/80 shadow-sm ring-1 ring-primary/10 group-hover:bg-primary group-hover:ring-primary/30',
                        featured ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-11 w-11',
                      )}
                    >
                      <Icon
                        size={featured ? 22 : 18}
                        className="text-primary transition-colors group-hover:text-white"
                      />
                    </div>
                    {banner ? (
                      <span className="label-vintage text-primary/50 text-[10px] tracking-[0.2em] mt-1 sm:hidden">
                        04
                      </span>
                    ) : null}
                  </div>

                  <div className={cn(featured ? 'mt-auto' : '', banner && 'sm:flex-1')}>
                    {!banner ? (
                      <span className="label-vintage text-primary/45 text-[10px] tracking-[0.22em] mb-2 block">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    ) : null}
                    <h3
                      className={cn(
                        'font-display uppercase tracking-wide text-brand-navy leading-snug',
                        featured
                          ? 'text-base sm:text-lg mb-2 sm:mb-3'
                          : banner
                            ? 'text-sm sm:text-base mb-1 sm:mb-0'
                            : 'text-sm mb-1.5',
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        'text-muted-foreground leading-relaxed',
                        featured ? 'text-sm sm:text-[15px] max-w-[32ch]' : 'text-xs sm:text-sm',
                        banner && 'sm:max-w-none',
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </BrandSurface>
  )
}
