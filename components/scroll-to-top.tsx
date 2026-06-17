'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollPageToTop } from '@/lib/site/scroll'

export function ScrollToTop() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (window.location.hash) return
    scrollPageToTop()
  }, [pathname])

  return null
}
