import { IconPhoto, tablerProps } from '@/lib/site/icons'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt?: string
  className?: string
  index?: number
  onSelect?: () => void
}

export function GalleryTile({ src, alt, className, index = 0, onSelect }: Props) {
  const hasImage = Boolean(src)
  const interactive = Boolean(onSelect && hasImage)
  const label = alt || 'FoodJutters impressie'

  return (
    <div
      className={cn(
        'gallery-tile-rise group relative block w-full min-h-[120px] overflow-hidden rounded-lg bg-muted/40',
        className,
      )}
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      {hasImage ? (
        <>
          <img
            src={src}
            alt={label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {interactive ? (
            <button
              type="button"
              onClick={onSelect}
              className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-label={`${label}. Vergroten`}
            />
          ) : null}
        </>
      ) : (
        <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 p-4 text-brand-navy/35">
          <IconPhoto {...tablerProps(20)} className="text-primary/40" />
        </div>
      )}
    </div>
  )
}
