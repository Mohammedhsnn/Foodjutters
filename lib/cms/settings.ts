import { getSiteSettings } from '@/lib/db/repository'
import { normalizePhone, normalizePhoneTel } from '@/lib/site/contact'
import { parseMenuPageVisible } from '@/lib/site/nav'
import {
  DEFAULT_HOURS_DISPLAY,
  DEFAULT_HOURS_SHORT,
  DEFAULT_KITCHEN_HOURS,
  normalizeHoursShort,
  normalizeHoursText,
  normalizeKitchenHours,
  normalizeOpeningHours,
  type OpeningHourRow,
} from '@/lib/site/hours'
import { SITE_TAGLINE } from '@/lib/site/seo'
import { sanitizeVisibleCopy } from '@/lib/site/copy'

export type { OpeningHourRow }

export async function loadSiteSettings() {
  const raw = await getSiteSettings()
  let openingHours: OpeningHourRow[] = []
  try {
    openingHours = normalizeOpeningHours(JSON.parse(raw.opening_hours ?? '[]') as OpeningHourRow[])
  } catch {
    openingHours = normalizeOpeningHours([])
  }
  return {
    phone: normalizePhone(raw.phone),
    phoneTel: normalizePhoneTel(raw.phone_tel),
    email: raw.email ?? '',
    addressLine1: raw.address_line1 ?? '',
    addressLine2: raw.address_line2 ?? '',
    addressShort: raw.address_short ?? '',
    mapsUrl: raw.maps_url ?? '',
    footerTagline: sanitizeVisibleCopy(raw.footer_tagline?.trim() || SITE_TAGLINE),
    instagramUrl: raw.instagram_url ?? '',
    facebookUrl: raw.facebook_url ?? '',
    hoursDisplay: sanitizeVisibleCopy(normalizeHoursText(raw.hours_display ?? '', DEFAULT_HOURS_DISPLAY)),
    hoursShort: sanitizeVisibleCopy(normalizeHoursShort(raw.hours_short ?? '')),
    kitchenHours: sanitizeVisibleCopy(normalizeKitchenHours(raw.kitchen_hours ?? '')),
    openingHours,
    menuPageVisible: parseMenuPageVisible(raw.menu_page_visible),
  }
}

export type SiteSettingsProps = Awaited<ReturnType<typeof loadSiteSettings>>
