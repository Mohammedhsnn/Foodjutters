import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

import { inArray } from 'drizzle-orm'
import { db } from '../lib/db/index'
import { reservations } from '../lib/db/schema'
import { LEGACY_DEMO_RESERVATION_IDS } from '../lib/admin/seed'

async function clearDemoReservations() {
  const removed = await db
    .delete(reservations)
    .where(inArray(reservations.id, [...LEGACY_DEMO_RESERVATION_IDS]))
    .returning({ id: reservations.id })

  console.log(`Removed ${removed.length} demo reservation(s):`, removed.map((r) => r.id))
}

clearDemoReservations().catch((err) => {
  console.error(err)
  process.exit(1)
})
