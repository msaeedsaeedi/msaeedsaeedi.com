'use client'

import { useEffect, useRef } from 'react'

/**
 * 3D tilt + spotlight on card hover.
 * Sets CSS custom properties --mx / --my for the radial-spotlight
 * pseudo-element and applies a perspective transform.
 * Disabled on coarse pointers and when the user prefers reduced motion.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rxDeg = (py - 0.5) * -5
      const ryDeg = (px - 0.5) * 7

      el.style.transform = `perspective(900px) rotateX(${rxDeg}deg) rotateY(${ryDeg}deg)`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }

    const onLeave = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.addEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}
