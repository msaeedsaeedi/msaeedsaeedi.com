import type { Messages } from '@/i18n/types'

// Static imports for type checking that files exist
import enMessages from '@/i18n/en.json'
import urMessages from '@/i18n/ur.json'

export const messages: Record<string, Messages> = {
  en: enMessages as Messages,
  ur: urMessages as Messages,
}

export function getMessages(locale: string): Messages {
  return messages[locale] ?? messages.en
}
