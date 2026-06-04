'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  GripVertical,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminError, AdminLoading } from '@/components/admin/admin-states'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { MenuItem, MenuSection } from '@/lib/admin/types'
import { newMenuItemId } from '@/lib/admin/ids'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AdminMenuSectionPage() {
  const params = useParams()
  const id = params.id as string
  const [section, setSection] = useState<MenuSection | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await adminFetch<{ section: MenuSection }>(`/api/admin/menu/${id}`)
      setSection(data.section)
    } catch (e) {
      setSection(null)
      setError(e instanceof ApiError ? e.message : 'Laden mislukt')
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  async function handleSave() {
    if (!section) return
    setSaving(true)
    try {
      const data = await adminFetch<{ section: MenuSection }>(`/api/admin/menu/${id}`, {
        method: 'PUT',
        body: JSON.stringify(section),
      })
      setSection(data.section)
      toast.success('Menu opgeslagen')
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteSection() {
    setDeleting(true)
    try {
      await adminFetch(`/api/admin/menu/${id}`, { method: 'DELETE' })
      toast.success('Categorie verwijderd')
      window.location.href = '/admin/menu'
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Verwijderen mislukt')
      setDeleting(false)
    }
  }

  function updateItem(index: number, patch: Partial<MenuItem>) {
    if (!section) return
    const items = [...section.items]
    items[index] = { ...items[index], ...patch }
    setSection({ ...section, items })
  }

  function addItem() {
    if (!section) return
    const sortOrder = section.items.length
    const item: MenuItem = {
      id: newMenuItemId(),
      name: 'Nieuw gerecht',
      description: '',
      price: '0,00',
      available: true,
      sortOrder,
    }
    setSection({ ...section, items: [...section.items, item] })
  }

  function removeItem(index: number) {
    if (!section) return
    setSection({
      ...section,
      items: section.items.filter((_, i) => i !== index),
    })
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/menu">
            <ArrowLeft className="size-4" /> Terug
          </Link>
        </Button>
        <AdminError message={error} onRetry={load} />
      </div>
    )
  }

  if (!section) return <AdminLoading label="Categorie laden…" />

  return (
    <div className="space-y-6 pb-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/menu">
          <ArrowLeft className="size-4" /> Terug naar categorieën
        </Link>
      </Button>

      <AdminPageHeader
        title={section.title}
        description={`${section.items.length} gerechten in deze categorie`}
        actions={
          <div className="flex flex-wrap gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="size-4" /> Verwijderen
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Categorie verwijderen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Alle gerechten in &quot;{section.title}&quot; worden permanent verwijderd.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteSection}
                    disabled={deleting}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSave} disabled={saving} className="rounded-full">
              <Save className="size-4" />
              {saving ? 'Opslaan…' : 'Opslaan'}
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="heading-display text-lg text-brand-navy">Categorie</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="subtitle">Ondertitel</Label>
            <Input
              id="subtitle"
              value={section.subtitle}
              onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort">Sorteervolgorde</Label>
            <Input
              id="sort"
              type="number"
              value={section.sortOrder}
              onChange={(e) =>
                setSection({ ...section, sortOrder: Number(e.target.value) || 0 })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="heading-display text-lg text-brand-navy">Gerechten</CardTitle>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="size-4" /> Gerecht
          </Button>
        </CardHeader>
        <CardContent className="p-0 sm:p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8" />
                  <TableHead>Naam</TableHead>
                  <TableHead className="hidden lg:table-cell">Omschrijving</TableHead>
                  <TableHead>Prijs</TableHead>
                  <TableHead>Beschikbaar</TableHead>
                  <TableHead className="text-right">Actie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-muted-foreground">
                      <GripVertical className="size-4" aria-hidden />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.name}
                        onChange={(e) => updateItem(index, { name: e.target.value })}
                        className="min-w-[140px]"
                      />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-xs">
                      <Textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateItem(index, { description: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.price}
                        onChange={(e) => updateItem(index, { price: e.target.value })}
                        className="w-24 tabular-nums"
                        aria-label="Prijs"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={(v) => updateItem(index, { available: v })}
                        aria-label={`${item.name} beschikbaar`}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeItem(index)}
                        aria-label="Verwijder gerecht"
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {section.items.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">
              Nog geen gerechten. Voeg een gerecht toe.
            </p>
          ) : null}

          {/* Mobile: description under table rows - show expanded cards on small screens */}
          <div className="lg:hidden divide-y divide-border/60 border-t border-border/80">
            {section.items.map((item, index) => (
              <div key={`m-${item.id}`} className="p-4 space-y-2">
                <Label className="text-xs text-muted-foreground">Omschrijving</Label>
                <Textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => updateItem(index, { description: e.target.value })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          <Save className="size-4" />
          Opslaan
        </Button>
      </div>
    </div>
  )
}
