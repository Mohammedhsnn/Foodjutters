/** Horizontale ticker met afwisselende frases */
const PHRASES = [
  'Proef het water',
  'Terras aan de Schelde',
  'Verse keuken',
  'Houtoven pizza\'s',
  'Gezellig tafelen',
  'Open wo t/m zo',
  'Borrelen & genieten',
  'Uitzicht over het water',
]

const SEPARATOR = (
  <span className="mx-5 sm:mx-6 text-primary/50 font-display text-base leading-none select-none" aria-hidden>·</span>
)

export function SmullenTicker({ className }: { className?: string }) {
  const items = PHRASES.flatMap((phrase, i) => [
    <span key={i} className="text-brand-navy/40 font-display uppercase text-[13px] sm:text-sm tracking-[0.28em] whitespace-nowrap">
      {phrase}
    </span>,
    <span key={`sep-${i}`} aria-hidden>{SEPARATOR}</span>,
  ])

  return (
    <div className={`overflow-hidden border-y border-border/70 bg-white py-4 sm:py-5 ${className ?? ''}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap items-center">
        {items}
        {items}
      </div>
    </div>
  )
}
