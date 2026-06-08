import { Box, Group, Stack, Text, Title } from '@mantine/core'

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  help,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  help?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <Box className="admin-page-header">
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
        <Stack gap={6} maw="100%" style={{ flex: 1, minWidth: 0 }}>
          {eyebrow ? (
            <Text size="xs" tt="uppercase" fw={600} c="brand.5" style={{ letterSpacing: '0.12em' }}>
              {eyebrow}
            </Text>
          ) : null}
          <Title order={1} c="navy.5">
            {title}
          </Title>
          {description ? (
            <Text size="sm" c="dimmed" maw={600} lh={1.5}>
              {description}
            </Text>
          ) : null}
        </Stack>
        {actions ? (
          <Group gap="sm" wrap="wrap" justify="flex-end" style={{ flexShrink: 0 }}>
            {actions}
          </Group>
        ) : null}
      </Group>
      {help ? <Box mt="md">{help}</Box> : null}
    </Box>
  )
}
