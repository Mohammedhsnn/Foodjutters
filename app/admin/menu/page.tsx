'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Utensils } from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminEmpty, AdminError, AdminLoading } from '@/components/admin/admin-states'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { MenuSection } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function AdminMenuPage() {
  const [sections, setSections] = useState<MenuSection[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [creating, setCreating] = useState(false)

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await adminFetch<{ sections: MenuSection[] }>('/api/admin/menu')
      setSections(data.sections)
    } catch (e) {
      setSections(null)
      setError(e instanceof ApiError ? e.message : 'Laden mislukt')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function addSection() {
    setCreating(true)
    try {
      const data = await adminFetch<{ section: MenuSection }>('/api/admin/menu', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Nieuwe categorie',
          subtitle: '',
          items: [],
          sortOrder: sections?.length ?? 0,
        }),
      })
      toast.success('Categorie aangemaakt')
      window.location.href = `/admin/menu/${data.section.id}`
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Aanmaken mislukt')
    } finally {
      setCreating(false)
    }
  }

  const filtered =
    sections?.filter((s) => {
      const q = query.toLowerCase()
      return (
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      )
    }) ?? []

  const totalItems = sections?.reduce((n, s) => n + s.items.length, 0) ?? 0

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Menu beheer"
        title="Categorieën"
        description={`${sections?.length ?? 0} categorieën · ${totalItems} gerechten`}
        actions={
          <Button
            onClick={addSection}
            disabled={creating}
            className="rounded-full"
          >
            <Plus className="size-4" />
            Nieuwe categorie
          </Button>
        }
      />

      <Input
        placeholder="Zoek categorie…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm bg-card"
        aria-label="Zoek categorie"
      />

      {error ? <AdminError message={error} onRetry={load} /> : null}
      {!error && sections === null ? <AdminLoading /> : null}
      {!error && sections && filtered.length === 0 ? (
        <AdminEmpty
          title="Geen categorieën"
          description="Maak een categorie aan om het menu te vullen."
          action={
            <Button onClick={addSection} disabled={creating} className="rounded-full">
              <Plus className="size-4" /> Eerste categorie
            </Button>
          }
        />
      ) : null}

      {!error && sections && filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((section) => {
            const available = section.items.filter((i) => i.available).length
            return (
              <Link
                key={section.id}
                href={`/admin/menu/${section.id}`}
                className="group rounded-xl border border-border/80 bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Utensils className="size-5" />
                  </div>
                  <Badge variant="secondary" className="shrink-0 tabular-nums">
                    {section.items.length} items
                  </Badge>
                </div>
                <h2 className="mt-4 font-semibold text-brand-navy group-hover:text-primary transition-colors">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{section.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-3">
                  {available} beschikbaar · ID: {section.id}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3">
                  <Pencil className="size-3.5" /> Beheren
                </span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
