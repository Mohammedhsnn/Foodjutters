import { getSiteSettings } from '@/lib/db/repository'

export type OpeningHourRow = { day: string; hours: string }

export async function loadSiteSettings() {
  const raw = await getSiteSettings()
  let openingHours: OpeningHourRow[] = []
  try {
    openingHours = JSON.parse(raw.opening_hours ?? '[]') as OpeningHourRow[]
  } catch {
    openingHours = []
  }
  return {
    phone: raw.phone ?? '',
    phoneTel: raw.phone_tel ?? '',
    email: raw.email ?? '',
    addressLine1: raw.address_line1 ?? '',
    addressLine2: raw.address_line2 ?? '',
    addressShort: raw.address_short ?? '',
    mapsUrl: raw.maps_url ?? '',
    footerTagline: raw.footer_tagline ?? '',
    instagramUrl: raw.instagram_url ?? '',
    facebookUrl: raw.facebook_url ?? '',
    hoursDisplay: raw.hours_display ?? '',
    openingHours,
  }
}
