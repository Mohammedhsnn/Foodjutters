'use client'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@/components/admin/admin.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { adminTheme } from '@/lib/admin/mantine-theme'

export function MantineAdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={adminTheme}
      defaultColorScheme="light"
      cssVariablesResolver={() => ({
        variables: {},
        light: {
          '--mantine-color-body': '#f4fafd',
          '--mantine-color-default-border': '#c5e3f3',
        },
        dark: {},
      })}
    >
      <Notifications position="top-right" zIndex={1000} autoClose={4500} />
      {children}
    </MantineProvider>
  )
}
