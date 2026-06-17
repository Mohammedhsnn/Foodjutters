export type SiteGalleryItem = {
  src: string
  alt: string
  caption: string
}

export const HOME_STORY_IMAGE = '/images/home-verhaal.png'
export const HOME_STORY_IMAGE_ALT =
  'Overdekt terras van FoodJutters met uitzicht op de haven in Terneuzen'

export const OVER_ONS_STORY_IMAGE = '/images/over-ons-verhaal.png'
export const OVER_ONS_STORY_IMAGE_ALT =
  'Sfeervolle eetzaal van FoodJutters met nautisch interieur en uitzicht naar buiten'

export const SITE_GALLERY: SiteGalleryItem[] = [
  {
    src: '/images/impressie/terras-overdekt.png',
    alt: 'Overdekt terras met uitzicht op de haven',
    caption: 'Terras aan de haven',
  },
  {
    src: '/images/impressie/eetzaal-nautisch.png',
    alt: 'Eetzaal met nautische decoratie en grote ramen',
    caption: 'Sfeervolle binnenruimte',
  },
  {
    src: '/images/impressie/bar-foodjutters.png',
    alt: 'Bar van FoodJutters met tap en koffieapparaat',
    caption: 'Onze bar',
  },
  {
    src: '/images/impressie/terras-water.png',
    alt: 'Buitenterras met uitzicht over het water',
    caption: 'Waterfront terras',
  },
  {
    src: '/images/impressie/bar-sfeer.png',
    alt: 'Bar met houten counter en nautische details',
    caption: 'Gezellig aan de bar',
  },
  {
    src: '/images/impressie/terras-haven.png',
    alt: 'Terras onder een luifel met uitzicht op de jachthaven',
    caption: 'Zonnig op het terras',
  },
  {
    src: '/images/impressie/koffie-en-gebak.png',
    alt: 'Koelvitrine met gebak en koffie bij FoodJutters',
    caption: 'Koffie & more',
  },
  {
    src: '/images/impressie/interieur-ramen.png',
    alt: 'Restaurantinterieur met uitzicht op het water',
    caption: 'Uitzicht over het water',
  },
]

function normalizeGalleryCaption(caption: string): string {
  return caption
    .replace(/^Knus aan de bar$/i, 'Gezellig aan de bar')
    .replace(/^Knus & warm$/i, 'Warm & sfeervol')
}

export function resolveGalleryItems(
  items: SiteGalleryItem[] | undefined | null,
): SiteGalleryItem[] {
  return SITE_GALLERY.map((fallback, index) => {
    const fromCms = items?.[index]
    const src = (fromCms?.src ?? '').trim() || fallback.src
    return {
      src,
      alt: (fromCms?.alt ?? '').trim() || fallback.alt,
      caption: normalizeGalleryCaption((fromCms?.caption ?? '').trim() || fallback.caption),
    }
  })
}

export function resolveStoryImage(
  cmsUrl: string | undefined | null,
  fallback: string,
): string {
  const trimmed = (cmsUrl ?? '').trim()
  if (!trimmed) return fallback
  if (/hebbkx1anhila5yf|public\.blob\.vercel-storage\.com\/IMG_0091/i.test(trimmed)) {
    return fallback
  }
  return trimmed
}
