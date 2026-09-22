'use client'

import { useEffect, useRef } from 'react'

/**
 * Adds a `scrolled` class to the nav element when the page scrolls
 * past 30px, triggering the backdrop-blur / border style.
 */
export function useNavScroll() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return navRef
}
