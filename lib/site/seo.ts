import type { Metadata } from 'next'

export const SITE_NAME = 'FoodJutters'

export const SITE_TAGLINE = 'Brasserie aan de Schelde in Terneuzen'

export const SITE_DESCRIPTION =
  'FoodJutters is een brasserie aan het water in Terneuzen. Terras aan de Schelde, pizza uit de houtoven en een warme sfeer. Heropend in 2026 door Rolinda en Jimmy.'

export const SITE_KEYWORDS = [
  'FoodJutters',
  'restaurant Terneuzen',
  'brasserie Terneuzen',
  'terras Schelde',
  'eten aan het water',
  'pizza houtoven',
  'groepsreservering Terneuzen',
  'restaurant Zeeland',
]

const DEFAULT_OG_IMAGE = '/images/impressie/terras-haven.png'

export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'https://www.foodjutters.nl'
}

type PageSeoOptions = {
  title?: string
  description: string
  path?: string
  noIndex?: boolean
}

export function pageMetadata({ title, description, path = '', noIndex }: PageSeoOptions): Metadata {
  const canonical = `${siteUrl()}${path}`
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : undefined

  return {
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
    description,
    ...(noIndex ? { robots: { index: false, follow: false } } : { robots: { index: true, follow: true } }),
    openGraph: {
      ...(resolvedTitle ? { title: resolvedTitle } : {}),
      description,
      type: 'website',
      locale: 'nl_NL',
      siteName: SITE_NAME,
      url: canonical,
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Terras van FoodJutters aan de Schelde in Terneuzen' }],
    },
    twitter: {
      card: 'summary_large_image',
      ...(resolvedTitle ? { title: resolvedTitle } : {}),
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical,
    },
  }
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'nl_NL',
    siteName: SITE_NAME,
    url: siteUrl(),
    images: [{ url: DEFAULT_OG_IMAGE, alt: 'Terras van FoodJutters aan de Schelde in Terneuzen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: siteUrl(),
  },
  robots: {
    index: true,
    follow: true,
  },
}
