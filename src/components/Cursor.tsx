'use client'

import { useCursor } from '@/hooks/useCursor'

/**
 * Two fixed-position elements: a dot that follows the cursor
 * directly and a ring that lags behind via lerp.
 */
export function Cursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
