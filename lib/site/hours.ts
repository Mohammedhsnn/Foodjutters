import { sanitizeVisibleCopy } from '@/lib/site/copy'

export type OpeningHourRow = { day: string; hours: string }

export const DEFAULT_OPENING_HOURS: OpeningHourRow[] = [
  { day: 'Maandag', hours: 'Gesloten' },
  { day: 'Dinsdag', hours: '11:00 tot 21:00' },
  { day: 'Woensdag', hours: '11:00 tot 21:00' },
  { day: 'Donderdag', hours: '11:00 tot 21:00' },
  { day: 'Vrijdag', hours: '11:00 tot 22:00' },
  { day: 'Zaterdag', hours: '11:00 tot 22:00' },
  { day: 'Zondag', hours: '11:00 tot 22:00' },
]

export const DEFAULT_HOURS_DISPLAY =
  'Di t/m do 11:00 tot 21:00, vr t/m zo 11:00 tot 22:00'
export const DEFAULT_HOURS_SHORT = 'Di t/m zo'
export const DEFAULT_HOURS_META = DEFAULT_HOURS_DISPLAY
export const DEFAULT_KITCHEN_HOURS = 'Keuken sluit om 20:00'
export const DEFAULT_BANNER_EYEBROW = 'Dinsdag t/m zondag'
export const DEFAULT_HOURS_RANGE_LABEL = 'Di t/m zo'
export const DEFAULT_CTA_BANNER_TEXT =
  'Di t/m do 11:00 tot 21:00, vr t/m zo 11:00 tot 22:00. Keuken sluit om 20:00. Terras aan de Schelde.'

const STALE_HOURS_PATTERNS = [
  /12[:\-–]22/,
  /12:00/,
  /wo\s*[–-]\s*zo/i,
  /woensdag/i,
  /maandag t\/m zondag/i,
  /ma\s*[–-]\s*zo/i,
  /ma\s*–\s*vr/i,
  /dagelijks/i,
  /7\s*dagen/i,
  /^di t\/m zo,?\s*11:00 tot 22:00$/i,
  /\b11 tot 21\b/i,
  /\b11 tot 22\b/i,
  /vr t\/m zo tot 22:00/i,
]

function scheduleMatchesDefault(rows: OpeningHourRow[]): boolean {
  if (rows.length !== DEFAULT_OPENING_HOURS.length) return false
  return DEFAULT_OPENING_HOURS.every((expected) => {
    const row = rows.find((entry) => entry.day === expected.day)
    if (!row) return false
    const hours = sanitizeVisibleCopy(row.hours.trim())
    return hours.toLowerCase() === expected.hours.toLowerCase()
  })
}

function isCanonicalHoursDisplay(text: string): boolean {
  const trimmed = sanitizeVisibleCopy(text.trim())
  if (!trimmed) return false
  if (trimmed === DEFAULT_HOURS_DISPLAY) return true
  const normalized = trimmed.toLowerCase()
  return (
    normalized.includes('di t/m do') &&
    normalized.includes('11:00') &&
    normalized.includes('21:00') &&
    normalized.includes('vr t/m zo') &&
    normalized.includes('22:00')
  )
}

const HOURS_META_LABEL = /^(geopend|openingstijden|openingsdagen)$/i

export function isStaleHoursText(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  return STALE_HOURS_PATTERNS.some((pattern) => pattern.test(trimmed))
}

export function normalizeHoursText(text: string, fallback = DEFAULT_HOURS_DISPLAY): string {
  const trimmed = text.trim()
  if (!trimmed || isStaleHoursText(trimmed)) return fallback
  if (fallback === DEFAULT_HOURS_DISPLAY && !isCanonicalHoursDisplay(trimmed)) return fallback
  return sanitizeVisibleCopy(trimmed)
}

export function normalizeHoursShort(text: string): string {
  const trimmed = text.trim()
  if (!trimmed || isStaleHoursText(trimmed)) return DEFAULT_HOURS_SHORT
  if (/^di\s*t\/m\s*zo$/i.test(trimmed)) return DEFAULT_HOURS_SHORT
  return DEFAULT_HOURS_SHORT
}

export function normalizeKitchenHours(text: string): string {
  const trimmed = sanitizeVisibleCopy(text.trim())
  if (!trimmed || !/keuken sluit om 20:00/i.test(trimmed)) return DEFAULT_KITCHEN_HOURS
  return DEFAULT_KITCHEN_HOURS
}

export function normalizeBannerEyebrow(text: string): string {
  return normalizeHoursText(text, DEFAULT_BANNER_EYEBROW)
}

export function normalizeCtaBannerText(text: string): string {
  const trimmed = text.trim()
  if (!trimmed || isStaleHoursText(trimmed)) return DEFAULT_CTA_BANNER_TEXT
  return sanitizeVisibleCopy(trimmed)
}

export function normalizeOpeningHours(rows: OpeningHourRow[]): OpeningHourRow[] {
  if (!scheduleMatchesDefault(rows)) return DEFAULT_OPENING_HOURS
  return DEFAULT_OPENING_HOURS
}

export type HeroMetaItem = { label: string; value: string }

export function resolveHeroMeta(
  meta: HeroMetaItem[] | undefined | null,
  hoursDisplay: string,
  contact?: { phone?: string; addressShort?: string },
): HeroMetaItem[] | undefined {
  if (!meta?.length) return undefined

  return meta.map((item) => {
    if (/^telefoon$/i.test(item.label) && contact?.phone) {
      return { ...item, value: contact.phone }
    }
    if (/^adres$/i.test(item.label) && contact?.addressShort) {
      return { ...item, value: contact.addressShort }
    }
    if (!HOURS_META_LABEL.test(item.label)) return item
    return { ...item, value: hoursDisplay || DEFAULT_HOURS_META }
  })
}
