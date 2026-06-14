import { cn } from '@/lib/utils'
import { steelworksVintage } from '@/lib/fonts'

type BrandWordmarkProps = {
  size?: 'sm' | 'md' | 'lg' | 'hero'
  variant?: 'dark' | 'light'
  className?: string
}

const sizeClass = {
  sm: 'text-[1.15rem] sm:text-[1.25rem]',
  md: 'text-xl sm:text-2xl',
  lg: 'text-3xl sm:text-4xl',
  hero: 'text-[2.85rem] sm:text-[3.25rem] md:text-[4rem]',
} as const

/** FoodJutters in Steelworks Vintage Demo (geen CSS-uppercase — die breekt dit font) */
export function BrandWordmark({
  size = 'md',
  variant = 'dark',
  className,
}: BrandWordmarkProps) {
  return (
    <span
      className={cn(
        steelworksVintage.className,
        'font-brand normal-case leading-[0.92] tracking-normal whitespace-nowrap',
        sizeClass[size],
        variant === 'light' ? 'text-white' : 'text-brand-navy',
        className
      )}
    >
      FoodJutters
    </span>
  )
}
