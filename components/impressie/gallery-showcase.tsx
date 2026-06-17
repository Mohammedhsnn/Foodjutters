'use client'

import { useCallback, useEffect, useState } from 'react'
import { IconChevronLeft, IconChevronRight, IconX, tablerProps } from '@/lib/site/icons'
import type { SiteGalleryItem } from '@/lib/site/images'
import { GalleryTile } from './gallery-tile'

type Props = {
  items: SiteGalleryItem[]
  intro?: string
}

export function GalleryShowcase({ items, intro }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback(
    (item: SiteGalleryItem) => {
      const index = items.findIndex((entry) => entry.src === item.src)
      if (index >= 0) setLightboxIndex(index)
    },
    [items],
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return (current - 1 + items.length) % items.length
    })
  }, [items.length])

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return (current + 1) % items.length
    })
  }, [items.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <>
      {intro ? (
        <p className="mx-auto mb-8 max-w-xl text-center text-sm text-muted-foreground leading-relaxed text-pretty sm:mb-10">
          {intro}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-3">
        {items.map((item, index) => (
          <GalleryTile
            key={item.src}
            src={item.src}
            alt={item.alt}
            index={index}
            onSelect={() => openLightbox(item)}
            className="aspect-square w-full"
          />
        ))}
      </div>

      {activeItem && lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
        >
          <button
            type="button"
            className="absolute inset-0 bg-brand-navy/90"
            onClick={closeLightbox}
            aria-label="Sluiten"
          />
          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-10 right-0 flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
              aria-label="Sluiten"
            >
              <IconX {...tablerProps(20)} />
            </button>

            <img
              src={activeItem.src}
              alt={activeItem.alt}
              className="max-h-[min(80vh,760px)] w-full rounded-lg object-contain"
            />

            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                onClick={showPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Vorige foto"
              >
                <IconChevronLeft {...tablerProps(20)} />
              </button>
              <span className="text-xs text-white/50 tabular-nums">
                {lightboxIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={showNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Volgende foto"
              >
                <IconChevronRight {...tablerProps(20)} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
