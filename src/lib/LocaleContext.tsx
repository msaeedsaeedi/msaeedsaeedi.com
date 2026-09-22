'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import type { Messages, Locale } from '@/i18n/types'
import { createTranslator } from '@/lib/translate'

interface LocaleContextValue {
  lang: Locale
  messages: Messages
  /** Dot-notation message lookup: t('nav.work') → "Work" */
  t: (path: string) => string | string[]
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({
  children,
  lang,
  messages,
}: {
  children: ReactNode
  lang: Locale
  messages: Messages
}) {
  const t = useMemo(() => createTranslator(messages), [messages])

  return (
    <LocaleContext.Provider value={{ lang, messages, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}

export function useTranslations() {
  const { t } = useLocale()
  return t
}
