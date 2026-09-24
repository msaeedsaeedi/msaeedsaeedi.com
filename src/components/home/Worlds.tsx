'use client'

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { localDigits } from '@/lib/format'
import type { Locale } from '@/i18n/config'

/** `alt` is the same title in the site's other language, shown as a quiet counterpart. */
export type World = { key: string; title: string; alt: string; body: string; href: string; count?: number; preview: ReactNode }

/**
 * The five sections of the site as large rows. On hover, a preview card
 * follows the cursor; on touch the preview sits inline instead.
 */
export function Worlds({ worlds, locale }: { worlds: World[]; locale: Locale }) {
  const [active, setActive] = useState<string | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 })
  const current = worlds.find((w) => w.key === active)

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {worlds.map((w) => (
          <li key={w.key} className="border-b border-line">
            <Link
              href={w.href}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(w.key)}
              onFocus={() => setActive(w.key)}
              onBlur={() => setActive(null)}
              className="group grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[5rem_1fr_1.1fr] md:py-9"
            >
              <span
                aria-hidden
                lang={locale === 'en' ? 'ur' : 'en'}
                className={`text-gold ${locale === 'en' ? 'font-gulzar text-xl' : 'font-sans text-sm font-semibold'}`}
              >
                {w.alt}
              </span>
              <span className="display h2 transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-rose rtl:group-hover:-translate-x-3">
                {w.title}
              </span>
              <span className="text-ink-2 md:max-w-md">
                {w.body}
                {w.count !== undefined && <span className="chip ms-3 align-middle">{localDigits(w.count, locale)}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            key="preview"
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-30 hidden h-60 w-80 overflow-hidden rounded-3xl shadow-2xl shadow-ink/20 [@media(hover:hover)]:block"
            style={{ x: sx, y: sy, translateX: '24px', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.key}
                className="absolute inset-0"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.preview}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
