import type { Metadata } from 'next'
import { AdminShell } from '@/components/admin/admin-shell'
import { MantineAdminProvider } from '@/components/admin/mantine-admin-provider'

export const metadata: Metadata = {
  title: 'Admin – FoodJutters',
  robots: { index: false, follow: false },
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
