import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type Db = NeonHttpDatabase<typeof schema>

let instance: Db | null = null

function createDb(): Db {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set. Add it to .env.local')
  }
  return drizzle(neon(url), { schema })
}

export function getDb(): Db {
  if (!instance) instance = createDb()
  return instance
}

/** Drizzle client (lazy — safe for scripts that load dotenv after import) */
export const db = new Proxy({} as Db, {
  get(_target, prop) {
    const client = getDb()
    const value = client[prop as keyof Db]
    return typeof value === 'function' ? value.bind(client) : value
  },
})
