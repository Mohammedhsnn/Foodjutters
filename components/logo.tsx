import Image from 'next/image'
import { BrandWordmark } from '@/components/brand-wordmark'
import { cn } from '@/lib/utils'

type LogoProps = {
  size?: 'sm' | 'md' | 'hero'
  layout?: 'stack' | 'row'
  variant?: 'dark' | 'light'
  className?: string
}

const MARK = { width: 159, height: 100 } as const

const markSize = {
  sm: { stack: 'h-11', row: 'h-9 max-w-[5.5rem]' },
  md: { stack: 'h-12', row: 'h-10 max-w-[6rem]' },
  hero: { stack: 'h-[6.25rem] sm:h-24 md:h-28', row: 'h-20' },
} as const

const wordmarkSize = {
  sm: 'sm',
  md: 'md',
  hero: 'hero',
} as const

/** Beeldmerk (PNG) + FoodJutters (Steelworks) */
export function Logo({
  size = 'sm',
  layout = 'row',
  variant = 'dark',
  className,
}: LogoProps) {
  const onDark = variant === 'light'
  const stacked = layout === 'stack'
  const wmSize = wordmarkSize[size]

  return (
    <span
      className={cn(
        'leading-none shrink-0',
        stacked
          ? 'inline-flex flex-col items-center gap-2 sm:gap-1.5'
          : 'inline-flex items-center gap-2.5',
        className
      )}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        aria-hidden
        width={MARK.width}
        height={MARK.height}
        unoptimized
        className={cn(
          'block w-auto object-contain',
          markSize[size][stacked ? 'stack' : 'row'],
          stacked && 'mx-auto',
          onDark && 'brightness-0 invert'
        )}
        style={{ width: 'auto' }}
        priority
      />
      <BrandWordmark
        size={wmSize}
        variant={variant}
        className={stacked ? 'mx-auto' : undefined}
      />
    </span>
  )
}
