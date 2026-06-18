import {
  DEFAULT_HOURS_DISPLAY,
  DEFAULT_HOURS_SHORT,
  DEFAULT_KITCHEN_HOURS,
  DEFAULT_OPENING_HOURS,
} from '@/lib/site/hours'
import { DEFAULT_PHONE, DEFAULT_PHONE_TEL } from '@/lib/site/contact'

export const SEED_SITE_SETTINGS: Record<string, string> = {
  phone: DEFAULT_PHONE,
  phone_tel: DEFAULT_PHONE_TEL,
  email: 'info@foodjutters.nl',
  address_line1: 'Scheldeboulevard 7',
  address_line2: '4531 EJ Terneuzen',
  address_short: 'Scheldeboulevard 7, Terneuzen',
  maps_url: 'https://maps.google.com/?q=Scheldeboulevard+7+Terneuzen',
  footer_tagline:
    'Brasserie aan de Schelde in Terneuzen. Terras, pizza uit de houtoven en een warme sfeer aan het water.',
  instagram_url: 'https://www.instagram.com/foodjutters',
  facebook_url: 'https://www.facebook.com/foodjutters',
  opening_hours: JSON.stringify(DEFAULT_OPENING_HOURS),
  hours_display: DEFAULT_HOURS_DISPLAY,
  hours_short: DEFAULT_HOURS_SHORT,
  kitchen_hours: DEFAULT_KITCHEN_HOURS,
  menu_page_visible: 'false',
}
