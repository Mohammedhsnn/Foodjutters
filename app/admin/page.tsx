import Link from 'next/link'
import {
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconArrowRight,
  IconCalendar,
  IconFileText,
  IconToolsKitchen2,
  tablerProps,
} from '@/lib/admin/tabler'
import { AdminHelpBox } from '@/components/admin/admin-help'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminPanel } from '@/components/admin/admin-panel'
import { AdminSection } from '@/components/admin/admin-section'
import { AdminStatCard } from '@/components/admin/admin-stat-card'
import { AdminEmpty } from '@/components/admin/admin-states'
import { ReservationStatusBadge } from '@/components/admin/reservation-status-badge'
import { ReservationStatusLegend } from '@/components/admin/reservation-status-legend'
import { ADMIN_MODULES, type AdminSection } from '@/lib/admin/page-meta'
import {
  getContentPagesSummary,
  getMenuSectionsSummary,
  getReservations,
} from '@/lib/admin/store'

const MODULE_ICONS = {
  content: IconFileText,
  menu: IconToolsKitchen2,
  reservations: IconCalendar,
} as const

function moduleStat(
  section: AdminSection,
  pageCount: number,
  sectionCount: number,
  itemCount: number,
  pending: number,
  upcoming: number,
) {
  switch (section) {
    case 'content':
      return `${pageCount} pagina${pageCount === 1 ? '' : '’s'}`
    case 'menu':
      return `${sectionCount} categorieën · ${itemCount} gerechten`
    case 'reservations':
      return `${pending} open · ${upcoming} komend`
    default:
      return ''
  }
}

export default async function AdminDashboardPage() {
  const [pages, sections, reservations] = await Promise.all([
    getContentPagesSummary(),
    getMenuSectionsSummary(),
    getReservations(),
  ])

  const itemCount = sections.reduce((n, s) => n + s.itemCount, 0)
  const pending = reservations.filter((r) => r.status === 'pending').length
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = reservations.filter(
    (r) => r.date >= today && !['cancelled', 'completed', 'no_show'].includes(r.status),
  ).length

  return (
    <Stack gap="xl">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Overzicht"
        description="Beheer teksten, menu en reserveringen vanuit één plek."
        help={
          <AdminHelpBox title="Kort uitgelegd">
            Kies een onderdeel, pas aan en klik op <strong>Opslaan</strong>. Wijzigingen staan direct op de
            website.
          </AdminHelpBox>
        }
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        <AdminStatCard
          label="Pagina’s"
          value={pages.length}
          hint="Bewerkbare websitepagina’s"
          icon={IconFileText}
        />
        <AdminStatCard
          label="Gerechten"
          value={itemCount}
          hint={`${sections.length} menucategorieën`}
          icon={IconToolsKitchen2}
        />
        <AdminStatCard
          label="Reserveringen"
          value={reservations.length}
          hint={`${pending} wachten op bevestiging`}
          icon={IconCalendar}
        />
      </SimpleGrid>

      <AdminSection
        title="Onderdelen"
        description="Ga direct naar content, menu of reserveringen."
      >
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          {ADMIN_MODULES.map(({ href, label, description, actionLabel, section }) => {
            const Icon = MODULE_ICONS[section as keyof typeof MODULE_ICONS]
            const stat = moduleStat(section, pages.length, sections.length, itemCount, pending, upcoming)
            return (
              <Link
                key={href}
                href={href}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
              >
                <Card padding="lg" radius="lg" withBorder shadow="sm" className="admin-card-hover h-full">
                  <ThemeIcon size={40} radius="md" variant="light" color="brand" mb="md">
                    <Icon {...tablerProps(20)} />
                  </ThemeIcon>
                  <Title order={4} c="navy.5" mb={4}>
                    {label}
                  </Title>
                  <Text size="sm" c="dimmed" lh={1.5} mb="sm" lineClamp={2}>
                    {description}
                  </Text>
                  <Text size="xs" c="brand.6" fw={600} mb="md">
                    {stat}
                  </Text>
                  <Group gap={6} c="navy.5">
                    <Text size="sm" fw={600}>
                      {actionLabel}
                    </Text>
                    <IconArrowRight {...tablerProps(16)} />
                  </Group>
                </Card>
              </Link>
            )
          })}
        </SimpleGrid>
      </AdminSection>

      <AdminPanel
        title="Recente reserveringen"
        description="Laatste aanvragen uit uw database"
        actions={
          <Link href="/admin/reservations" style={{ textDecoration: 'none' }}>
            <Button variant="light" color="brand" size="compact-sm">
              Alles bekijken
            </Button>
          </Link>
        }
      >
        {reservations.length === 0 ? (
          <AdminEmpty
            compact
            title="Nog geen reserveringen"
            description="Zodra gasten via de website reserveren, verschijnen ze hier."
            action={
              <Link href="/admin/reservations/new" style={{ textDecoration: 'none' }}>
                <Button color="navy" size="sm">
                  Handmatig toevoegen
                </Button>
              </Link>
            }
          />
        ) : (
          <>
            <Stack gap={0}>
              {reservations.slice(0, 5).map((r) => (
                <Link
                  key={r.id}
                  href={`/admin/reservations/${r.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    borderBottom: '1px solid #e8f4fb',
                  }}
                  className="admin-table-row"
                >
                  <Group justify="space-between" wrap="wrap" gap="sm" px="md" py="sm">
                    <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                      <Text fw={600} c="navy.5" truncate>
                        {r.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {r.date} · {r.time} · {r.guests} gasten
                      </Text>
                    </Stack>
                    <ReservationStatusBadge status={r.status} />
                  </Group>
                </Link>
              ))}
            </Stack>
            <Group px="md" py="sm" style={{ borderTop: '1px solid #e8f4fb', background: '#fafcfe' }}>
              <ReservationStatusLegend />
            </Group>
          </>
        )}
      </AdminPanel>
    </Stack>
  )
}
