import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteChrome } from '@/components/site-chrome'
import { loadSiteSettings } from '@/lib/cms/settings'
import { gestard, specialElite, steelworksVintage } from '@/lib/fonts'
import { ROOT_METADATA } from '@/lib/site/seo'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = ROOT_METADATA

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
        <Analytics />
      </body>
    </html>
  )
}
