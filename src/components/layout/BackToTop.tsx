'use client'

import { ArrowUp } from 'lucide-react'

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="meta group inline-flex items-center gap-2 hover:text-ink"
    >
      {label}
      <ArrowUp size={15} className="transition-transform duration-500 group-hover:-translate-y-1" />
    </button>
  )
}
