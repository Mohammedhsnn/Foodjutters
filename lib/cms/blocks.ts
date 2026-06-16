import type { ContentBlock, ContentPage } from '@/lib/admin/types'

export function blockValue(page: ContentPage | null, key: string, fallback = ''): string {
  if (!page) return fallback
  return page.blocks.find((b) => b.key === key)?.value ?? fallback
}

export function blockJson<T>(page: ContentPage | null, key: string, fallback: T): T {
  const raw = blockValue(page, key, '')
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** CMS image URLs — leeg of onbereikbare legacy-seed links → placeholder tonen */
export function usableCmsImageUrl(url: string | undefined | null): string {
  const trimmed = (url ?? '').trim()
  if (!trimmed) return ''
  if (/hebbkx1anhila5yf|public\.blob\.vercel-storage\.com\/IMG_0091/i.test(trimmed)) return ''
  return trimmed
}
