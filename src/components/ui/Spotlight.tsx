'use client'

import type { ComponentPropsWithoutRef, ElementType } from 'react'

/** Any element that glows where the cursor is. Pair with the `.spot` CSS class. */
export function Spotlight<T extends ElementType = 'div'>({
  as,
  className = '',
  ...rest
}: { as?: T } & ComponentPropsWithoutRef<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      {...rest}
      className={`spot ${className}`}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    />
  )
}
