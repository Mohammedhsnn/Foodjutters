import { NextResponse } from 'next/server'
import type { MenuSection } from '@/lib/admin/types'
import {
  getMenuSections,
  newMenuSectionId,
  saveMenuSection,
} from '@/lib/admin/store'

export async function GET() {
  const sections = await getMenuSections()
  return NextResponse.json({ sections })
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<MenuSection>
  const section: MenuSection = {
    id: body.id ?? newMenuSectionId(),
    title: body.title?.trim() || 'Nieuwe categorie',
    subtitle: body.subtitle?.trim() || '',
    items: body.items ?? [],
    sortOrder: body.sortOrder ?? 99,
  }
  const saved = await saveMenuSection(section)
  return NextResponse.json({ section: saved }, { status: 201 })
}
