import type { Metadata } from 'next'
import { HomePage } from '@/components/home/home-page'
import { loadSiteSettings } from '@/lib/cms/settings'
import { getContentPage } from '@/lib/db/repository'
import { pageMetadata, SITE_DESCRIPTION } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: '/',
})

export default async function Page() {
  const [page, settings] = await Promise.all([getContentPage('home'), loadSiteSettings()])

  return <HomePage page={page} settings={settings} />
}
