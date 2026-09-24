'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Every route change: the new page rises in from a soft blur. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      // transitionEnd clears filter/transform so fixed-position children aren't trapped.
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none', transform: 'none' } }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
