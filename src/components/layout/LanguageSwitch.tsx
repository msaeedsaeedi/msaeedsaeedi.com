'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { swapLocale } from '@/lib/routes'

/** Links to the same page in the other language and remembers the choice for "/". */
export function LanguageSwitch({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const pathname = usePathname() ?? `/${locale}`
  const to: Locale = locale === 'en' ? 'ur' : 'en'
  return (
    <Link
      href={swapLocale(pathname, to)}
      hrefLang={to}
      lang={to}
      aria-label={label}
      title={label}
      onClick={() => {
        document.cookie = `locale=${to}; path=/; max-age=31536000; samesite=lax`
      }}
      className={`grid h-10 min-w-10 place-items-center rounded-full border border-line px-3 transition-colors hover:border-rose hover:text-rose ${
        to === 'ur' ? 'font-gulzar pb-1 text-[1.05rem]' : 'font-sans text-sm font-semibold'
      }`}
    >
      {short}
    </Link>
  )
}
