'use client'

import { ReactNode } from 'react'

/**
 * Inline bilingual content — renders the child that matches
 * the current locale.  Usage:
 *
 *   <Bilingual en="See the work" ur="کام دیکھیں" />
 *
 * Works in both client and server components because it does
 * not read context — pass the locale explicitly for SSR.
 */
export function Bilingual({ en, ur, locale }: {
  en: ReactNode
  ur: ReactNode
  locale: string
}) {
  if (locale === 'ur') {
    return <>{ur}</>
  }
  return <>{en}</>
}
