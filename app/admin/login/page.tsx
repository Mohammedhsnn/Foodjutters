'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminFetch, ApiError } from '@/lib/admin/api'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await adminFetch('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      toast.success('Welkom terug')
      const from = searchParams.get('from') || '/admin'
      router.push(from.startsWith('/admin') ? from : '/admin')
      router.refresh()
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Inloggen mislukt'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4 py-12 bg-wood-4">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card/95 backdrop-blur-sm shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo layout="stack" size="md" className="mb-4" />
          <p className="label-vintage text-primary text-[11px] tracking-[0.2em] uppercase mb-2">
            Beheeromgeving
          </p>
          <h1 className="heading-display text-2xl text-brand-navy">Admin login</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Log in om content, menu en reserveringen te beheren.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Wachtwoord</Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={loading}>
            {loading ? 'Bezig…' : 'Inloggen'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-svh flex items-center justify-center text-muted-foreground text-sm">
          Laden…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
