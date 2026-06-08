/** Server-safe Tabler helpers (geen 'use client') */

export const TABLER_STROKE = 1.5

export function tablerProps(size: number, stroke = TABLER_STROKE) {
  return { size, stroke }
}

export {
  IconAlertCircle,
  IconAlertTriangle,
  IconBulb,
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconCalendarPlus,
  IconCheck,
  IconChevronRight,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconFileText,
  IconGripVertical,
  IconInbox,
  IconLayoutDashboard,
  IconLock,
  IconLogout,
  IconMenu2,
  IconPencil,
  IconPlus,
  IconSearch,
  IconToolsKitchen2,
  IconTrash,
  IconX,
} from '@tabler/icons-react'
