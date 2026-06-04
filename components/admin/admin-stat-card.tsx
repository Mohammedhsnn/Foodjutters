import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminStatCard({
  label,
  value,
  hint,
  icon: Icon,
  className,
}: {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-brand-navy">{value}</p>
          {hint ? (
            <p className="mt-1 text-xs text-muted-foreground truncate">{hint}</p>
          ) : null}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </div>
      </div>
    </div>
  )
}
