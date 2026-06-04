import { cn } from '@/lib/utils'

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
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>{pattern}</span>
          ))}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
