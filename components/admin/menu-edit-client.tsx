'use client'

import { useState } from 'react'
import {
  ActionIcon,
  Button,
  Card,
  Group,
  NumberInput,
  Stack,
  Switch,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconGripVertical, IconPlus, IconTrash, TablerIconSection, adminNotify } from '@/lib/admin/icons'
import { AdminBackButton } from '@/components/admin/admin-back-button'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminPanel } from '@/components/admin/admin-panel'
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { MenuItem, MenuSection } from '@/lib/admin/types'
import { newMenuItemId } from '@/lib/admin/ids'

export function MenuEditClient({
  sectionId,
  initialSection,
}: {
  sectionId: string
  initialSection: MenuSection
}) {
  const [section, setSection] = useState(initialSection)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const data = await adminFetch<{ section: MenuSection }>(`/api/admin/menu/${sectionId}`, {
        method: 'PUT',
        body: JSON.stringify(section),
      })
      setSection(data.section)
      adminNotify.success('Menu opgeslagen', 'Gerechten en prijzen zijn bijgewerkt op de website')
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteSection() {
    setDeleting(true)
    try {
      await adminFetch(`/api/admin/menu/${sectionId}`, { method: 'DELETE' })
      adminNotify.success('Categorie verwijderd')
      window.location.href = '/admin/menu'
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Verwijderen mislukt')
      setDeleting(false)
    }
  }

  function updateItem(index: number, patch: Partial<MenuItem>) {
    const items = [...section.items]
    items[index] = { ...items[index], ...patch }
    setSection({ ...section, items })
  }

  function addItem() {
    const sortOrder = section.items.length
    const item: MenuItem = {
      id: newMenuItemId(),
      name: 'Nieuw gerecht',
      description: '',
      price: '0,00',
      available: true,
      sortOrder,
    }
    setSection({ ...section, items: [...section.items, item] })
  }

  function removeItem(index: number) {
    setSection({
      ...section,
      items: section.items.filter((_, i) => i !== index),
    })
  }

  return (
    <Stack gap="lg" pb="xl">
      <AdminBackButton href="/admin/menu" label="Terug naar alle categorieën" />

      <AdminPageHeader
        title={section.title}
        description={`${section.items.length} gerechten in deze categorie — wijzigingen worden direct op het menu getoond`}
        actions={
          <Group gap="sm">
            <ConfirmDeleteButton
              title="Categorie verwijderen?"
              description={`Alle gerechten in "${section.title}" worden permanent verwijderd van het menu.`}
              onConfirm={handleDeleteSection}
              loading={deleting}
            />
            <Button onClick={handleSave} loading={saving} color="navy">
              Wijzigingen opslaan
            </Button>
          </Group>
        }
        help={
          <AdminHelpBox title="Gerechten beheren">
            Vul naam, omschrijving en prijs in. Schakel <strong>Beschikbaar</strong> uit om een gerecht tijdelijk
            te verbergen zonder het te verwijderen.
          </AdminHelpBox>
        }
      />

      <Card padding="lg" radius="lg" withBorder shadow="sm">
        <Title order={3} c="navy.5" mb="lg">
          Categorienaam
        </Title>
        <Stack gap="md">
          <TextInput
            label="Titel"
            description="De naam van deze categorie op het menu (bijv. Voorgerechten)"
            value={section.title}
            onChange={(e) => setSection({ ...section, title: e.currentTarget.value })}
          />
          <TextInput
            label="Ondertitel"
            description="Korte toelichting onder de categorienaam — optioneel"
            value={section.subtitle}
            onChange={(e) => setSection({ ...section, subtitle: e.currentTarget.value })}
          />
          <NumberInput
            label="Volgorde op het menu"
            description="Lager getal = hoger op de pagina. Meestal niet nodig om aan te passen."
            value={section.sortOrder}
            onChange={(v) => setSection({ ...section, sortOrder: Number(v) || 0 })}
          />
        </Stack>
      </Card>

      <AdminPanel
        title="Gerechten in deze categorie"
        description="Vul per regel naam, omschrijving en prijs in. Schakel beschikbaarheid uit om een gerecht tijdelijk te verbergen."
        actions={
          <Button
            variant="light"
            size="sm"
            color="navy"
            leftSection={<TablerIconSection icon={IconPlus} size={16} />}
            onClick={addItem}
          >
            Gerecht toevoegen
          </Button>
        }
      >
        <Table.ScrollContainer minWidth={720}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={40} />
                <Table.Th>Naam</Table.Th>
                <Table.Th visibleFrom="lg">Omschrijving</Table.Th>
                <Table.Th>Prijs</Table.Th>
                <Table.Th>Beschikbaar</Table.Th>
                <Table.Th ta="right">Actie</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {section.items.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <span style={{ opacity: 0.4 }} aria-hidden>
                      <TablerIconSection icon={IconGripVertical} size={16} />
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      value={item.name}
                      onChange={(e) => updateItem(index, { name: e.currentTarget.value })}
                      miw={140}
                    />
                  </Table.Td>
                  <Table.Td visibleFrom="lg" maw={280}>
                    <Textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => updateItem(index, { description: e.currentTarget.value })}
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      value={item.price}
                      onChange={(e) => updateItem(index, { price: e.currentTarget.value })}
                      w={96}
                      aria-label="Prijs"
                    />
                  </Table.Td>
                  <Table.Td>
                    <Switch
                      checked={item.available}
                      onChange={(e) => updateItem(index, { available: e.currentTarget.checked })}
                      aria-label={`${item.name} beschikbaar`}
                    />
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => removeItem(index)}
                      aria-label="Verwijder gerecht"
                    >
                      <TablerIconSection icon={IconTrash} size={18} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {section.items.length === 0 ? (
          <Text ta="center" py="xl" size="sm" c="dimmed">
            Nog geen gerechten in deze categorie. Klik op &quot;Gerecht toevoegen&quot; om te beginnen.
          </Text>
        ) : null}

        <Stack gap="md" hiddenFrom="lg" px="md" py="md" style={{ borderTop: '1px solid #e8f4fb' }}>
          {section.items.map((item, index) => (
            <Stack key={`m-${item.id}`} gap="xs">
              <Text size="xs" c="dimmed" fw={600}>
                Omschrijving — {item.name}
              </Text>
              <Textarea
                rows={2}
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.currentTarget.value })}
              />
            </Stack>
          ))}
        </Stack>
      </AdminPanel>

      <Group justify="flex-end">
        <Button onClick={handleSave} loading={saving} color="navy">
          Wijzigingen opslaan
        </Button>
      </Group>
    </Stack>
  )
}
