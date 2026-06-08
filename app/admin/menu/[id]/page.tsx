import { notFound } from 'next/navigation'
import { MenuEditClient } from '@/components/admin/menu-edit-client'
import { getMenuSection } from '@/lib/admin/store'

type Params = { params: Promise<{ id: string }> }

export default async function AdminMenuSectionPage({ params }: Params) {
  const { id } = await params
  const section = await getMenuSection(id)
  if (!section) notFound()
  return <MenuEditClient sectionId={id} initialSection={section} />
}
