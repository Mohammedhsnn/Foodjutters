import { BrandWordmark } from '@/components/brand-wordmark'
import { SailorsIllustration } from '@/components/sailors-illustration'
import { cn } from '@/lib/utils'

type HeroLogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

export function HeroLogo({ variant = 'dark', className }: HeroLogoProps) {
  return (
    <div className={cn('flex flex-col items-center text-center gap-3 md:gap-4', className)}>
      <SailorsIllustration
        className={variant === 'light' ? 'text-white' : 'text-brand-navy'}
      />
      <BrandWordmark size="hero" variant={variant} />
      <p
        className={cn(
          'label-vintage text-base md:text-lg mt-1',
          variant === 'light' ? 'text-white/90' : 'text-brand-navy/85'
        )}
      >
        Paviljoen aan de Schelde
      </p>
    </div>
  )
}
