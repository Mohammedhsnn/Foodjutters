'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconZoomIn,
  tablerProps,
} from '@/lib/site/icons'
import { MENU_CARD_PAGES, type MenuCardPage } from '@/lib/site/images'

type Props = {
  pages?: MenuCardPage[]
}

function MenuCardScroller({
  pages,
  onOpen,
}: {
  pages: MenuCardPage[]
  onOpen: (index: number) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el || el.clientWidth === 0) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIndex(Math.min(Math.max(index, 0), pages.length - 1))
  }, [pages.length])

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-[#f8f4ec] shadow-lg shadow-brand-navy/10">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pages.map((page, index) => (
            <button
              key={page.src}
              type="button"
              onClick={() => onOpen(index)}
              className="group relative min-w-full shrink-0 snap-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-label={`${page.alt}. Klik om groter te bekijken`}
            >
              <div className="relative aspect-[5/3] w-full">
                <Image
                  src={page.src}
                  alt={page.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div
                  className="absolute inset-0 bg-brand-navy/0 transition-colors duration-300 group-hover:bg-brand-navy/8"
                  aria-hidden
                />
                <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-sm opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <IconZoomIn {...tablerProps(18)} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {pages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex((activeIndex - 1 + pages.length) % pages.length)}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-sm hover:bg-white transition-colors"
              aria-label="Vorige pagina"
            >
              <IconChevronLeft {...tablerProps(18)} />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex((activeIndex + 1) % pages.length)}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-sm hover:bg-white transition-colors"
              aria-label="Volgende pagina"
            >
              <IconChevronRight {...tablerProps(18)} />
            </button>
          </>
        ) : null}
      </div>

      {pages.length > 1 ? (
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {pages.map((page, index) => (
              <button
                key={page.src}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={[
                  'h-2 rounded-full transition-all',
                  index === activeIndex
                    ? 'w-5 bg-primary'
                    : 'w-2 bg-brand-navy/20 hover:bg-brand-navy/35',
                ].join(' ')}
                aria-label={page.label}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            {pages[activeIndex]?.label} · swipe om te bladeren
          </p>
        </div>
      ) : null}
    </div>
  )
}

function MenuCardLightbox({
  pages,
  lightboxIndex,
  onClose,
  onPrev,
  onNext,
}: {
  pages: MenuCardPage[]
  lightboxIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const activePage = pages[lightboxIndex]

  return (
    <div
      className="fixed inset-0 z-[200] flex h-[100dvh] flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={activePage.alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-navy/92"
        onClick={onClose}
        aria-label="Sluiten"
      />

      <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-5">
        <p className="text-xs font-display uppercase tracking-[0.16em] text-white/60 truncate">
          {activePage.label}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
          aria-label="Sluiten"
        >
          <IconX {...tablerProps(20)} />
        </button>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-3 sm:px-6">
        <img
          src={activePage.src}
          alt={activePage.alt}
          className="max-h-[min(72dvh,900px)] w-full max-w-5xl object-contain"
        />
      </div>

      {pages.length > 1 ? (
        <div className="relative z-10 flex shrink-0 items-center justify-center gap-4 pb-5 pt-2 sm:pb-6">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
            aria-label="Vorige pagina"
          >
            <IconChevronLeft {...tablerProps(20)} />
          </button>
          <span className="text-xs text-white/50 tabular-nums">
            {lightboxIndex + 1} / {pages.length}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
            aria-label="Volgende pagina"
          >
            <IconChevronRight {...tablerProps(20)} />
          </button>
        </div>
      ) : (
        <div className="shrink-0 pb-5 sm:pb-6" aria-hidden />
      )}
    </div>
  )
}

export function MenuCardSection({ pages = MENU_CARD_PAGES }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [portalReady, setPortalReady] = useState(false)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return (current - 1 + pages.length) % pages.length
    })
  }, [pages.length])

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return (current + 1) % pages.length
    })
  }, [pages.length])

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return

    const scrollY = window.scrollY

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  const lightbox =
    portalReady && lightboxIndex !== null
      ? createPortal(
          <MenuCardLightbox
            pages={pages}
            lightboxIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />,
          document.body,
        )
      : null

  return (
    <>
      <section className="bg-background py-14 sm:py-16 md:py-20 px-4 sm:px-6 border-b border-border/60">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          <MenuCardScroller pages={pages} onOpen={setLightboxIndex} />

          <div className="text-center lg:text-left">
            <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-3">
              Menukaart
            </p>
            <h2 className="section-heading text-brand-dark text-balance mb-4">
              Wat staat er op tafel?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty max-w-md mx-auto lg:mx-0">
              Blader door onze menukaart of tik om groter te bekijken.
            </p>
          </div>
        </div>
      </section>

      {lightbox}
    </>
  )
}
