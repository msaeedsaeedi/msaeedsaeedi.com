const URDU_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** 2026 -> ۲۰۲۶ */
export function urduDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => URDU_DIGITS[Number(d)])
}

export function localDigits(value: number | string, locale: 'en' | 'ur'): string {
  return locale === 'ur' ? urduDigits(value) : String(value)
}

export function formatDuration(ms: number, locale: 'en' | 'ur'): string {
  const total = Math.round(ms / 1000)
  const m = Math.floor(total / 60)
  const s = String(total % 60).padStart(2, '0')
  return localDigits(`${m}:${s}`, locale)
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
