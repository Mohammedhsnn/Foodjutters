import { NextResponse } from 'next/server'
import type { ContentPage } from '@/lib/admin/types'
import { getContentPage, saveContentPage } from '@/lib/admin/store'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params
  const page = await getContentPage(slug)
  if (!page) {
    return NextResponse.json({ error: 'Pagina niet gevonden' }, { status: 404 })
  }
  return NextResponse.json({ page })
}

export async function PUT(request: Request, { params }: Params) {
  const { slug } = await params
  const existing = await getContentPage(slug)
  if (!existing) {
    return NextResponse.json({ error: 'Pagina niet gevonden' }, { status: 404 })
  }
  const body = (await request.json()) as ContentPage
  if (body.slug !== slug) {
    return NextResponse.json({ error: 'Slug komt niet overeen' }, { status: 400 })
  }
  const page = await saveContentPage(body)
  return NextResponse.json({ page })
}
