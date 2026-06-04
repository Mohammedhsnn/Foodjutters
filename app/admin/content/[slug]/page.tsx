'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminError, AdminLoading } from '@/components/admin/admin-states'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { ContentBlock, ContentPage } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function AdminContentEditPage() {
  const params = useParams()
  const slug = params.slug as string
  const [page, setPage] = useState<ContentPage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await adminFetch<{ page: ContentPage }>(`/api/admin/content/${slug}`)
      setPage(data.page)
    } catch (e) {
      setPage(null)
      setError(e instanceof ApiError ? e.message : 'Laden mislukt')
    }
  }, [slug])

  useEffect(() => {
    load()
  }, [load])

  async function handleSave() {
    if (!page) return
    setSaving(true)
    try {
      const data = await adminFetch<{ page: ContentPage }>(`/api/admin/content/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(page),
      })
      setPage(data.page)
      toast.success('Content opgeslagen')
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  function updateHero(field: keyof ContentPage['hero'], value: string) {
    if (!page) return
    setPage({ ...page, hero: { ...page.hero, [field]: value } })
  }

  function updateMeta(index: number, field: 'label' | 'value', value: string) {
    if (!page) return
    const meta = [...page.hero.meta]
    meta[index] = { ...meta[index], [field]: value }
    setPage({ ...page, hero: { ...page.hero, meta } })
  }

  function addMeta() {
    if (!page) return
    setPage({
      ...page,
      hero: { ...page.hero, meta: [...page.hero.meta, { label: '', value: '' }] },
    })
  }

  function removeMeta(index: number) {
    if (!page) return
    setPage({
      ...page,
      hero: { ...page.hero, meta: page.hero.meta.filter((_, i) => i !== index) },
    })
  }

  function updateBlock(index: number, field: keyof ContentBlock, value: string) {
    if (!page) return
    const blocks = [...page.blocks]
    blocks[index] = { ...blocks[index], [field]: value }
    setPage({ ...page, blocks })
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/content">
            <ArrowLeft className="size-4" /> Terug
          </Link>
        </Button>
        <AdminError message={error} onRetry={load} />
      </div>
    )
  }

  if (!page) return <AdminLoading label="Pagina laden…" />

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/content">
            <ArrowLeft className="size-4" /> Terug naar overzicht
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="ml-auto sm:ml-0">
          <Link href={page.path} target="_blank">
            Live pagina
          </Link>
        </Button>
      </div>

      <AdminPageHeader
        title={page.name}
        description={`Pad: ${page.path} · Slug: ${page.slug}`}
        actions={
          <Button onClick={handleSave} disabled={saving} className="rounded-full">
            <Save className="size-4" />
            {saving ? 'Opslaan…' : 'Opslaan'}
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="heading-display text-lg text-brand-navy">Hero</CardTitle>
          <CardDescription>Bovenste sectie van de pagina (PageHero)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="eyebrow">Eyebrow</Label>
              <Input
                id="eyebrow"
                value={page.hero.eyebrow}
                onChange={(e) => updateHero('eyebrow', e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={page.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="subtitle">Ondertitel</Label>
              <Textarea
                id="subtitle"
                rows={3}
                value={page.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Label>Meta-regels</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMeta}>
                <Plus className="size-3.5" /> Regel
              </Button>
            </div>
            {page.hero.meta.map((m, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Label"
                  value={m.label}
                  onChange={(e) => updateMeta(i, 'label', e.target.value)}
                  className="sm:flex-1"
                />
                <Input
                  placeholder="Waarde"
                  value={m.value}
                  onChange={(e) => updateMeta(i, 'value', e.target.value)}
                  className="sm:flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeMeta(i)}
                  aria-label="Verwijder meta-regel"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="heading-display text-lg text-brand-navy">Contentblokken</CardTitle>
          <CardDescription>Aanvullende teksten voor deze pagina</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {page.blocks.map((block, i) => (
            <div key={block.id} className="space-y-2 rounded-lg border border-border/70 p-4">
              <Label>{block.label}</Label>
              {block.type === 'textarea' || block.type === 'json' ? (
                <Textarea
                  rows={block.type === 'json' ? 8 : 4}
                  value={block.value}
                  onChange={(e) => updateBlock(i, 'value', e.target.value)}
                  className={block.type === 'json' ? 'font-mono text-xs' : undefined}
                />
              ) : (
                <Input
                  value={block.value}
                  onChange={(e) => updateBlock(i, 'value', e.target.value)}
                />
              )}
            </div>
          ))}
          {page.blocks.length === 0 ? (
            <p className="text-sm text-muted-foreground">Geen extra blokken voor deze pagina.</p>
          ) : null}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          <Save className="size-4" />
          {saving ? 'Opslaan…' : 'Wijzigingen opslaan'}
        </Button>
      </div>
    </div>
  )
}
