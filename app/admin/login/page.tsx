'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Box,
  Button,
  Center,
  List,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconLock, TablerIconSection, adminNotify } from '@/lib/admin/icons'
import { ADMIN_MODULES } from '@/lib/admin/page-meta'
import { Logo } from '@/components/logo'
import { adminFetch, ApiError } from '@/lib/admin/api'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await adminFetch('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      adminNotify.success('Welkom terug', 'U bent ingelogd')
      const from = searchParams.get('from') || '/admin'
      router.push(from.startsWith('/admin') ? from : '/admin')
      router.refresh()
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Inloggen mislukt'
      adminNotify.error('Inloggen mislukt', msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Center mih="100svh" px="md" py="xl" className="admin-login-bg">
      <Paper radius="lg" shadow="md" p={{ base: 'lg', sm: 'xl' }} w="100%" maw={420} withBorder>
        <Box
          className="admin-header-accent"
          mb="lg"
          style={{ marginTop: -8, marginInline: -8, borderRadius: '12px 12px 0 0' }}
        />
        <Stack align="center" gap="xs" mb="lg">
          <Logo layout="stack" size="md" />
          <Text size="xs" tt="uppercase" fw={600} c="brand.5" style={{ letterSpacing: '0.14em' }}>
            Beheeromgeving
          </Text>
          <Title order={2} c="navy.5" ta="center">
            Inloggen
          </Title>
          <Text size="sm" c="dimmed" ta="center" maw={320} lh={1.5}>
            Log in om content, menu en reserveringen te beheren.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <PasswordInput
              label="Wachtwoord"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="••••••••"
              leftSection={<TablerIconSection icon={IconLock} size={16} />}
            />
            <Button type="submit" fullWidth loading={loading} color="navy" size="md">
              Inloggen
            </Button>
          </Stack>
        </form>

        <Stack gap="xs" mt="xl" pt="md" style={{ borderTop: '1px solid #e8f4fb' }}>
          <Text size="xs" fw={600} c="navy.5" tt="uppercase" style={{ letterSpacing: '0.06em' }}>
            In dit paneel
          </Text>
          <List size="sm" c="dimmed" spacing={4}>
            {ADMIN_MODULES.map((item) => (
              <List.Item key={item.href}>
                <strong>{item.label}</strong> — {item.hint}
              </List.Item>
            ))}
          </List>
        </Stack>
      </Paper>
    </Center>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <Center mih="100svh">
          <Text size="sm" c="dimmed">
            Laden…
          </Text>
        </Center>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
