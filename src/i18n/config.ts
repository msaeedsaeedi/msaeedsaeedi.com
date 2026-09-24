export const locales = ['en', 'ur'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeMeta: Record<Locale, { dir: 'ltr' | 'rtl'; label: string; htmlLang: string; ogLocale: string }> = {
  en: { dir: 'ltr', label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  ur: { dir: 'rtl', label: 'اردو', htmlLang: 'ur', ogLocale: 'ur_PK' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** A string in both site languages. Content files use this everywhere. */
export type L = { en: string; ur: string }

export function t(value: L, locale: Locale): string {
  return value[locale]
}
