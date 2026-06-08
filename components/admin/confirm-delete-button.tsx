'use client'

import { useState } from 'react'
import { Button, Group, Modal, Stack, Text } from '@mantine/core'
import { IconTrash, TablerIconSection } from '@/lib/admin/icons'

export function ConfirmDeleteButton({
  title,
  description,
  onConfirm,
  loading,
  label = 'Verwijderen',
}: {
  title: string
  description: string
  onConfirm: () => void | Promise<void>
  loading?: boolean
  label?: string
}) {
  const [opened, setOpened] = useState(false)

  async function handleConfirm() {
    await onConfirm()
    setOpened(false)
  }

  return (
    <>
      <Button
        variant="outline"
        color="red"
        size="sm"
        leftSection={<TablerIconSection icon={IconTrash} size={16} />}
        onClick={() => setOpened(true)}
      >
        {label}
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title} centered radius="lg">
        <Stack gap="md">
          <Text size="sm" c="dimmed" lh={1.55}>
            {description}
          </Text>
          <Text size="xs" c="red.7" fw={500}>
            Deze actie kan niet ongedaan worden gemaakt.
          </Text>
          <Group justify="flex-end" gap="sm" mt="xs">
            <Button variant="default" onClick={() => setOpened(false)}>
              Annuleren
            </Button>
            <Button color="red" loading={loading} onClick={handleConfirm}>
              Ja, verwijderen
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
