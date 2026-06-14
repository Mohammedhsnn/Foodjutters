import { HomePage } from '@/components/home/home-page'
import { loadSiteSettings } from '@/lib/cms/settings'
import { getContentPage } from '@/lib/db/repository'

export default async function Page() {
  const [page, settings] = await Promise.all([getContentPage('home'), loadSiteSettings()])

  return <HomePage page={page} settings={settings} />
}
