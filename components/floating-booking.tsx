'use client'

import { useState, useEffect } from 'react'
import { IconCalendar, IconX, tablerProps } from '@/lib/site/icons'
import { cn } from '@/lib/utils'
import { BookingWizard } from '@/components/booking-wizard'

export function FloatingBooking() {
  const [open, setOpen] = useState(false)

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ── FAB trigger button ─────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Tafel reserveren"
        className={cn(
          'fixed z-40 flex items-center gap-2.5 transition-all duration-300',
          // Desktop: bottom-right pill
          'bottom-6 right-6',
          // Layout: pill shape with icon + label
          'bg-brand-navy text-white shadow-xl shadow-brand-navy/30',
          'px-5 py-3.5 rounded-full',
          'hover:bg-primary hover:shadow-primary/30 hover:scale-105 active:scale-95',
          // Hide when panel is open
          open && 'opacity-0 pointer-events-none scale-90',
        )}
      >
        <IconCalendar {...tablerProps(18)} />
        <span className="font-display uppercase tracking-widest text-[11px]">Reserveer</span>
      </button>

      {/* ── Backdrop ───────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden
      />

      {/* ── Sliding panel ──────────────────────────────────────── */}
      {/*
        Mobile  : full-width, slides up from bottom (translate-y)
        Desktop : fixed-width 440px panel, anchored bottom-right
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reserveer een tafel"
        className={cn(
          'fixed z-50 bg-white flex flex-col transition-transform duration-300 ease-out',
          // Mobile: full width, slides up from bottom
          'inset-x-0 bottom-0 rounded-t-3xl max-h-[92dvh]',
          // Desktop override: fixed width panel, bottom-right
          'sm:inset-x-auto sm:right-6 sm:bottom-6 sm:rounded-3xl sm:w-[440px] sm:max-h-[88dvh]',
          // Shadow
          'shadow-2xl shadow-black/20',
          // Open/closed transform
          open
            ? 'translate-y-0'
            : 'translate-y-[110%]',
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4 border-b border-border/60 shrink-0">
          {/* Drag handle — mobile only */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border sm:hidden" aria-hidden />

          <div>
            <p className="label-vintage text-primary text-[10px] tracking-[0.25em] uppercase mb-0.5">
              Direct boeken
            </p>
            <h2 className="heading-typewriter text-lg text-brand-navy leading-tight">
              Reserveer een tafel
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Sluiten"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card hover:bg-primary/5 hover:border-primary/30 transition-colors shrink-0"
          >
            <IconX {...tablerProps(16)} className="text-brand-navy" />
          </button>
        </div>

        {/* Scrollable wizard body */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-5 sm:px-6 py-5 sm:py-6">
          {/* Only render wizard when open — resets state on close */}
          {open && <BookingWizard mode="compact" />}
        </div>
      </div>
    </>
  )
}
