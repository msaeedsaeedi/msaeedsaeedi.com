'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticLinkProps {
  href: string
  children: ReactNode
  className?: string
  ariaCurrent?: boolean
}

/**
 * Next.js Link with the magnetic hover offset.
 * Use for CTA buttons, nav links, footer links.
 */
export function MagneticLink({ href, children, className = '', ariaCurrent = false }: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>()

  return (
    <Link
      ref={ref}
      href={href}
      className={`magnetic ${className}`.trim()}
      aria-current={ariaCurrent ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
