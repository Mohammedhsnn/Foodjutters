import { HomePage } from '@/components/home/home-page'
import { loadSiteSettings } from '@/lib/cms/settings'
import { getContentPage, getMenuSections } from '@/lib/db/repository'

export default async function Page() {
  const [page, menuSections, settings] = await Promise.all([
    getContentPage('home'),
    getMenuSections(),
    loadSiteSettings(),
  ])

  return <HomePage page={page} menuSections={menuSections} settings={settings} />
}
