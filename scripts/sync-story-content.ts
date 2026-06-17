/**
 * Sync heropening / verhaal-teksten in de CMS-database vanuit seed-bestanden.
 * Usage: pnpm tsx scripts/sync-story-content.ts
 */
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

import { SEED_CONTENT } from '@/lib/admin/seed'
import { SEED_EXTRA_BLOCKS } from '@/lib/admin/seed-extra'
import { getContentPage, saveContentPage } from '@/lib/db/repository'

const STORY_BLOCK_KEYS = new Set([
  'welcome_story_title',
  'welcome_story_text',
  'story_title',
  'story_p1',
  'story_p2',
  'story_p3',
  'founded_year',
  'team_image_alt',
  'cta_text',
  'story',
])

const HERO_PAGES = new Set(['over-ons'])

async function syncPage(slug: string) {
  const page = await getContentPage(slug)
  const seedPage = SEED_CONTENT.find((p) => p.slug === slug)
  const seedBlocks = SEED_EXTRA_BLOCKS[slug]
  if (!page) return

  let changed = false

  if (seedPage && HERO_PAGES.has(slug) && page.hero) {
    if (seedPage.hero.subtitle && page.hero.subtitle !== seedPage.hero.subtitle) {
      page.hero.subtitle = seedPage.hero.subtitle
      changed = true
    }
    if (seedPage.hero.meta) {
      const nextMeta = JSON.stringify(seedPage.hero.meta)
      const currentMeta = JSON.stringify(page.hero.meta ?? [])
      if (nextMeta !== currentMeta) {
        page.hero.meta = seedPage.hero.meta
        changed = true
      }
    }
  }

  if (seedPage) {
    for (const seedBlock of seedPage.blocks) {
      if (!STORY_BLOCK_KEYS.has(seedBlock.key)) continue
      const existing = page.blocks.find((block) => block.key === seedBlock.key)
      if (existing) {
        if (existing.value !== seedBlock.value) {
          existing.value = seedBlock.value
          changed = true
        }
      } else {
        page.blocks.push(seedBlock)
        changed = true
      }
    }
  }

  if (seedBlocks) {
    for (const seedBlock of seedBlocks) {
      if (!STORY_BLOCK_KEYS.has(seedBlock.key)) continue
      const existing = page.blocks.find((block) => block.key === seedBlock.key)
      if (existing) {
        if (existing.value !== seedBlock.value) {
          existing.value = seedBlock.value
          if (seedBlock.label) existing.label = seedBlock.label
          changed = true
        }
      } else {
        page.blocks.push(seedBlock)
        changed = true
      }
    }
  }

  if (changed) {
    await saveContentPage(page)
    console.log(`Updated story content for: ${slug}`)
  }
}

async function main() {
  const slugs = new Set([
    ...SEED_CONTENT.map((p) => p.slug),
    ...Object.keys(SEED_EXTRA_BLOCKS),
  ])

  for (const slug of slugs) {
    await syncPage(slug)
  }

  console.log('Story content synced.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
