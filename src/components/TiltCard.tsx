'use client'

import { ReactNode } from 'react'
import { useCardHover } from '@/hooks/useCardHover'

/**
 * Card with combined 3D tilt + magnetic offset + radial
 * spotlight.  The spotlight uses CSS variables `--mx` / `--my`
 * rendered via a pseudo-element on the card.
 *
 * Disabled on coarse pointers / reduced motion.
 */
export function TiltCard({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  const ref = useCardHover()
  return (
    <div ref={ref} className={`tilt-card ${className}`.trim()}>
      {children}
    </div>
  )
}
