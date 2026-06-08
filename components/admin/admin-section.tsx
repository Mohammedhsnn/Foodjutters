import { Stack, Text, Title } from '@mantine/core'

export function AdminSection({
  title,
  description,
  children,
  gap = 'md',
}: {
  title?: string
  description?: string
  children: React.ReactNode
  gap?: 'sm' | 'md' | 'lg'
}) {
  return (
    <Stack gap={gap}>
      {title || description ? (
        <Stack gap={4}>
          {title ? (
            <Title order={3} c="navy.5">
              {title}
            </Title>
          ) : null}
          {description ? (
            <Text size="sm" c="dimmed" maw={640} lh={1.5}>
              {description}
            </Text>
          ) : null}
        </Stack>
      ) : null}
      {children}
    </Stack>
  )
}
