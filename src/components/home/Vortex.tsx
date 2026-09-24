'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

/**
 * VortexMe's emblem: an orchestrator at the core with agents orbiting it, each on
 * its own ring and at its own speed. Leans toward the cursor.
 */
export function Vortex() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, (v) => v * -18), { stiffness: 80, damping: 18 })
  const ry = useSpring(useTransform(mx, (v) => v * 18), { stiffness: 80, damping: 18 })
  const rings = 9

  return (
    <motion.div
      className="relative aspect-square w-full [perspective:900px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      aria-hidden
    >
      <motion.svg viewBox="-200 -200 400 400" className="h-full w-full" style={{ rotateX: rx, rotateY: ry }}>
        {Array.from({ length: rings }, (_, i) => {
          const r = 26 + i * 19
          const fresh = 1 - i / rings
          const dur = 14 + i * 7
          return (
            <motion.g key={i} animate={{ rotate: i % 2 ? -360 : 360 }} transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}>
              <circle
                r={r}
                fill="none"
                stroke={i % 3 === 0 ? 'var(--rose)' : 'var(--ink)'}
                strokeOpacity={0.15 + fresh * 0.6}
                strokeWidth={i % 3 === 0 ? 2 : 1}
                strokeDasharray={`${4 + i * 3} ${6 + i * 4}`}
              />
              <circle cx={r} cy={0} r={3.5 - i * 0.25} fill={i % 3 === 0 ? 'var(--rose)' : 'var(--gold)'} fillOpacity={0.3 + fresh * 0.7} />
            </motion.g>
          )
        })}
        <circle r={12} fill="var(--rose)" />
        <motion.circle r={12} fill="none" stroke="var(--rose)" animate={{ r: [12, 40], opacity: [0.6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
      </motion.svg>
    </motion.div>
  )
}
