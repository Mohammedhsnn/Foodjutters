'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconCalendar,
  IconExternalLink,
  IconFileText,
  IconLayoutDashboard,
  IconLogout,
  IconMenu2,
  IconToolsKitchen2,
  IconX,
  TablerIconSection,
} from '@/lib/admin/icons'
import { ADMIN_NAV } from '@/lib/admin/page-meta'
import { Logo } from '@/components/logo'
import { adminFetch } from '@/lib/admin/api'

const NAV_ICONS = {
  dashboard: IconLayoutDashboard,
  content: IconFileText,
  menu: IconToolsKitchen2,
  reservations: IconCalendar,
} as const

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [opened, { toggle }] = useDisclosure()
  const [loggingOut, setLoggingOut] = useState(false)

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await adminFetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } finally {
      setLoggingOut(false)
    }
  }

  const navItems = ADMIN_NAV.map(({ href, label, hint, section }) => {
    const exact = href === '/admin'
    const active = isActive(pathname, href, exact)
    const Icon = NAV_ICONS[section]
    return (
      <NavLink
        key={href}
        component={Link}
        href={href}
        label={label}
        description={hint}
        leftSection={<TablerIconSection icon={Icon} size={18} />}
        chevron={null}
        active={active}
        variant="light"
        color="navy"
        className="admin-nav-link"
        onClick={() => opened && toggle()}
      />
    )
  })

  return (
    <AppShell
      header={{ height: { base: 56, sm: 64 } }}
      navbar={{
        width: { base: '100%', sm: 260, lg: 272 },
        breakpoint: 'lg',
        collapsed: { mobile: !opened },
      }}
      padding={{ base: 'sm', sm: 'md', lg: 'lg' }}
      styles={{
        main: { backgroundColor: '#f4fafd', overflowX: 'hidden' },
        navbar: {
          backgroundColor: '#d8f0fc',
          borderRight: '1px solid #c5e3f3',
          display: 'flex',
          flexDirection: 'column',
        },
        header: {
          backgroundColor: 'white',
          borderBottom: '1px solid #c5e3f3',
        },
      }}
    >
      <AppShell.Header>
        <Box className="admin-header-accent" />
        <Group h="100%" px="md" justify="space-between" wrap="nowrap" gap="sm">
          <Group gap="sm" wrap="nowrap" style={{ minWidth: 0, flex: 1 }}>
            <ActionIcon
              variant="subtle"
              color="navy"
              hiddenFrom="lg"
              size="lg"
              onClick={toggle}
              aria-label={opened ? 'Menu sluiten' : 'Menu openen'}
            >
              {opened ? (
                <TablerIconSection icon={IconX} size={20} />
              ) : (
                <TablerIconSection icon={IconMenu2} size={20} />
              )}
            </ActionIcon>
            <Link href="/admin" style={{ textDecoration: 'none', lineHeight: 0 }}>
              <Logo layout="row" size="sm" className="admin-header-logo" />
            </Link>
          </Group>
          <Link href="/" target="_blank" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Button
              variant="light"
              color="brand"
              size="compact-sm"
              leftSection={<TablerIconSection icon={IconExternalLink} size={14} />}
            >
              <Text span visibleFrom="sm">
                Live website
              </Text>
              <Text span hiddenFrom="sm">
                Website
              </Text>
            </Button>
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className="admin-navbar">
        <Stack gap="xs" mb="md" className="admin-sidebar-brand">
          <Logo layout="stack" size="sm" className="admin-sidebar-logo" />
          <Text size="xs" tt="uppercase" fw={600} c="navy.5" ta="center" style={{ letterSpacing: '0.08em' }}>
            Beheeromgeving
          </Text>
        </Stack>

        <ScrollArea flex={1} type="auto" offsetScrollbars className="admin-nav-scroll">
          <Stack gap={4}>{navItems}</Stack>
        </ScrollArea>

        <Stack gap="xs" mt="md" pt="md" className="admin-sidebar-footer">
          <Text size="xs" c="dimmed" lh={1.45}>
            Opgeslagen wijzigingen zijn direct zichtbaar op de website.
          </Text>
          <Link href="/" target="_blank" style={{ textDecoration: 'none' }}>
            <Button
              variant="subtle"
              color="navy"
              fullWidth
              size="compact-sm"
              leftSection={<TablerIconSection icon={IconExternalLink} size={16} />}
              justify="flex-start"
            >
              Website bekijken
            </Button>
          </Link>
          <Button
            variant="subtle"
            color="red"
            fullWidth
            size="compact-sm"
            leftSection={<TablerIconSection icon={IconLogout} size={16} />}
            justify="flex-start"
            onClick={handleLogout}
            loading={loggingOut}
          >
            Uitloggen
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main className="admin-main">
        <Box maw={1120} mx="auto" w="100%" style={{ minWidth: 0 }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
