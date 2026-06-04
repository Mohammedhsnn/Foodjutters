'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Pencil } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminEmpty, AdminError, AdminLoading } from '@/components/admin/admin-states'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { ContentPage } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

export default function AdminContentListPage() {
  const [pages, setPages] = useState<ContentPage[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const load = useCallback(async () => {
    setError(null)
    try {
      const data = await adminFetch<{ pages: ContentPage[] }>('/api/admin/content')
      setPages(data.pages)
    } catch (e) {
      setPages(null)
      setError(e instanceof ApiError ? e.message : 'Laden mislukt')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered =
    pages?.filter((p) => {
      const q = query.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.path.toLowerCase().includes(q)
      )
    }) ?? []

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Contentbeheer"
        title="Pagina's"
        description="Beheer hero-teksten, meta-informatie en contentblokken per websitepagina."
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Input
          placeholder="Zoek op naam of pad…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm bg-card"
          aria-label="Zoek pagina's"
        />
      </div>

      {error ? <AdminError message={error} onRetry={load} /> : null}
      {!error && pages === null ? <AdminLoading /> : null}
      {!error && pages && filtered.length === 0 ? (
        <AdminEmpty
          title="Geen pagina's gevonden"
          description={query ? 'Pas uw zoekopdracht aan.' : 'Er zijn nog geen contentpaginas.'}
        />
      ) : null}

      {!error && pages && filtered.length > 0 ? (
        <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pagina</TableHead>
                  <TableHead className="hidden sm:table-cell">Pad</TableHead>
                  <TableHead className="hidden md:table-cell">Laatst bijgewerkt</TableHead>
                  <TableHead className="text-right">Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((page) => (
                  <TableRow key={page.slug}>
                    <TableCell>
                      <div className="min-w-0">
                        <p className="font-medium text-brand-navy">{page.name}</p>
                        <p className="text-xs text-muted-foreground truncate sm:hidden">
                          {page.path}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {page.path}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-xs">
                      {new Date(page.updatedAt).toLocaleString('nl-NL', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href={page.path} target="_blank" aria-label="Bekijk live">
                            <ExternalLink className="size-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/content/${page.slug}`}>
                            <Pencil className="size-3.5" />
                            Bewerken
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : null}
    </div>
  )
}
