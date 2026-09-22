'use client'

import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a dot that follows the mouse directly and a ring
 * that lags with a lerp. Adds hover/Press states for interactive elements.
 * Disabled on coarse pointers and when the user prefers reduced motion.
 */
export function useCursor(enabled = true) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (coarsePointer || reduceMotion) return

    document.body.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      requestAnimationFrame(loop)
    }

    const onMouseDown = () => document.body.classList.add('cursor-down')
    const onMouseUp = () => document.body.classList.remove('cursor-down')

    const onHoverEnter = () => document.body.classList.add('cursor-hover')
    const onHoverLeave = () => document.body.classList.remove('cursor-hover')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    document.querySelectorAll('a, button, .magnetic, .tilt-card, .preview-card').forEach((el) => {
      el.addEventListener('mouseenter', onHoverEnter)
      el.addEventListener('mouseleave', onHoverLeave)
    })

    const raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.querySelectorAll('a, button, .magnetic, .tilt-card, .preview-card').forEach((el) => {
        el.removeEventListener('mouseenter', onHoverEnter)
        el.removeEventListener('mouseleave', onHoverLeave)
      })
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  return { dotRef, ringRef }
}
