import { Group, Text } from '@mantine/core'
import { RESERVATION_STATUS_LABELS, type ReservationStatus } from '@/lib/admin/types'
import { ReservationStatusBadge } from '@/components/admin/reservation-status-badge'

const LEGEND: ReservationStatus[] = ['pending', 'confirmed', 'seated', 'completed', 'cancelled']

export function ReservationStatusLegend() {
  return (
    <Group gap="xs" wrap="wrap">
      <Text size="xs" c="dimmed" fw={600}>
        Status:
      </Text>
      {LEGEND.map((status) => (
        <ReservationStatusBadge key={status} status={status} />
      ))}
      <Text size="xs" c="dimmed" hiddenFrom="sm">
        {RESERVATION_STATUS_LABELS.no_show}
      </Text>
    </Group>
  )
}
