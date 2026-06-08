import { ContentListClient } from '@/components/admin/content-list-client'
import { getContentPagesSummary } from '@/lib/admin/store'

export default async function AdminContentListPage() {
  const pages = await getContentPagesSummary()
  return <ContentListClient pages={pages} />
}
