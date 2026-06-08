import type { TablerIcon } from '@tabler/icons-react'
import {
  IconCalendar,
  IconClock,
  IconFlame,
  IconHeart,
  IconLeaf,
  IconSparkles,
  IconStar,
  IconSunset2,
  IconToolsKitchen2,
  IconUsers,
  IconWaveSine,
} from '@tabler/icons-react'

/** CMS-iconnamen (zonder Icon-prefix) → Tabler */
const ICON_MAP: Record<string, TablerIcon> = {
  Sunset: IconSunset2,
  Utensils: IconToolsKitchen2,
  Flame: IconFlame,
  Users: IconUsers,
  Waves: IconWaveSine,
  Sparkles: IconSparkles,
  Heart: IconHeart,
  Leaf: IconLeaf,
  Star: IconStar,
  Calendar: IconCalendar,
  Clock: IconClock,
}

export function resolveIcon(name: string, fallback: TablerIcon = IconToolsKitchen2): TablerIcon {
  return ICON_MAP[name] ?? fallback
}
