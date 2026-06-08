'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconPencil,
  IconPlus,
  IconToolsKitchen2,
  TablerIconSection,
  adminNotify,
  tablerProps,
} from '@/lib/admin/icons'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminEmpty } from '@/components/admin/admin-states'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { MenuSectionSummary } from '@/lib/admin/types'

export function MenuListClient({ sections }: { sections: MenuSectionSummary[] }) {
  const [query, setQuery] = useState('')
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return sections
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q),
    )
  }, [sections, query])

  const totalItems = sections.reduce((n, s) => n + s.itemCount, 0)

  async function addSection() {
    setCreating(true)
    try {
      const data = await adminFetch<{ section: { id: string } }>('/api/admin/menu', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Nieuwe categorie',
          subtitle: '',
          items: [],
          sortOrder: sections.length,
        }),
      })
      adminNotify.success('Categorie aangemaakt')
      window.location.href = `/admin/menu/${data.section.id}`
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Aanmaken mislukt')
    } finally {
      setCreating(false)
    }
  }

  return (
    <Stack gap="lg">
      <AdminPageHeader
        eyebrow="Menu beheer"
        title="Menu categorieën"
        description={`Beheer wat er op uw menukaart staat: ${sections.length} categorieën met ${totalItems} gerechten.`}
        actions={
          <Button
            onClick={addSection}
            loading={creating}
            color="navy"
            leftSection={<TablerIconSection icon={IconPlus} size={18} />}
          >
            Nieuwe categorie
          </Button>
        }
        help={
          <AdminHelpBox title="Tip">
            Open een categorie om gerechten te bewerken. Zet <strong>Beschikbaar</strong> uit om een gerecht
            tijdelijk te verbergen.
          </AdminHelpBox>
        }
      />

      <TextInput
        label="Zoeken"
        description="Zoek op categorienaam"
        placeholder="Bijv. pizza, borrel, dessert…"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        maw={{ base: '100%', sm: 420 }}
        aria-label="Zoek categorie"
      />

      {filtered.length === 0 ? (
        <AdminEmpty
          title="Geen categorieën"
          description="Maak een categorie aan om het menu te vullen."
          action={
            <Button
              onClick={addSection}
              loading={creating}
              color="navy"
              leftSection={<TablerIconSection icon={IconPlus} size={18} />}
            >
              Eerste categorie
            </Button>
          }
        />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {filtered.map((section) => (
            <Link
              key={section.id}
              href={`/admin/menu/${section.id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
            >
              <Card padding="lg" radius="lg" withBorder shadow="sm" className="admin-card-hover h-full">
                <Group justify="space-between" align="flex-start" mb="md">
                  <ThemeIcon size={40} radius="md" variant="light" color="brand">
                    <IconToolsKitchen2 {...tablerProps(20)} />
                  </ThemeIcon>
                  <Badge variant="light" color="navy">
                    {section.itemCount} gerechten
                  </Badge>
                </Group>
                <Title order={3} c="navy.5" mb={4}>
                  {section.title}
                </Title>
                <Text size="sm" c="dimmed" lineClamp={2}>
                  {section.subtitle}
                </Text>
                <Text size="xs" c="dimmed" mt="sm">
                  {section.availableCount} van {section.itemCount} zichtbaar op de website
                </Text>
                <Group gap={6} mt="md" c="navy.5">
                  <TablerIconSection icon={IconPencil} size={14} />
                  <Text size="sm" fw={600}>
                    Categorie openen
                  </Text>
                </Group>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  )
}
