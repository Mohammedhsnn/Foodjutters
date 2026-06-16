/**
 * Upsert opening-hours site settings in the database (safe to run repeatedly).
 * Usage: pnpm tsx scripts/sync-opening-hours.ts
 */
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

import { SEED_SITE_SETTINGS } from '@/lib/admin/seed-site'
import { saveSiteSetting } from '@/lib/db/repository'

const SITE_SETTING_KEYS = [
  'opening_hours',
  'hours_display',
  'hours_short',
  'kitchen_hours',
  'phone',
  'phone_tel',
] as const

async function main() {
  for (const key of SITE_SETTING_KEYS) {
    const value = SEED_SITE_SETTINGS[key]
    if (!value) continue
    await saveSiteSetting(key, value)
    console.log(`Updated site setting: ${key}`)
  }
  console.log('Site settings synced.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
