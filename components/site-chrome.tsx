'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import type { SiteSettingsProps } from '@/lib/cms/settings'

export type { SiteSettingsProps } from '@/lib/cms/settings'

export function SiteChrome({
  children,
  settings,
}: {
  children: React.ReactNode
  settings: SiteSettingsProps
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <ScrollToTop />
      <Navigation settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
