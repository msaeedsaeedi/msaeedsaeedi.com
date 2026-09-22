'use client'

import { useLayoutEffect } from 'react'

/**
 * Sets lang / dir / .lang-ur on <html> in a single pass
 * before the browser paints — avoids the flash of wrong
 * text direction that useEffect would cause.
 */
export function HtmlAttributes({ lang }: { lang: string }) {
  useLayoutEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ur' ? 'rtl' : 'ltr'
    html.classList.toggle('lang-ur', lang === 'ur')
  }, [lang])
  return null
}
