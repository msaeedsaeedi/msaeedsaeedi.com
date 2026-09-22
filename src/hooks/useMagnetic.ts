'use client'

import { useEffect, useRef } from 'react'

/**
 * Magnetic hover — the element subtly follows the cursor.
 * Disabled on coarse pointers and when the user prefers reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const relX = (e.clientX - r.left - r.width / 2) * 0.22
      const relY = (e.clientY - r.top - r.height / 2) * 0.32
      el.style.transform = `translate(${relX}px, ${relY}px)`
    }

    const onClean = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onClean)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onClean)
    }
  }, [])

  return ref
}
