import { IconPhoto, tablerProps } from '@/lib/site/icons'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt?: string
  caption?: string
  className?: string
}

export function GalleryTile({ src, alt, caption, className }: Props) {
  const hasImage = Boolean(src)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-brand-blue-light/30 border border-border/50',
        className,
      )}
    >
      {hasImage ? (
        <>
          <img
            src={src}
            alt={alt || caption || 'FoodJutters impressie'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300"
            aria-hidden
          />
          {caption ? (
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-white/90 text-brand-dark text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                {caption}
              </span>
            </div>
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-wood-3/55 text-brand-navy/40 p-4">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/70 ring-1 ring-brand-navy/10">
            <IconPhoto {...tablerProps(22)} className="text-primary/60" />
          </div>
          <p className="font-serif text-[10px] sm:text-[11px] tracking-[0.16em] uppercase">Afbeelding volgt</p>
        </div>
      )}
    </div>
  )
}
