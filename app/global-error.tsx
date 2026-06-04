'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error.digest ?? error.message, error)
  }, [error])

  return (
    <html lang="nl">
      <body className="min-h-svh flex flex-col items-center justify-center px-4 py-16 bg-[#f4fafd] text-[#1b4364] font-sans antialiased">
        <p className="text-xs uppercase tracking-[0.2em] text-[#29abe2] mb-2">FoodJutters</p>
        <h1 className="text-2xl font-semibold mb-3">Website tijdelijk offline</h1>
        <p className="text-sm text-center max-w-md opacity-70 mb-2 leading-relaxed">
          Serverconfiguratie ontbreekt of de database is niet bereikbaar. Zet op Vercel minimaal
          DATABASE_URL, ADMIN_PASSWORD en ADMIN_SESSION_SECRET.
        </p>
        {error.digest ? (
          <p className="text-xs font-mono opacity-50 mb-6">Error {error.digest}</p>
        ) : (
          <div className="mb-6" />
        )}
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#29abe2] text-white px-6 py-3 text-sm font-medium hover:opacity-90"
        >
          Opnieuw proberen
        </button>
      </body>
    </html>
  )
}
