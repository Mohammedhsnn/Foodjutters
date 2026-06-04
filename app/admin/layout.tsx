import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { AdminShell } from '@/components/admin/admin-shell'

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
    <>
      <AdminShell>{children}</AdminShell>
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}
