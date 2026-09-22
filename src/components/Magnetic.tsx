'use client'

import { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

/**
 * Wraps any content in a div that follows the cursor
 * with a subtle magnetic offset on mouse move.
 *
 * Cursor-enlarge behaviour is added via the `cursor-hover`
 * body class (handled inside useMagnetic).
 */
export function Magnetic({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  const ref = useMagnetic()
  return (
    <div ref={ref} className={`magnetic ${className}`.trim()}>
      {children}
    </div>
  )
}
