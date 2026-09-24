'use client'

import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * The display name, letter by letter. Letters near the cursor swell in weight and
 * width (Bricolage Grotesque's variable axes), so the name answers the pointer.
 * Falls back to static type for touch and reduced motion.
 */
export function ProximityName({ lines, radius = 220 }: { lines: string[]; radius?: number }) {
  const root = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-letter]'))
    let raf = 0
    let mx = -9999
    let my = -9999
    // Each letter eases toward its target so the effect breathes rather than snaps.
    const state = letters.map(() => 0)

    const tick = () => {
      raf = 0
      let moving = false
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect()
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2))
        const want = Math.max(0, 1 - d / radius)
        state[i] += (want - state[i]) * 0.18
        if (Math.abs(want - state[i]) > 0.002) moving = true
        const k = state[i] * state[i] * (3 - 2 * state[i]) // smoothstep
        l.style.fontVariationSettings = `'wght' ${Math.round(700 + 100 * k)}, 'wdth' ${(88 + 12 * k).toFixed(1)}, 'opsz' 96`
        l.style.transform = `translateY(${(-0.04 * k).toFixed(3)}em)`
        // Letters under the pen take on a little of its ink.
        l.style.color = k > 0.01 ? `color-mix(in oklab, var(--ink), var(--rose) ${Math.round(k * 70)}%)` : ''
      })
      if (moving) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      mx = my = -9999
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [radius])

  return (
    <>
    <span className="sr-only">{lines.join(' ')}</span>
    <span ref={root} className="block" aria-hidden>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block whitespace-nowrap"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease }}
          >
            {[...line].map((ch, j) => (
              <span key={j} data-letter className="inline-block will-change-[font-variation-settings]">
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </span>
    </>
  )
}
