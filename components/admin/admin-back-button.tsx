'use client'

import Link from 'next/link'
import { Button } from '@mantine/core'
import { IconArrowLeft, TablerIconSection } from '@/lib/admin/icons'

export function AdminBackButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
      <Button
        variant="subtle"
        color="navy"
        size="compact-sm"
        leftSection={<TablerIconSection icon={IconArrowLeft} size={16} />}
      >
        {label}
      </Button>
    </Link>
  )
}
