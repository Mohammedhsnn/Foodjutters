import { Card, Group, Stack, Text, Title } from '@mantine/core'

export function AdminPanel({
  title,
  description,
  actions,
  children,
  padding = 0,
}: {
  title?: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  padding?: number | string
}) {
  return (
    <Card padding={padding} radius="lg" withBorder shadow="sm" style={{ overflow: 'hidden' }}>
      {title ? (
        <Group
          justify="space-between"
          align="flex-start"
          wrap="wrap"
          gap="sm"
          px={padding === 0 ? 'md' : undefined}
          py="sm"
          style={padding === 0 ? { borderBottom: '1px solid #e8f4fb', background: '#fafcfe' } : undefined}
        >
          <Stack gap={2}>
            <Title order={4} c="navy.5">
              {title}
            </Title>
            {description ? (
              <Text size="xs" c="dimmed">
                {description}
              </Text>
            ) : null}
          </Stack>
          {actions ? <Group gap="xs">{actions}</Group> : null}
        </Group>
      ) : null}
      {children}
    </Card>
  )
}
