import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconBulb, tablerProps } from '@/lib/admin/tabler'

export function AdminHelpBox({
  title = 'Tip',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <Box className="admin-help-box" p="md">
      <Group align="flex-start" wrap="nowrap" gap="sm">
        <ThemeIcon size={36} radius="md" variant="light" color="brand" style={{ flexShrink: 0 }}>
          <IconBulb {...tablerProps(18)} />
        </ThemeIcon>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} c="navy.5">
            {title}
          </Text>
          <Text size="sm" c="dimmed" lh={1.55}>
            {children}
          </Text>
        </Stack>
      </Group>
    </Box>
  )
}
