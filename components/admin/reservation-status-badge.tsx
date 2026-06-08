import { Badge } from '@mantine/core'
import {
  RESERVATION_STATUS_LABELS,
  type ReservationStatus,
} from '@/lib/admin/types'

const COLORS: Record<ReservationStatus, string> = {
  pending: 'yellow',
  confirmed: 'brand',
  seated: 'blue',
  completed: 'gray',
  cancelled: 'red',
  no_show: 'red',
}

export function ReservationStatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <Badge variant="light" color={COLORS[status]} radius="xl" size="sm" style={{ textTransform: 'none' }}>
      {RESERVATION_STATUS_LABELS[status]}
    </Badge>
  )
}
