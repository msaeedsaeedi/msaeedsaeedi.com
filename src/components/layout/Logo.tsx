import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href } from '@/lib/routes'

/**
 * Wordmark: both names in one. "saeed" (Mohammad Saeed) and "سعیدی" (the pen name)
 * joined by a slash, the way a path joins two directories. Always rendered LTR so
 * the mark looks identical on both language versions.
 */
export function Logo({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link href={href(locale)} aria-label={label} className="group inline-flex items-baseline gap-[0.18em] leading-none" dir="ltr">
      <span className="font-sans text-[1.3rem] font-bold tracking-[-0.04em]">saeed</span>
      <span
        aria-hidden
        className="inline-block origin-bottom text-[1.3rem] font-light text-rose transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[24deg]"
      >
        /
      </span>
      <span className="font-gulzar relative top-[0.12em] text-[1.35rem] text-gold">سعیدی</span>
    </Link>
  )
}
