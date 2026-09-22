'use client'

import { useEffect, useRef } from 'react'

/**
 * Combined card hover: magnetic offset + 3D tilt + radial
 * spotlight (via --mx / --my).  Also toggles the `cursor-hover`
 * body class so the custom cursor ring enlarges.
 *
 * Disabled on coarse pointers and when the user prefers
 * reduced motion.
 */
export function useCardHover<T extends HTMLElement = HTMLDivElement>() {
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
      const relX = (e.clientX - r.left - r.width / 2) * 0.22
      const relY = (e.clientY - r.top - r.height / 2) * 0.32
      const rxDeg = (py - 0.5) * -5
      const ryDeg = (px - 0.5) * 7

      el.style.transform =
        `translate(${relX}px, ${relY}px) ` +
        `perspective(900px) rotateX(${rxDeg}deg) rotateY(${ryDeg}deg)`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }

    const onLeave = () => {
      el.style.transform = ''
      document.body.classList.remove('cursor-hover')
    }

    const onEnter = () => document.body.classList.add('cursor-hover')

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}
