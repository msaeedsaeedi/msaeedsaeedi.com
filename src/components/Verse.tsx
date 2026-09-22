'use client'

import { ReactNode } from 'react'

/**
 * Renders a poetry verse only when its `lang` prop matches the
 * current `locale`.  Used inside MDX poetry files:
 *
 *   <Verse lang="ur" locale={locale}>میری آگ پھر سے …</Verse>
 *   <Verse lang="en" locale={locale}>My fire burns again …</Verse>
 *
 * The `locale` prop flows from the page (SSR-safe).
 */
export function Verse({ lang, locale, children }: {
  lang: 'en' | 'ur'
  locale: string
  children: ReactNode
}) {
  if (lang !== locale) return null

  const className = lang === 'ur' ? 'verse verse--ur' : 'verse verse--en'

  return <div className={className}>{children}</div>
}
