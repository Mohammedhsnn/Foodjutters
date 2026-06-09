'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconStarFilled,
  IconToolsKitchen2,
  IconWaveSine,
  tablerProps,
} from '@/lib/site/icons'
import { cn } from '@/lib/utils'

const CARD_COUNT = 4
/** Scroll distance per card — page scroll is consumed here before the next section */
const SCROLL_VH_PER_CARD = 100

type CardTheme = 'water' | 'kitchen' | 'reviews' | 'hours'

type StatCard = {
  theme: CardTheme
  stat: string
  title: string
  body: string
  icon: typeof IconWaveSine
}

type Props = {
  years: string
  categoryCount: number
  rating: string
  hours: string
  hoursLabel: string
  children: ReactNode
}

export function WelcomeStatsShowcase({
  years,
  categoryCount,
  rating,
  hours,
  hoursLabel,
  children,
}: Props) {
  const scrollTrackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollUnlocked, setScrollUnlocked] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  const cards = useMemo<StatCard[]>(
    () => [
      {
        theme: 'water',
        stat: years,
        title: 'Jaar aan het water',
        body: 'Al jarenlang uw vaste adres aan de Schelde — waar vertrouwen, terras en gezelligheid samenkomen.',
        icon: IconWaveSine,
      },
      {
        theme: 'kitchen',
        stat: String(categoryCount),
        title: 'Smaken om te ontdekken',
        body: `Van borrel tot dessert — ${categoryCount} menuwerelden, één keuken met passie en seizoensinvloeden.`,
        icon: IconToolsKitchen2,
      },
      {
        theme: 'reviews',
        stat: rating,
        title: 'Hartelijk beoordeeld',
        body: 'Gasten waarderen onze sfeer, service en gerechten. Een plek waar mensen graag terugkomen.',
        icon: IconStarFilled,
      },
      {
        theme: 'hours',
        stat: hours,
        title: 'Open wanneer u wilt',
        body: hoursLabel,
        icon: IconClock,
      },
    ],
    [years, categoryCount, rating, hours, hoursLabel],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const syncFromScroll = useCallback(() => {
    const el = scrollTrackRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollable = el.offsetHeight - window.innerHeight

    if (scrollable <= 0) {
      setActiveIndex(0)
      setScrollUnlocked(true)
      return
    }

    if (rect.top > 0) {
      setActiveIndex(0)
      setScrollUnlocked(false)
      return
    }

    if (rect.bottom <= window.innerHeight + 2) {
      setActiveIndex(CARD_COUNT - 1)
      setScrollUnlocked(true)
      return
    }

    const scrolled = Math.max(0, Math.min(scrollable, -rect.top))
    const segment = scrollable / CARD_COUNT
    const index = Math.min(CARD_COUNT - 1, Math.floor(scrolled / segment))
    setActiveIndex(index)
    setScrollUnlocked(index >= CARD_COUNT - 1 && scrolled >= scrollable - segment * 0.35)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    syncFromScroll()
    window.addEventListener('scroll', syncFromScroll, { passive: true })
    window.addEventListener('resize', syncFromScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', syncFromScroll)
      window.removeEventListener('resize', syncFromScroll)
    }
  }, [syncFromScroll, reducedMotion])

  useEffect(() => {
    if (!emblaApi || !reducedMotion) return
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, reducedMotion])

  const scrollToCard = useCallback((index: number) => {
    const el = scrollTrackRef.current
    if (!el || reducedMotion) return
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return
    const segment = scrollable / CARD_COUNT
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + segment * index + 2, behavior: 'smooth' })
  }, [reducedMotion])

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(CARD_COUNT - 1, index))
      if (reducedMotion) {
        setActiveIndex(next)
        emblaApi?.scrollTo(next)
        return
      }
      scrollToCard(next)
    },
    [emblaApi, reducedMotion, scrollToCard],
  )

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current || reducedMotion) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
    goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1)
  }

  const scrollTrackHeight = reducedMotion
    ? undefined
    : `${CARD_COUNT * SCROLL_VH_PER_CARD}vh`

  return (
    <section
      id="welcome-foodjutters"
      className="relative bg-background py-14 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24 lg:self-start">{children}</div>

          <div className="w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
            <div
              ref={scrollTrackRef}
              className="relative"
              style={{ height: scrollTrackHeight }}
            >
              <div
                className={cn(
                  'w-full',
                  !reducedMotion && 'sticky top-[10vh] sm:top-[12vh] lg:top-28',
                )}
              >
                {reducedMotion ? (
                  <SwipeCarousel cards={cards} emblaRef={emblaRef} />
                ) : (
                  <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[min(520px,72svh)] mx-auto">
                      {cards.map((card, index) => (
                        <StatCardVisual
                          key={card.theme}
                          card={card}
                          active={index === activeIndex}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <CardProgress
                  count={CARD_COUNT}
                  activeIndex={activeIndex}
                  unlocked={scrollUnlocked}
                  onSelect={goTo}
                  onPrev={() => goTo(activeIndex - 1)}
                  onNext={() => goTo(activeIndex + 1)}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCardVisual({
  card,
  active,
  mode = 'stack',
}: {
  card: StatCard
  active: boolean
  mode?: 'stack' | 'slide'
}) {
  const Icon = card.icon

  return (
    <article
      aria-hidden={mode === 'stack' ? !active : false}
      className={cn(
        'rounded-3xl overflow-hidden border shadow-xl',
        mode === 'stack' && 'absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        mode === 'stack' &&
          (active
            ? 'opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto'
            : 'opacity-0 translate-y-6 scale-[0.97] z-0 pointer-events-none'),
        mode === 'slide' && 'relative h-full w-full',
        card.theme === 'water' &&
          'border-white/15 bg-gradient-to-br from-brand-navy via-[#1e5a7a] to-primary text-white shadow-brand-navy/25',
        card.theme === 'kitchen' && 'border-primary/20 bg-card text-brand-navy shadow-primary/10',
        card.theme === 'reviews' &&
          'border-brand-sand/50 bg-gradient-to-br from-[#faf6ee] via-card to-brand-blue-light/40 text-brand-navy shadow-brand-sand/20',
        card.theme === 'hours' &&
          'border-primary/25 bg-gradient-to-tr from-brand-blue-light/80 via-card to-white text-brand-navy shadow-primary/15',
      )}
    >
      {card.theme === 'water' ? (
        <div
          className="absolute -right-8 -bottom-10 opacity-[0.14] pointer-events-none"
          aria-hidden
        >
          <IconWaveSine {...tablerProps(160)} />
        </div>
      ) : null}

      {card.theme === 'kitchen' ? (
        <div
          className="absolute inset-0 opacity-[0.07] bg-wood-plank pointer-events-none"
          aria-hidden
        />
      ) : null}

      <div className="relative h-full flex flex-col justify-between p-6 sm:p-7 md:p-8">
        <div className="flex justify-end">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
              card.theme === 'water' ? 'bg-white/15' : 'bg-primary/10',
            )}
          >
            <Icon
              {...tablerProps(22)}
              className={card.theme === 'water' ? 'text-white' : 'text-primary'}
            />
          </div>
        </div>

        <div>
          <p
            className={cn(
              'heading-display leading-[0.9] mb-2 sm:mb-3',
              card.theme === 'water' ? 'text-6xl sm:text-7xl text-white' : 'text-5xl sm:text-6xl text-primary',
            )}
          >
            {card.stat}
          </p>
          <h3
            className={cn(
              'font-display uppercase tracking-wide text-sm sm:text-base mb-2 sm:mb-3',
              card.theme === 'water' ? 'text-white' : 'text-brand-navy',
            )}
          >
            {card.title}
          </h3>
          <p
            className={cn(
              'text-sm leading-relaxed text-pretty max-w-[28ch]',
              card.theme === 'water' ? 'text-white/80' : 'text-foreground/65',
            )}
          >
            {card.body}
          </p>
        </div>

        {card.theme === 'reviews' ? (
          <div className="flex gap-1 text-primary" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStarFilled key={i} {...tablerProps(14)} />
            ))}
          </div>
        ) : (
          <div className="h-3.5" aria-hidden />
        )}
      </div>
    </article>
  )
}

function SwipeCarousel({
  cards,
  emblaRef,
}: {
  cards: StatCard[]
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
}) {
  return (
    <div ref={emblaRef} className="overflow-hidden -mx-1 px-1 touch-pan-y">
      <div className="flex gap-3">
        {cards.map((card) => (
          <div key={card.theme} className="min-w-[88%] sm:min-w-[80%] shrink-0">
            <div className="relative aspect-[4/5] sm:aspect-square max-h-[min(480px,70svh)]">
              <StatCardVisual card={card} active mode="slide" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CardProgress({
  count,
  activeIndex,
  unlocked,
  onSelect,
  onPrev,
  onNext,
  reducedMotion,
}: {
  count: number
  activeIndex: number
  unlocked: boolean
  onSelect: (i: number) => void
  onPrev: () => void
  onNext: () => void
  reducedMotion: boolean
}) {
  return (
    <>
      <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={activeIndex === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card text-brand-navy transition-colors hover:border-primary/40 hover:bg-brand-blue-light/50 disabled:opacity-35 disabled:pointer-events-none"
          aria-label="Vorige kaart"
        >
          <IconChevronLeft {...tablerProps(18)} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Statistieken">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Kaart ${i + 1} van ${count}`}
              onClick={() => onSelect(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === activeIndex ? 'w-7 bg-primary' : 'w-2 bg-border hover:bg-primary/40',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={activeIndex === count - 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card text-brand-navy transition-colors hover:border-primary/40 hover:bg-brand-blue-light/50 disabled:opacity-35 disabled:pointer-events-none"
          aria-label="Volgende kaart"
        >
          <IconChevronRight {...tablerProps(18)} />
        </button>
      </div>

      {!reducedMotion ? (
        <p className="mt-4 text-center text-[11px] text-muted-foreground tracking-wide">
          {unlocked ? (
            <>Scroll verder naar het volgende onderdeel</>
          ) : (
            <>Scroll om de volgende kaart te zien</>
          )}
        </p>
      ) : null}
    </>
  )
}
