'use client'

import { Alert, Button, Center, Loader, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconAlertTriangle, IconInbox, tablerProps } from '@/lib/admin/tabler'

export function AdminLoading({ label = 'Gegevens laden…' }: { label?: string }) {
  return (
    <Center py={56} px="md">
      <Stack align="center" gap="md" maw={320}>
        <Loader color="brand" type="dots" size="md" />
        <Text size="sm" c="dimmed" ta="center">
          {label}
        </Text>
        <Text size="xs" c="dimmed" ta="center" opacity={0.85}>
          Een ogenblik geduld — we halen de nieuwste gegevens op.
        </Text>
      </Stack>
    </Center>
  )
}

export function AdminEmpty({
  title,
  description,
  action,
  compact,
}: {
  title: string
  description: string
  action?: React.ReactNode
  compact?: boolean
}) {
  return (
    <Center py={compact ? 32 : 56} px="md">
      <Stack align="center" gap="md" maw={420}>
        <ThemeIcon size={52} radius="xl" variant="light" color="brand">
          <IconInbox {...tablerProps(26)} />
        </ThemeIcon>
        <Text fw={600} ta="center" c="navy.5" tt="uppercase" style={{ fontFamily: 'var(--font-gestard)' }}>
          {title}
        </Text>
        <Text size="sm" c="dimmed" ta="center" lh={1.55}>
          {description}
        </Text>
        {action}
      </Stack>
    </Center>
  )
}

export function AdminError({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <Alert
      color="red"
      variant="light"
      radius="lg"
      icon={<IconAlertTriangle {...tablerProps(18)} />}
      title="Er ging iets mis"
    >
      <Text size="sm" mb={onRetry ? 'md' : 0} lh={1.5}>
        {message}
      </Text>
      {onRetry ? (
        <Button variant="light" color="red" size="xs" radius="md" onClick={onRetry}>
          Opnieuw proberen
        </Button>
      ) : null}
    </Alert>
  )
}
