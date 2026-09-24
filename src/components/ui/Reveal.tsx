'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Masked rise: content slides up from behind its own baseline.
 * Used for headings only, so the page has one kind of entrance, not many.
 */
export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  // The observer sits on the (visible) mask, not on the hidden child, so it can actually intersect.
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.08em] ${className ?? ''}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Soft appearance for supporting blocks. */
export function Appear({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
