'use client'

import { AlertCircle, Inbox, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { cn } from '@/lib/utils'

export function AdminLoading({ label = 'Gegevens laden…' }: { label?: string }) {
  return (
    <div
      className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-xl border border-border/80 bg-card/60 px-6 py-12"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function AdminEmpty({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <Empty className="min-h-[220px] rounded-xl border border-dashed border-border bg-card/40">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox className="size-5 text-primary" />
        </EmptyMedia>
        <EmptyTitle className="font-display uppercase tracking-wide text-brand-navy">
          {title}
        </EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}

export function AdminError({
  message,
  onRetry,
  className,
}: {
  message: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-destructive/25 bg-destructive/5 px-6 py-10 text-center',
        className,
      )}
      role="alert"
    >
      <AlertCircle className="size-8 text-destructive" aria-hidden />
      <div className="max-w-md space-y-1">
        <p className="font-semibold text-brand-navy">Er ging iets mis</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Opnieuw proberen
        </Button>
      ) : null}
    </div>
  )
}
