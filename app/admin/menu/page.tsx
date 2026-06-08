import { MenuListClient } from '@/components/admin/menu-list-client'
import { getMenuSectionsSummary } from '@/lib/admin/store'

export default async function AdminMenuPage() {
  const sections = await getMenuSectionsSummary()
  return <MenuListClient sections={sections} />
}
