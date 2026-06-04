import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  Clock,
  Flame,
  Heart,
  Leaf,
  Star,
  Sunset,
  Users,
  Utensils,
  Waves,
  Sparkles,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Sunset,
  Utensils,
  Flame,
  Users,
  Waves,
  Sparkles,
  Heart,
  Leaf,
  Star,
  Calendar,
  Clock,
}

export function resolveIcon(name: string, fallback: LucideIcon = Utensils): LucideIcon {
  return ICON_MAP[name] ?? fallback
}
