'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import { IconCalendarPlus, IconEye, IconSearch, TablerIconSection } from '@/lib/admin/icons'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminPanel } from '@/components/admin/admin-panel'
import { AdminEmpty } from '@/components/admin/admin-states'
import { ReservationStatusBadge } from '@/components/admin/reservation-status-badge'
import { ReservationStatusLegend } from '@/components/admin/reservation-status-legend'
import {
  RESERVATION_STATUS_LABELS,
  type Reservation,
  type ReservationStatus,
} from '@/lib/admin/types'

const STATUS_OPTIONS: ReservationStatus[] = [
  'pending',
  'confirmed',
  'seated',
  'completed',
  'cancelled',
  'no_show',
]

export function ReservationsListClient({ reservations }: { reservations: Reservation[] }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>('all')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      if (statusFilter && statusFilter !== 'all' && r.status !== statusFilter) return false
      if (dateFilter && r.date !== dateFilter) return false
      const q = query.toLowerCase()
      if (!q) return true
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      )
    })
  }, [reservations, query, statusFilter, dateFilter])

  const statusSelectData = [
    { value: 'all', label: 'Alle statussen' },
    ...STATUS_OPTIONS.map((s) => ({ value: s, label: RESERVATION_STATUS_LABELS[s] })),
  ]

  return (
    <Stack gap="lg">
      <AdminPageHeader
        eyebrow="Reserveringen"
        title="Alle reserveringen"
        description="Alle reserveringen uit uw systeem — van de website en handmatig toegevoegd."
        actions={
          <Link href="/admin/reservations/new" style={{ textDecoration: 'none' }}>
            <Button
              color="navy"
              leftSection={<TablerIconSection icon={IconCalendarPlus} size={18} />}
            >
              Nieuwe reservering
            </Button>
          </Link>
        }
        help={
          <AdminHelpBox title="Status">
            <strong>In afwachting</strong> = nieuw. <strong>Bevestigd</strong> = tafel vastgelegd. Zie de
            legenda hieronder voor alle statussen.
          </AdminHelpBox>
        }
      />

      <ReservationStatusLegend />

      <Group align="flex-end" gap="md" wrap="wrap" className="admin-filters">
        <TextInput
          label="Zoeken"
          description="Naam, e-mail of telefoon"
          placeholder="Zoek op gast…"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leftSection={<TablerIconSection icon={IconSearch} size={16} />}
          style={{ flex: 1, minWidth: 200, maxWidth: 400 }}
        />
        <Select
          label="Status"
          data={statusSelectData}
          value={statusFilter}
          onChange={setStatusFilter}
          w={{ base: '100%', sm: 200 }}
          clearable={false}
        />
        <TextInput
          label="Datum"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.currentTarget.value)}
          w={{ base: '100%', sm: 180 }}
        />
        {query || (statusFilter && statusFilter !== 'all') || dateFilter ? (
          <Button
            variant="subtle"
            size="sm"
            onClick={() => {
              setQuery('')
              setStatusFilter('all')
              setDateFilter('')
            }}
          >
            Filters wissen
          </Button>
        ) : null}
      </Group>

      {filtered.length === 0 ? (
        <AdminEmpty
          title="Geen reserveringen"
          description="Pas filters aan of maak een nieuwe reservering aan."
          action={
            <Link href="/admin/reservations/new" style={{ textDecoration: 'none' }}>
              <Button color="navy" leftSection={<TablerIconSection icon={IconCalendarPlus} size={18} />}>
                Nieuwe reservering
              </Button>
            </Link>
          }
        />
      ) : (
        <AdminPanel title="Reserveringenlijst" description="Klik op Details om te bewerken" padding={0}>
          <Table.ScrollContainer minWidth={640}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Datum</Table.Th>
                  <Table.Th>Tijd</Table.Th>
                  <Table.Th>Gast</Table.Th>
                  <Table.Th visibleFrom="sm">Gasten</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th ta="right">Actie</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filtered.map((r) => (
                  <Table.Tr key={r.id}>
                    <Table.Td style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                      {r.date}
                    </Table.Td>
                    <Table.Td style={{ fontVariantNumeric: 'tabular-nums' }}>{r.time}</Table.Td>
                    <Table.Td>
                      <Stack gap={2}>
                        <Text fw={600} c="navy.5" truncate>
                          {r.name}
                        </Text>
                        <Text size="xs" c="dimmed" truncate visibleFrom="md">
                          {r.email}
                        </Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td visibleFrom="sm">{r.guests}</Table.Td>
                    <Table.Td>
                      <ReservationStatusBadge status={r.status} />
                    </Table.Td>
                    <Table.Td>
                      <Link href={`/admin/reservations/${r.id}`} style={{ textDecoration: 'none' }}>
                        <Button
                          variant="light"
                          color="brand"
                          size="compact-sm"
                          leftSection={<TablerIconSection icon={IconEye} size={14} />}
                        >
                          Details
                        </Button>
                      </Link>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          <Text size="xs" c="dimmed" px="md" py="sm" style={{ borderTop: '1px solid #c5e3f3' }}>
            {filtered.length} van {reservations.length} reserveringen
          </Text>
        </AdminPanel>
      )}
    </Stack>
  )
}
