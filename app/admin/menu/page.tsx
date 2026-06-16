import { MenuListClient } from '@/components/admin/menu-list-client'
import { getMenuSectionsSummary, getSiteSetting } from '@/lib/admin/store'
import { MENU_PAGE_VISIBLE_KEY, parseMenuPageVisible } from '@/lib/site/nav'

export default async function AdminMenuPage() {
  const [sections, menuSetting] = await Promise.all([
    getMenuSectionsSummary(),
    getSiteSetting(MENU_PAGE_VISIBLE_KEY, 'false'),
  ])
  return (
    <MenuListClient
      sections={sections}
      menuPageVisible={parseMenuPageVisible(menuSetting)}
    />
  )
}
