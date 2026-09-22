import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { LocaleProvider } from '@/lib/LocaleContext'
import { getMessages } from '@/lib/messages'
import { HtmlAttributes } from '@/components/HtmlAttributes'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { ProgressBar } from '@/components/ProgressBar'
import type { Locale } from '@/i18n/types'

const LOCALES: Locale[] = ['en', 'ur']

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: Locale }
}) {
  const { lang } = params
  if (!LOCALES.includes(lang)) {
    notFound()
  }

  const messages = getMessages(lang)

  return (
    <LocaleProvider lang={lang} messages={messages}>
      <HtmlAttributes lang={lang} />
      <Header />
      <Cursor />
      <ProgressBar />
      <main>{children}</main>
      <Footer />
    </LocaleProvider>
  )
}
