'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingBooking } from '@/components/floating-booking'
import type { loadSiteSettings } from '@/lib/cms/settings'

export type SiteSettingsProps = Awaited<ReturnType<typeof loadSiteSettings>>

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
      <Navigation />
      <main>{children}</main>
      <Footer settings={settings} />
      <FloatingBooking />
    </>
  )
}
