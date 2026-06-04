/** Horizontale SMULLEN-ticker — puur CSS */
export function SmullenTicker({ className }: { className?: string }) {
  const items = Array.from({ length: 14 }).map((_, i) => (
    <span key={i} className="mx-6 text-brand-navy/25 font-display uppercase text-sm tracking-[0.35em]">
      Proef het water
    </span>
  ))

  return (
    <div className={`overflow-hidden border-y border-border bg-white py-3 ${className ?? ''}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items}
        {items}
      </div>
    </div>
  )
}
