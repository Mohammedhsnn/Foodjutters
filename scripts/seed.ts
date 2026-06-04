import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

import { db } from '../lib/db/index'
import {
  contentBlocks,
  contentPages,
  menuItems,
  menuSections,
  reservations,
  siteSettings,
} from '../lib/db/schema'
import { SEED_CONTENT, SEED_MENU, SEED_RESERVATIONS } from '../lib/admin/seed'
import { SEED_EXTRA_BLOCKS } from '../lib/admin/seed-extra'
import { SEED_SITE_SETTINGS } from '../lib/admin/seed-site'
import type { ContentPage } from '../lib/admin/types'

function mergePages(): ContentPage[] {
  return SEED_CONTENT.map((page) => {
    const extra = SEED_EXTRA_BLOCKS[page.slug] ?? []
    const keys = new Set(page.blocks.map((b) => b.key))
    const blocks = [
      ...page.blocks,
      ...extra.filter((b) => !keys.has(b.key)),
    ]
    return { ...page, blocks }
  })
}

async function seed() {
  console.log('Seeding Neon database…')

  await db.delete(reservations)
  await db.delete(menuItems)
  await db.delete(menuSections)
  await db.delete(contentBlocks)
  await db.delete(contentPages)
  await db.delete(siteSettings)

  for (const [key, value] of Object.entries(SEED_SITE_SETTINGS)) {
    await db.insert(siteSettings).values({ key, value })
  }

  const pages = mergePages()
  for (const page of pages) {
    await db.insert(contentPages).values({
      slug: page.slug,
      name: page.name,
      path: page.path,
      heroEyebrow: page.hero.eyebrow,
      heroTitle: page.hero.title,
      heroSubtitle: page.hero.subtitle,
      heroMeta: page.hero.meta,
      updatedAt: new Date(page.updatedAt),
    })
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
  }

  for (const section of SEED_MENU) {
    await db.insert(menuSections).values({
      id: section.id,
      title: section.title,
      subtitle: section.subtitle,
      sortOrder: section.sortOrder,
    })
    if (section.items.length > 0) {
      await db.insert(menuItems).values(
        section.items.map((item) => ({
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
  }

  for (const r of SEED_RESERVATIONS) {
    await db.insert(reservations).values({
      id: r.id,
      date: r.date,
      time: r.time,
      guests: r.guests,
      name: r.name,
      email: r.email,
      phone: r.phone,
      notes: r.notes,
      status: r.status,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
    })
  }

  console.log('Done:', {
    settings: Object.keys(SEED_SITE_SETTINGS).length,
    pages: pages.length,
    menuSections: SEED_MENU.length,
    reservations: SEED_RESERVATIONS.length,
  })
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
