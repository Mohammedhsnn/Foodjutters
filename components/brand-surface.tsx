import { cn } from '@/lib/utils'

/** Genoeg tegels om ook na rotatie en op smalle schermen volledig te bedekken */
const WATERMARK_TILE_COUNT = 96

type BrandSurfaceProps = {
  children: React.ReactNode
  variant?: 'sky' | 'navy'
  /** Achtergrond-watermark zoals SMULLEN / PLANK op social */
  pattern?: string
  className?: string
}

export function BrandSurface({
  children,
  variant = 'sky',
  pattern,
  className,
}: BrandSurfaceProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        variant === 'sky' ? 'brand-surface-sky' : 'brand-surface-navy',
        className
      )}
    >
      {pattern && (
        <div className="brand-watermark text-current" aria-hidden>
          {Array.from({ length: WATERMARK_TILE_COUNT }).map((_, i) => (
            <span key={i}>{pattern}</span>
          ))}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
