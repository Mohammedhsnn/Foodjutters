export type GalleryCategory = 'terras' | 'keuken' | 'sfeer'

export type SiteGalleryItem = {
  src: string
  alt: string
  caption: string
  category: GalleryCategory
}

export const HOME_STORY_IMAGE = '/images/home-verhaal.png'
export const HOME_STORY_IMAGE_ALT =
  'Overdekt terras van FoodJutters met uitzicht op de haven in Terneuzen'

export const OVER_ONS_STORY_IMAGE = '/images/over-ons-verhaal.png'
export const OVER_ONS_STORY_IMAGE_ALT =
  'Sfeervolle eetzaal van FoodJutters met nautisch interieur en uitzicht naar buiten'

export const SITE_GALLERY: SiteGalleryItem[] = [
  {
    src: '/images/impressie/terras-haven.png',
    alt: 'Terras onder een luifel met uitzicht op de jachthaven',
    caption: 'Zonnig op het terras',
    category: 'terras',
  },
  {
    src: '/images/impressie/burger-friet.png',
    alt: 'Burger met friet en salade op een bord',
    caption: 'Burger van de kaart',
    category: 'keuken',
  },
  {
    src: '/images/impressie/terras-gezin.png',
    alt: 'Kind aan het stuurwiel op het terras met uitzicht over het water',
    caption: 'Gezellig met het gezin',
    category: 'terras',
  },
  {
    src: '/images/impressie/eetzaal-nautisch.png',
    alt: 'Eetzaal met nautische decoratie en grote ramen',
    caption: 'Sfeervolle binnenruimte',
    category: 'sfeer',
  },
  {
    src: '/images/impressie/kippenragout-friet.png',
    alt: 'Kippenragout met friet en salade bij FoodJutters',
    caption: 'Kippenragout met friet',
    category: 'keuken',
  },
  {
    src: '/images/impressie/terras-overdekt.png',
    alt: 'Overdekt terras met uitzicht op de haven',
    caption: 'Terras aan de haven',
    category: 'terras',
  },
  {
    src: '/images/impressie/pannenkoek-aardbei.png',
    alt: 'Pannenkoek met poedersuiker in hartvorm en aardbeien',
    caption: 'Pannenkoek met aardbei',
    category: 'keuken',
  },
  {
    src: '/images/impressie/bar-foodjutters.png',
    alt: 'Bar van FoodJutters met tap en koffieapparaat',
    caption: 'Onze bar',
    category: 'sfeer',
  },
  {
    src: '/images/impressie/broodje-brie-druiven.png',
    alt: 'Broodje met brie, druiven en rucola op een bord',
    caption: 'Lunch aan het water',
    category: 'keuken',
  },
  {
    src: '/images/impressie/terras-water.png',
    alt: 'Buitenterras met uitzicht over het water',
    caption: 'Waterfront terras',
    category: 'terras',
  },
  {
    src: '/images/impressie/bar-sfeer.png',
    alt: 'Bar met houten counter en nautische details',
    caption: 'Gezellig aan de bar',
    category: 'sfeer',
  },
  {
    src: '/images/impressie/interieur-ramen.png',
    alt: 'Restaurantinterieur met uitzicht op het water',
    caption: 'Uitzicht over het water',
    category: 'sfeer',
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
  return SITE_GALLERY.map((fallback) => {
    const fromCms = items?.find((item) => {
      const src = (item.src ?? '').trim()
      if (!src) return false
      return src === fallback.src || src.endsWith(fallback.src)
    })
    const src = (fromCms?.src ?? '').trim() || fallback.src
    return {
      src,
      alt: (fromCms?.alt ?? '').trim() || fallback.alt,
      caption: normalizeGalleryCaption((fromCms?.caption ?? '').trim() || fallback.caption),
      category: fallback.category,
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
