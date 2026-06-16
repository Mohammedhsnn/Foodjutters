import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type Db = NeonHttpDatabase<typeof schema>

let instance: Db | null = null

function normalizeDatabaseUrl(url: string): string {
  try {
    const parsed = new URL(url)
    // channel_binding can break @neondatabase/serverless HTTP fetch in Next.js dev
    parsed.searchParams.delete('channel_binding')
    return parsed.toString()
  } catch {
    return url.replace(/([?&])channel_binding=[^&]*(&)?/g, (_, sep, amp) => (amp ? sep : ''))
  }
}

function createDb(): Db {
  const url = process.env.DATABASE_URL?.trim()
  if (!url) {
    const hint =
      process.env.VERCEL === '1'
        ? 'Add DATABASE_URL in Vercel → Project → Settings → Environment Variables (Production, Preview, Development).'
        : 'Add DATABASE_URL to .env.local (see .env.example).'
    throw new Error(`DATABASE_URL is not set. ${hint}`)
  }
  return drizzle(neon(normalizeDatabaseUrl(url)), { schema })
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
