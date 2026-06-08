export type ContentMeta = { label: string; value: string }

export type ContentBlock = {
  id: string
  key: string
  label: string
  type: 'text' | 'textarea' | 'json'
  value: string
}

export type ContentPage = {
  slug: string
  name: string
  path: string
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    meta: ContentMeta[]
  }
  blocks: ContentBlock[]
  updatedAt: string
}

/** Lightweight row for admin list views */
export type ContentPageSummary = {
  slug: string
  name: string
  path: string
  updatedAt: string
}

export type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  available: boolean
  sortOrder: number
}

export type MenuSection = {
  id: string
  title: string
  subtitle: string
  items: MenuItem[]
  sortOrder: number
}

/** Lightweight row for admin list views */
export type MenuSectionSummary = {
  id: string
  title: string
  subtitle: string
  sortOrder: number
  itemCount: number
  availableCount: number
}

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'seated'
  | 'completed'
  | 'cancelled'
  | 'no_show'

export type Reservation = {
  id: string
  date: string
  time: string
  guests: string
  name: string
  email: string
  phone: string
  notes: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: 'In afwachting',
  confirmed: 'Bevestigd',
  seated: 'Aan tafel',
  completed: 'Afgerond',
  cancelled: 'Geannuleerd',
  no_show: 'No-show',
}
