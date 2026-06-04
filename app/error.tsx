'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error.digest ?? error.message, error)
  }, [error])

  const isConfig =
    error.message?.includes('DATABASE_URL') ||
    error.message?.includes('environment')

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4 py-16 bg-background">
      <Logo layout="stack" size="md" className="mb-6" />
      <p className="label-vintage text-primary text-[11px] tracking-[0.2em] uppercase mb-2">
        Er ging iets mis
      </p>
      <h1 className="heading-display text-2xl sm:text-3xl text-brand-navy text-center mb-3">
        Tijdelijk niet beschikbaar
      </h1>
      <p className="text-sm text-muted-foreground text-center max-w-md leading-relaxed mb-2">
        {isConfig
          ? 'De website kan de database niet bereiken. Controleer of DATABASE_URL (en overige env-vars) op Vercel zijn ingesteld.'
          : 'Er is een fout opgetreden bij het laden van deze pagina. Probeer het opnieuw.'}
      </p>
      {error.digest ? (
        <p className="text-xs text-muted-foreground/80 font-mono mb-6">
          Referentie: {error.digest}
        </p>
      ) : (
        <div className="mb-6" />
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={reset} className="rounded-full">
          Opnieuw proberen
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/">Naar home</Link>
        </Button>
      </div>
    </div>
  )
}
