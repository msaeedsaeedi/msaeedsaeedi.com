'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from '@/lib/LocaleContext'
import { Locale } from '@/i18n/types'

/**
 * Swaps the locale segment in the current URL.
 * e.g. /en/work → /ur/work
 */
export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, messages } = useLocale()

  const toggle = () => {
    const next: Locale = lang === 'en' ? 'ur' : 'en'
    // Replace the first path segment (the locale) with the new one.
    const segments = pathname.split('/')
    if (segments[1] === lang) segments[1] = next
    const target = segments.join('/') || `/${next}`

    // Fade transition (mirrors original behaviour)
    document.body.style.opacity = '0.35'
    setTimeout(() => {
      router.push(target)
      document.body.style.opacity = '1'
    }, 180)
  }

  return (
    <button
      type="button"
      className="lang-toggle magnetic"
      onClick={toggle}
      aria-label="Toggle language"
    >
      <span className="opt en-opt">EN</span>
      <span className="opt">/</span>
      <span className="opt ur-opt" lang="ur" dir="rtl">
        اردو
      </span>
    </button>
  )
}
