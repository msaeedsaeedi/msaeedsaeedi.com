'use client'

import { useEffect, useRef } from 'react'

/**
 * Updates a progress-bar element's width based on scroll position.
 * The element should have the `.progress-bar` class.
 */
export function useProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      const pct = total > 0 ? (doc.scrollTop / total) * 100 : 0
      bar.style.width = `${isFinite(pct) ? pct : 0}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initialise

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return barRef
}
