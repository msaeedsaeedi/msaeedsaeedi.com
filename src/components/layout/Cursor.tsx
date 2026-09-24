'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * A small dot that follows the pointer exactly, and a ring that trails it.
 * Elements can set data-cursor="label" to show a word inside an expanded ring
 * (e.g. "Read", "Play"). Only on fine pointers, never with reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hidden, setHidden] = useState(true)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const target = e.target as Element | null
      const interactive = target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
      setHovering(Boolean(interactive))
      setLabel(interactive?.getAttribute('data-cursor') ?? null)
    }
    const leave = () => setHidden(true)
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 84 : hovering ? 48 : 30

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: hidden ? 0 : 1, transition: 'opacity .3s' }}>
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full border border-rose"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: pressed ? 0.85 : 1,
          backgroundColor: label ? 'var(--rose)' : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {label && <span className="text-[11px] font-semibold text-white">{label}</span>}
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-rose"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </div>
  )
}
