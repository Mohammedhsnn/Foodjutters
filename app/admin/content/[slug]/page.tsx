import { notFound } from 'next/navigation'
import { ContentEditClient } from '@/components/admin/content-edit-client'
import { getContentPage } from '@/lib/admin/store'

type Params = { params: Promise<{ slug: string }> }

export default async function AdminContentEditPage({ params }: Params) {
  const { slug } = await params
  const page = await getContentPage(slug)
  if (!page) notFound()
  return <ContentEditClient initialPage={page} />
}
