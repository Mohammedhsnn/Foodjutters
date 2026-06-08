'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import { IconExternalLink, IconPencil, TablerIconSection } from '@/lib/admin/icons'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminPanel } from '@/components/admin/admin-panel'
import { AdminEmpty } from '@/components/admin/admin-states'
import type { ContentPageSummary } from '@/lib/admin/types'

export function ContentListClient({ pages }: { pages: ContentPageSummary[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return pages
    return pages.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.path.toLowerCase().includes(q),
    )
  }, [pages, query])

  return (
    <Stack gap="lg">
      <AdminPageHeader
        eyebrow="Contentbeheer"
        title="Pagina’s"
        description="Bewerk teksten per pagina. Opgeslagen wijzigingen zijn direct live."
        help={
          <AdminHelpBox title="Tip">
            Open een pagina via <strong>Bewerken</strong>. Gebruik het oog-icoon om de live versie te
            controleren.
          </AdminHelpBox>
        }
      />

      <TextInput
        label="Zoeken"
        description="Filter op paginanaam of webadres"
        placeholder="Bijv. menu, contact, over ons…"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        maw={{ base: '100%', sm: 420 }}
        aria-label="Zoek pagina's"
      />

      {filtered.length === 0 ? (
        <AdminEmpty
          title="Geen pagina's gevonden"
          description={
            query
              ? 'Geen pagina past bij uw zoekterm. Wis het zoekveld of probeer een andere naam.'
              : 'Er zijn nog geen pagina’s om te bewerken.'
          }
        />
      ) : (
        <AdminPanel
          title="Alle pagina’s"
          description="Klik op Bewerken om teksten aan te passen"
          padding={0}
        >
          <Table.ScrollContainer minWidth={520}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Pagina</Table.Th>
                  <Table.Th visibleFrom="sm">Pad</Table.Th>
                  <Table.Th visibleFrom="md">Laatst bijgewerkt</Table.Th>
                  <Table.Th ta="right">Acties</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filtered.map((page) => (
                  <Table.Tr key={page.slug}>
                    <Table.Td>
                      <Stack gap={2}>
                        <Text fw={600} c="navy.5">
                          {page.name}
                        </Text>
                        <Text size="xs" c="dimmed" hiddenFrom="sm">
                          {page.path}
                        </Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td visibleFrom="sm">
                      <Text size="sm" c="dimmed">
                        {page.path}
                      </Text>
                    </Table.Td>
                    <Table.Td visibleFrom="md">
                      <Text size="xs" c="dimmed">
                        {new Date(page.updatedAt).toLocaleString('nl-NL', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="flex-end" gap="xs" wrap="nowrap">
                        <Link href={page.path} target="_blank" style={{ lineHeight: 0 }}>
                          <ActionIcon variant="subtle" color="navy" aria-label="Bekijk live pagina">
                            <TablerIconSection icon={IconExternalLink} size={18} />
                          </ActionIcon>
                        </Link>
                        <Link href={`/admin/content/${page.slug}`} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="light"
                            color="brand"
                            size="compact-sm"
                            leftSection={<TablerIconSection icon={IconPencil} size={14} />}
                          >
                            Bewerken
                          </Button>
                        </Link>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </AdminPanel>
      )}
    </Stack>
  )
}
