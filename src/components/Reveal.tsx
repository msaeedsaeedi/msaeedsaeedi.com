'use client'

import { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

/**
 * Wraps any element in a scroll-reveal animation.
 * Adds the `.reveal` base class and `.in` when the element
 * first enters the viewport (via IntersectionObserver).
 *
 * Falls back to always-visible when the user prefers reduced motion.
 */
export function Reveal({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  const ref = useReveal()

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  )
}
