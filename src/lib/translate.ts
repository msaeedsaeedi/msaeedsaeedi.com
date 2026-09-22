import type { Messages } from '@/i18n/types'

/**
 * Creates a dot-notation translator from a messages object.
 * Works in both server and client components.
 *
 * Usage:
 *   const t = createTranslator(messages)
 *   t('nav.work')        → "Work" | "کام"
 *   t('hero.cta.work')   → "See the work" | "کام دیکھیں"
 */
export function createTranslator(messages: Messages) {
  return (path: string): string | string[] => {
    const keys = path.split('.')
    let value: unknown = messages
    for (const key of keys) {
      value = (value as Record<string, unknown> | undefined)?.[key]
      if (value === undefined) return ''
    }
    return value as string | string[]
  }
}
