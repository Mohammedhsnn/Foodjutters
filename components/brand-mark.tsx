import { cn } from '@/lib/utils'

type BrandMarkProps = {
  className?: string
  size?: number
}

/** Gecodeerd rond beeldmerk — geen afbeelding */
export function BrandMark({ className, size = 40 }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path
        id="mark-top"
        d="M 18 50 A 32 32 0 0 1 82 50"
        fill="none"
      />
      <text fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="2">
        <textPath href="#mark-top" startOffset="50%" textAnchor="middle">
          FOOD
        </textPath>
      </text>
      <path id="mark-bottom" d="M 82 50 A 32 32 0 0 1 18 50" fill="none" />
      <text fill="currentColor" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
        <textPath href="#mark-bottom" startOffset="50%" textAnchor="middle">
          JUTTERS
        </textPath>
      </text>
      <circle cx="50" cy="52" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M46 48 L54 48 M50 44 L50 56 M47 56 L53 56"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
