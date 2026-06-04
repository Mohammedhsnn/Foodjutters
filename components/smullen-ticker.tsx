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
  <span className="mx-4 text-primary/40 font-display text-sm select-none" aria-hidden>·</span>
)

export function SmullenTicker({ className }: { className?: string }) {
  const items = PHRASES.flatMap((phrase, i) => [
    <span key={i} className="text-brand-navy/30 font-display uppercase text-sm tracking-[0.3em] whitespace-nowrap">
      {phrase}
    </span>,
    <span key={`sep-${i}`} aria-hidden>{SEPARATOR}</span>,
  ])

  return (
    <div className={`overflow-hidden border-y border-border bg-white py-3 ${className ?? ''}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items}
        {items}
      </div>
    </div>
  )
}
