'use client'

import { useProgressBar } from '@/hooks/useProgressBar'

export function ProgressBar() {
  const barRef = useProgressBar()
  return <div ref={barRef} className="progress-bar" />
}
