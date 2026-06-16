/**
 * Sync site image blocks in the CMS database.
 * Usage: pnpm tsx scripts/sync-site-images.ts
 */
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

import { SEED_EXTRA_BLOCKS } from '@/lib/admin/seed-extra'
import { SITE_GALLERY } from '@/lib/site/images'
import { getContentPage, saveContentPage } from '@/lib/db/repository'

const IMAGE_BLOCK_KEYS = new Set([
  'welcome_story_image',
  'welcome_story_image_alt',
  'story_image',
  'story_image_alt',
  'gallery',
  'hero_image',
])

async function syncPageImages(slug: string) {
  const page = await getContentPage(slug)
  const seedBlocks = SEED_EXTRA_BLOCKS[slug]
  if (!page || !seedBlocks) return

  let changed = false
  for (const seedBlock of seedBlocks) {
    if (!IMAGE_BLOCK_KEYS.has(seedBlock.key)) continue

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

  if (changed) {
    await saveContentPage(page)
    console.log(`Updated image blocks for: ${slug}`)
  }
}

async function main() {
  for (const slug of Object.keys(SEED_EXTRA_BLOCKS)) {
    await syncPageImages(slug)
  }
  console.log(`Gallery contains ${SITE_GALLERY.length} photos.`)
  console.log('Site images synced.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
