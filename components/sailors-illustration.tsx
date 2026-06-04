import { cn } from '@/lib/utils'

/** Gestileerde jutters-koppen — puur SVG */
export function SailorsIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 72"
      className={cn('w-full max-w-[220px] h-auto', className)}
      aria-hidden
    >
      <g fill="currentColor">
        {/* Linker jutter met pet */}
        <ellipse cx="52" cy="58" rx="28" ry="8" opacity="0.15" />
        <path d="M28 58c0-18 12-32 24-32s24 14 24 32" />
        <path d="M36 26h32l4 8H32z" />
        <circle cx="52" cy="38" r="14" />
        <path d="M44 42c2 4 8 6 8 6s6-2 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Rechter jutter met muts */}
        <ellipse cx="148" cy="58" rx="28" ry="8" opacity="0.15" />
        <path d="M124 58c0-18 12-32 24-32s24 14 24 32" />
        <path d="M132 22c8-6 20-6 28 0l2 10h-32z" />
        <circle cx="148" cy="38" r="14" />
        <path d="M140 44c3 3 8 4 8 4s5-1 8-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  )
}
