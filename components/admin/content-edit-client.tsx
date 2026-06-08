'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconPlus, IconTrash, TablerIconSection, adminNotify } from '@/lib/admin/icons'
import { AdminBackButton } from '@/components/admin/admin-back-button'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { adminFetch, ApiError } from '@/lib/admin/api'
import type { ContentBlock, ContentPage } from '@/lib/admin/types'

export function ContentEditClient({ initialPage }: { initialPage: ContentPage }) {
  const [page, setPage] = useState(initialPage)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const data = await adminFetch<{ page: ContentPage }>(`/api/admin/content/${page.slug}`, {
        method: 'PUT',
        body: JSON.stringify(page),
      })
      setPage(data.page)
      adminNotify.success('Opgeslagen', 'Uw wijzigingen staan nu op de website')
    } catch (e) {
      adminNotify.error('Fout', e instanceof ApiError ? e.message : 'Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  function updateHero(field: keyof ContentPage['hero'], value: string) {
    setPage({ ...page, hero: { ...page.hero, [field]: value } })
  }

  function updateMeta(index: number, field: 'label' | 'value', value: string) {
    const meta = [...page.hero.meta]
    meta[index] = { ...meta[index], [field]: value }
    setPage({ ...page, hero: { ...page.hero, meta } })
  }

  function addMeta() {
    setPage({
      ...page,
      hero: { ...page.hero, meta: [...page.hero.meta, { label: '', value: '' }] },
    })
  }

  function removeMeta(index: number) {
    setPage({
      ...page,
      hero: { ...page.hero, meta: page.hero.meta.filter((_, i) => i !== index) },
    })
  }

  function updateBlock(index: number, field: keyof ContentBlock, value: string) {
    const blocks = [...page.blocks]
    blocks[index] = { ...blocks[index], [field]: value }
    setPage({ ...page, blocks })
  }

  return (
    <Stack gap="lg" pb="xl">
      <Group wrap="wrap" justify="space-between">
        <AdminBackButton href="/admin/content" label="Terug naar alle pagina’s" />
        <Link href={page.path} target="_blank" style={{ textDecoration: 'none' }}>
          <Button variant="light" color="brand">
            Bekijk live pagina
          </Button>
        </Link>
      </Group>

      <AdminPageHeader
        title={page.name}
        description={`U bewerkt nu: ${page.path}`}
        actions={
          <Button onClick={handleSave} loading={saving} color="navy">
            Wijzigingen opslaan
          </Button>
        }
        help={
          <AdminHelpBox title="Let op">
            Pas teksten aan en klik onderaan of bovenaan op <strong>Wijzigingen opslaan</strong>. Pas daarna
            eventueel de live pagina om te controleren of alles klopt.
          </AdminHelpBox>
        }
      />

      <Card padding="lg" radius="lg" withBorder shadow="sm">
        <Title order={3} c="navy.5" mb={4}>
          Bovenkant van de pagina
        </Title>
        <Text size="sm" c="dimmed" mb="lg">
          De grote kop en intro die bezoekers als eerste zien
        </Text>
        <Stack gap="md">
          <TextInput
            label="Eyebrow"
            value={page.hero.eyebrow}
            onChange={(e) => updateHero('eyebrow', e.currentTarget.value)}
          />
          <TextInput
            label="Titel"
            value={page.hero.title}
            onChange={(e) => updateHero('title', e.currentTarget.value)}
          />
          <Textarea
            label="Ondertitel"
            rows={3}
            value={page.hero.subtitle}
            onChange={(e) => updateHero('subtitle', e.currentTarget.value)}
          />
        </Stack>

        <Divider my="lg" />

        <Group justify="space-between" mb="md">
          <Text fw={600} size="sm">
            Meta-regels
          </Text>
          <Button variant="light" size="xs" leftSection={<TablerIconSection icon={IconPlus} size={14} />} onClick={addMeta}>
            Regel
          </Button>
        </Group>
        <Stack gap="sm">
          {page.hero.meta.map((m, i) => (
            <Group key={i} align="flex-end" wrap="nowrap" gap="sm">
              <TextInput
                placeholder="Label"
                value={m.label}
                onChange={(e) => updateMeta(i, 'label', e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                placeholder="Waarde"
                value={m.value}
                onChange={(e) => updateMeta(i, 'value', e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => removeMeta(i)}
                aria-label="Verwijder meta-regel"
              >
                <TablerIconSection icon={IconTrash} size={18} />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </Card>

      <Card padding="lg" radius="lg" withBorder shadow="sm">
        <Title order={3} c="navy.5" mb={4}>
          Extra teksten
        </Title>
        <Text size="sm" c="dimmed" mb="lg">
          Aanvullende stukken tekst verderop op de pagina
        </Text>
        <Stack gap="lg">
          {page.blocks.map((block, i) => (
            <Stack key={block.id} gap="xs" p="md" style={{ border: '1px solid #c5e3f3', borderRadius: 8 }}>
              <Text size="sm" fw={600}>
                {block.label}
              </Text>
              {block.type === 'textarea' || block.type === 'json' ? (
                <Textarea
                  rows={block.type === 'json' ? 8 : 4}
                  value={block.value}
                  onChange={(e) => updateBlock(i, 'value', e.currentTarget.value)}
                  styles={
                    block.type === 'json'
                      ? { input: { fontFamily: 'monospace', fontSize: 12 } }
                      : undefined
                  }
                />
              ) : (
                <TextInput
                  value={block.value}
                  onChange={(e) => updateBlock(i, 'value', e.currentTarget.value)}
                />
              )}
            </Stack>
          ))}
          {page.blocks.length === 0 ? (
            <Text size="sm" c="dimmed">
              Geen extra blokken voor deze pagina.
            </Text>
          ) : null}
        </Stack>
      </Card>

      <Group justify="flex-end">
        <Button onClick={handleSave} loading={saving} color="navy">
          Wijzigingen opslaan
        </Button>
      </Group>
    </Stack>
  )
}
