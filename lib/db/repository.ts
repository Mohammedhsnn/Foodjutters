import { asc, desc, eq } from 'drizzle-orm'
import { db } from './index'
import {
  contentBlocks,
  contentPages,
  menuItems,
  menuSections,
  reservations,
  siteSettings,
} from './schema'
import type {
  ContentBlock,
  ContentPage,
  ContentPageSummary,
  MenuItem,
  MenuSection,
  MenuSectionSummary,
  Reservation,
} from '@/lib/admin/types'

// ── Site settings ────────────────────────────────────────────────

export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteSettings)
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}

export async function getSiteSetting(key: string, fallback = ''): Promise<string> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1)
  return rows[0]?.value ?? fallback
}

// ── Content ──────────────────────────────────────────────────────

function mapBlockRow(r: typeof contentBlocks.$inferSelect): ContentBlock {
  return {
    id: r.id,
    key: r.key,
    label: r.label,
    type: r.type as ContentBlock['type'],
    value: r.value,
  }
}

async function allBlocksBySlug(): Promise<Map<string, ContentBlock[]>> {
  const rows = await db.select().from(contentBlocks)
  const map = new Map<string, ContentBlock[]>()
  for (const row of rows) {
    const list = map.get(row.pageSlug) ?? []
    list.push(mapBlockRow(row))
    map.set(row.pageSlug, list)
  }
  return map
}

function rowToContentPage(
  row: typeof contentPages.$inferSelect,
  blocks: ContentBlock[],
): ContentPage {
  return {
    slug: row.slug,
    name: row.name,
    path: row.path,
    hero: {
      eyebrow: row.heroEyebrow,
      title: row.heroTitle,
      subtitle: row.heroSubtitle,
      meta: row.heroMeta ?? [],
    },
    blocks,
    updatedAt: row.updatedAt.toISOString(),
  }
}

export async function getContentPagesSummary(): Promise<ContentPageSummary[]> {
  const pages = await db
    .select({
      slug: contentPages.slug,
      name: contentPages.name,
      path: contentPages.path,
      updatedAt: contentPages.updatedAt,
    })
    .from(contentPages)
    .orderBy(asc(contentPages.slug))
  return pages.map((p) => ({
    slug: p.slug,
    name: p.name,
    path: p.path,
    updatedAt: p.updatedAt.toISOString(),
  }))
}

export async function getContentPages(): Promise<ContentPage[]> {
  const [pages, blockMap] = await Promise.all([
    db.select().from(contentPages).orderBy(asc(contentPages.slug)),
    allBlocksBySlug(),
  ])
  return pages.map((p) => rowToContentPage(p, blockMap.get(p.slug) ?? []))
}

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  const rows = await db
    .select()
    .from(contentPages)
    .where(eq(contentPages.slug, slug))
    .limit(1)
  const row = rows[0]
  if (!row) return null
  const blockRows = await db
    .select()
    .from(contentBlocks)
    .where(eq(contentBlocks.pageSlug, slug))
  return rowToContentPage(row, blockRows.map(mapBlockRow))
}

export async function saveContentPage(page: ContentPage): Promise<ContentPage> {
  const updatedAt = new Date()
  await db
    .insert(contentPages)
    .values({
      slug: page.slug,
      name: page.name,
      path: page.path,
      heroEyebrow: page.hero.eyebrow,
      heroTitle: page.hero.title,
      heroSubtitle: page.hero.subtitle,
      heroMeta: page.hero.meta,
      updatedAt,
    })
    .onConflictDoUpdate({
      target: contentPages.slug,
      set: {
        name: page.name,
        path: page.path,
        heroEyebrow: page.hero.eyebrow,
        heroTitle: page.hero.title,
        heroSubtitle: page.hero.subtitle,
        heroMeta: page.hero.meta,
        updatedAt,
      },
    })

  await db.delete(contentBlocks).where(eq(contentBlocks.pageSlug, page.slug))
  if (page.blocks.length > 0) {
    await db.insert(contentBlocks).values(
      page.blocks.map((b) => ({
        id: b.id,
        pageSlug: page.slug,
        key: b.key,
        label: b.label,
        type: b.type,
        value: b.value,
      })),
    )
  }

  return {
    ...page,
    updatedAt: updatedAt.toISOString(),
  }
}

// ── Menu ─────────────────────────────────────────────────────────

function mapMenuItemRow(r: typeof menuItems.$inferSelect): MenuItem {
  return {
    id: r.id,
    name: r.name,
    description: r.description,
    price: r.price,
    available: r.available,
    sortOrder: r.sortOrder,
  }
}

async function allMenuItemsBySection(): Promise<Map<string, MenuItem[]>> {
  const rows = await db.select().from(menuItems).orderBy(asc(menuItems.sortOrder))
  const map = new Map<string, MenuItem[]>()
  for (const row of rows) {
    const list = map.get(row.sectionId) ?? []
    list.push(mapMenuItemRow(row))
    map.set(row.sectionId, list)
  }
  return map
}

export async function getMenuSectionsSummary(): Promise<MenuSectionSummary[]> {
  const [sections, items] = await Promise.all([
    db.select().from(menuSections).orderBy(asc(menuSections.sortOrder)),
    db
      .select({ sectionId: menuItems.sectionId, available: menuItems.available })
      .from(menuItems),
  ])
  const counts = new Map<string, { itemCount: number; availableCount: number }>()
  for (const item of items) {
    const current = counts.get(item.sectionId) ?? { itemCount: 0, availableCount: 0 }
    current.itemCount += 1
    if (item.available) current.availableCount += 1
    counts.set(item.sectionId, current)
  }
  return sections.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    sortOrder: s.sortOrder,
    itemCount: counts.get(s.id)?.itemCount ?? 0,
    availableCount: counts.get(s.id)?.availableCount ?? 0,
  }))
}

export async function getMenuSections(): Promise<MenuSection[]> {
  const [sections, itemMap] = await Promise.all([
    db.select().from(menuSections).orderBy(asc(menuSections.sortOrder)),
    allMenuItemsBySection(),
  ])
  return sections.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    sortOrder: s.sortOrder,
    items: itemMap.get(s.id) ?? [],
  }))
}

export async function getMenuSection(id: string): Promise<MenuSection | null> {
  const rows = await db
    .select()
    .from(menuSections)
    .where(eq(menuSections.id, id))
    .limit(1)
  const row = rows[0]
  if (!row) return null
  const itemRows = await db
    .select()
    .from(menuItems)
    .where(eq(menuItems.sectionId, id))
    .orderBy(asc(menuItems.sortOrder))
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    sortOrder: row.sortOrder,
    items: itemRows.map(mapMenuItemRow),
  }
}

export async function saveMenuSection(section: MenuSection): Promise<MenuSection> {
  await db
    .insert(menuSections)
    .values({
      id: section.id,
      title: section.title,
      subtitle: section.subtitle,
      sortOrder: section.sortOrder,
    })
    .onConflictDoUpdate({
      target: menuSections.id,
      set: {
        title: section.title,
        subtitle: section.subtitle,
        sortOrder: section.sortOrder,
      },
    })

  await db.delete(menuItems).where(eq(menuItems.sectionId, section.id))
  const sorted = [...section.items].sort((a, b) => a.sortOrder - b.sortOrder)
  if (sorted.length > 0) {
    await db.insert(menuItems).values(
      sorted.map((item) => ({
        id: item.id,
        sectionId: section.id,
        name: item.name,
        description: item.description,
        price: item.price,
        available: item.available,
        sortOrder: item.sortOrder,
      })),
    )
  }

  return { ...section, items: sorted }
}

export async function saveMenuSections(sections: MenuSection[]): Promise<MenuSection[]> {
  const existing = await db.select({ id: menuSections.id }).from(menuSections)
  const keep = new Set(sections.map((s) => s.id))
  for (const row of existing) {
    if (!keep.has(row.id)) {
      await db.delete(menuSections).where(eq(menuSections.id, row.id))
    }
  }
  for (const section of sections) {
    await saveMenuSection(section)
  }
  return getMenuSections()
}

export async function deleteMenuSection(id: string): Promise<boolean> {
  const result = await db.delete(menuSections).where(eq(menuSections.id, id)).returning()
  return result.length > 0
}

// ── Reservations ───────────────────────────────────────────────────

function rowToReservation(row: typeof reservations.$inferSelect): Reservation {
  return {
    id: row.id,
    date: row.date,
    time: row.time,
    guests: row.guests,
    name: row.name,
    email: row.email,
    phone: row.phone,
    notes: row.notes,
    status: row.status as Reservation['status'],
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export async function getReservations(): Promise<Reservation[]> {
  const rows = await db
    .select()
    .from(reservations)
    .orderBy(desc(reservations.date), asc(reservations.time))
  return rows.map(rowToReservation)
}

export async function getReservation(id: string): Promise<Reservation | null> {
  const rows = await db
    .select()
    .from(reservations)
    .where(eq(reservations.id, id))
    .limit(1)
  const row = rows[0]
  return row ? rowToReservation(row) : null
}

export async function saveReservation(reservation: Reservation): Promise<Reservation> {
  const updatedAt = new Date()
  const createdAt = reservation.createdAt ? new Date(reservation.createdAt) : updatedAt

  await db
    .insert(reservations)
    .values({
      id: reservation.id,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      notes: reservation.notes,
      status: reservation.status,
      createdAt,
      updatedAt,
    })
    .onConflictDoUpdate({
      target: reservations.id,
      set: {
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        notes: reservation.notes,
        status: reservation.status,
        updatedAt,
      },
    })

  return { ...reservation, updatedAt: updatedAt.toISOString(), createdAt: createdAt.toISOString() }
}

export async function deleteReservation(id: string): Promise<boolean> {
  const result = await db.delete(reservations).where(eq(reservations.id, id)).returning()
  return result.length > 0
}

export { newMenuItemId, newMenuSectionId, newReservationId } from '@/lib/admin/ids'
