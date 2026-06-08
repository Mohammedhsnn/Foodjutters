'use client'

import type { ReactNode } from 'react'
import { notifications } from '@mantine/notifications'
import { IconAlertCircle, IconCheck, IconX, tablerProps } from '@/lib/admin/tabler'

export { TABLER_STROKE, tablerProps } from '@/lib/admin/tabler'
export * from '@/lib/admin/tabler'

export function TablerIconSection({
  icon: Icon,
  size = 18,
}: {
  icon: React.ComponentType<{ size?: number; stroke?: number }>
  size?: number
}) {
  return <Icon {...tablerProps(size)} />
}

function notifyIcon(icon: ReactNode) {
  return icon
}

export const adminNotify = {
  success(title: string, message?: string) {
    notifications.show({
      title,
      message,
      color: 'brand',
      icon: notifyIcon(<IconCheck {...tablerProps(18)} />),
    })
  },
  error(title: string, message?: string) {
    notifications.show({
      title,
      message,
      color: 'red',
      icon: notifyIcon(<IconX {...tablerProps(18)} />),
    })
  },
  info(title: string, message?: string) {
    notifications.show({
      title,
      message,
      color: 'blue',
      icon: notifyIcon(<IconAlertCircle {...tablerProps(18)} />),
    })
  },
}
