import { cn } from '@/lib/utils'
import { steelworksVintage } from '@/lib/fonts'

type BrandNameProps = {
  variant?: 'dark' | 'light'
  className?: string
}

/** Merknaam in Steelworks Vintage Demo */
export function BrandName({ variant = 'dark', className }: BrandNameProps) {
  return (
    <span
      className={cn(
        steelworksVintage.className,
        'font-brand normal-case tracking-normal',
        variant === 'light' ? 'text-white' : 'text-brand-navy',
        className
      )}
    >
      FoodJutters
    </span>
  )
}
