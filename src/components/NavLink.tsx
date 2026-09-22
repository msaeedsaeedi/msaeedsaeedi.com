'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface NavLinkProps {
  href: string
  label: string
  isActive?: boolean
  className?: string
}

/**
 * Navigation link with magnetic hover offset.
 * Renders a Next.js Link with the `magnetic` class.
 */
export function NavLink({ href, label, isActive, className = '' }: NavLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>()

  return (
    <Link
      ref={ref}
      href={href}
      className={`nav__link magnetic${isActive ? ' active' : ''}${className ? ` ${className}` : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}
