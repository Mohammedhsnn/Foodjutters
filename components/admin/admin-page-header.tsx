import { cn } from '@/lib/utils'

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        {eyebrow ? (
          <p className="label-vintage text-primary text-[11px] tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="heading-display text-2xl sm:text-3xl text-brand-navy truncate">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>
      ) : null}
    </div>
  )
}
