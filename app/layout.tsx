import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/site-chrome'
import { loadSiteSettings } from '@/lib/cms/settings'
import { gestard, specialElite, steelworksVintage } from '@/lib/fonts'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'FoodJutters – Restaurant aan het water',
  description:
    'FoodJutters is een uniek waterfront restaurant met een ruim terras, sfeervolle binnenruimte en heerlijke gerechten. Gelegen aan het water, voor een onvergetelijke beleving.',
  keywords: ['restaurant', 'FoodJutters', 'terras', 'water', 'pizza', 'eten', 'drinken'],
  openGraph: {
    title: 'FoodJutters – Restaurant aan het water',
    description: 'Een uniek waterfront restaurant met terras, sfeervolle binnenruimte en heerlijke gerechten.',
    type: 'website',
    locale: 'nl_NL',
  },
  icons: {
    icon: '/logo-mark.png',
    apple: '/logo-mark.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await loadSiteSettings()

  return (
    <html
      lang="nl"
      className={`${lato.variable} ${gestard.variable} ${specialElite.variable} ${steelworksVintage.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  )
}
