import type { Metadata } from 'next'
import { AdminShell } from '@/components/admin/admin-shell'
import { MantineAdminProvider } from '@/components/admin/mantine-admin-provider'

import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Admin',
    description: 'Beheeromgeving van FoodJutters.',
    path: '/admin',
    noIndex: true,
  }),
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MantineAdminProvider>
      <AdminShell>{children}</AdminShell>
    </MantineAdminProvider>
  )
}
