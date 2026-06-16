export type OpeningHourRow = { day: string; hours: string }

export const DEFAULT_OPENING_HOURS: OpeningHourRow[] = [
  { day: 'Maandag', hours: 'Gesloten' },
  { day: 'Dinsdag', hours: '11:00 – 22:00' },
  { day: 'Woensdag', hours: '11:00 – 22:00' },
  { day: 'Donderdag', hours: '11:00 – 22:00' },
  { day: 'Vrijdag', hours: '11:00 – 22:00' },
  { day: 'Zaterdag', hours: '11:00 – 22:00' },
  { day: 'Zondag', hours: '11:00 – 22:00' },
]

export const DEFAULT_HOURS_DISPLAY = 'Di – Zo · 11:00 – 22:00'
export const DEFAULT_HOURS_SHORT = '11–22'
export const DEFAULT_HOURS_META = 'Di – Zo 11–22'
export const DEFAULT_KITCHEN_HOURS = 'Keuken open tot 20:00'
export const DEFAULT_BANNER_EYEBROW = 'Dinsdag t/m zondag'
export const DEFAULT_HOURS_RANGE_LABEL = 'Di – zo'
export const DEFAULT_CTA_BANNER_TEXT =
  'Di – zo · 11:00 – 22:00 · Keuken tot 20:00 · Terras aan de Schelde.'

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
]

const HOURS_META_LABEL = /^(geopend|openingstijden|openingsdagen)$/i

export function isStaleHoursText(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  return STALE_HOURS_PATTERNS.some((pattern) => pattern.test(trimmed))
}

function isIncompleteHoursMeta(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true
  if (/^di\s*[–-]\s*zo$/i.test(trimmed)) return true
  return !/\d/.test(trimmed)
}

export function normalizeHoursText(text: string, fallback = DEFAULT_HOURS_DISPLAY): string {
  const trimmed = text.trim()
  if (!trimmed || isStaleHoursText(trimmed)) return fallback
  return trimmed
}

export function normalizeBannerEyebrow(text: string): string {
  return normalizeHoursText(text, DEFAULT_BANNER_EYEBROW)
}

export function normalizeCtaBannerText(text: string): string {
  const trimmed = text.trim()
  if (!trimmed || isStaleHoursText(trimmed)) return DEFAULT_CTA_BANNER_TEXT
  return trimmed
}

export function normalizeOpeningHours(rows: OpeningHourRow[]): OpeningHourRow[] {
  if (rows.length === 0) return DEFAULT_OPENING_HOURS

  const monday = rows.find((row) => row.day === 'Maandag')
  const hasStaleRow = rows.some((row) => isStaleHoursText(row.hours))
  const mondayWrong = monday && monday.hours !== 'Gesloten' && !/gesloten/i.test(monday.hours)

  if (hasStaleRow || mondayWrong) return DEFAULT_OPENING_HOURS
  return rows
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

    const value = item.value.trim()
    if (isStaleHoursText(value) || isIncompleteHoursMeta(value)) {
      return { ...item, value: hoursDisplay || DEFAULT_HOURS_META }
    }
    return item
  })
}
