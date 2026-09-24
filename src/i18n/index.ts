import 'server-only'
import type { Locale } from './config'
import en from './en'
import ur from './ur'

const dictionaries = { en, ur }

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
export type { Dictionary } from './en'
