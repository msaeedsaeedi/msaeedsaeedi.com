import type { Locale } from '@/i18n/config'

export const navItems = ['builds', 'journey', 'kalaam', 'albums', 'self'] as const
export type NavKey = (typeof navItems)[number] | 'contact' | 'home'

export function href(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '')
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

/** Same page, other language: /en/kalaam/x -> /ur/kalaam/x */
export function swapLocale(pathname: string, to: Locale): string {
  const parts = pathname.split('/')
  parts[1] = to
  return parts.join('/') || `/${to}`
}
