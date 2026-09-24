'use client'

import { Check, Copy } from 'lucide-react'
import { useState, type ReactNode } from 'react'

export function CopyButton({
  text,
  label,
  done,
  className = 'btn btn-ghost',
  icon = true,
  children,
}: {
  text: string
  label: string
  done: string
  className?: string
  icon?: boolean
  children?: ReactNode
}) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {
          /* clipboard blocked: the text is still selectable on the page */
        }
      }}
    >
      {icon && (copied ? <Check size={16} /> : <Copy size={16} />)}
      <span aria-live="polite">{copied ? done : (children ?? label)}</span>
    </button>
  )
}
