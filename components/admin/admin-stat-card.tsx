import { Card, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import type { TablerIcon } from '@tabler/icons-react'
import { tablerProps } from '@/lib/admin/tabler'

export function AdminStatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string | number
  hint?: string
  icon: TablerIcon
}) {
  return (
    <Card padding="lg" radius="lg" withBorder shadow="sm" className="h-full">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap={6}>
          <Text size="xs" tt="uppercase" fw={600} c="dimmed" style={{ letterSpacing: '0.06em' }}>
            {label}
          </Text>
          <Text size="xl" fw={700} c="navy.5" className="admin-stat-value">
            {value}
          </Text>
          {hint ? (
            <Text size="xs" c="dimmed" lineClamp={2} lh={1.4}>
              {hint}
            </Text>
          ) : null}
        </Stack>
        <ThemeIcon size={44} radius="md" variant="light" color="brand">
          <Icon {...tablerProps(22)} />
        </ThemeIcon>
      </Group>
    </Card>
  )
}
