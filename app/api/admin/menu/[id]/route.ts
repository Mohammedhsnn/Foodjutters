import { NextResponse } from 'next/server'
import type { MenuSection } from '@/lib/admin/types'
import {
  deleteMenuSection,
  getMenuSection,
  saveMenuSection,
} from '@/lib/admin/store'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const section = await getMenuSection(id)
  if (!section) {
    return NextResponse.json({ error: 'Categorie niet gevonden' }, { status: 404 })
  }
  return NextResponse.json({ section })
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  const existing = await getMenuSection(id)
  if (!existing) {
    return NextResponse.json({ error: 'Categorie niet gevonden' }, { status: 404 })
  }
  const body = (await request.json()) as MenuSection
  if (body.id !== id) {
    return NextResponse.json({ error: 'ID komt niet overeen' }, { status: 400 })
  }
  const section = await saveMenuSection(body)
  return NextResponse.json({ section })
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  const ok = await deleteMenuSection(id)
  if (!ok) {
    return NextResponse.json({ error: 'Categorie niet gevonden' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
