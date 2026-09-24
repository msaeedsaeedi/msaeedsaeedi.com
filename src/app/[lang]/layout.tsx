import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Gulzar, Newsreader, Noto_Nastaliq_Urdu } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { site } from '@content/site'
import { isLocale, localeMeta, publishedLocales } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/lib/metadata'
import { graph, personNode, websiteNode } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { scriptInit } from '@/components/kalaam/ScriptToggle'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/layout/Cursor'
import '../globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  axes: ['wdth', 'opsz'],
  display: 'swap',
})
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
})
// Urdu faces are large; let the browser fetch them only when Urdu glyphs appear.
const gulzar = Gulzar({ subsets: ['arabic'], weight: '400', variable: '--font-gulzar-face', display: 'swap', preload: false })
const nastaliq = Noto_Nastaliq_Urdu({ subsets: ['arabic'], variable: '--font-noto-nastaliq', display: 'swap', preload: false })

export const dynamicParams = false

export function generateStaticParams() {
  return publishedLocales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    ...pageMetadata(lang, ''),
    metadataBase: new URL(site.url),
    title: { default: dict.seo.homeTitle, template: `%s | ${dict.meta.siteTitle}` },
    applicationName: dict.meta.siteTitle,
    authors: [{ name: site.fullName.en, url: site.url }],
    creator: site.fullName.en,
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eceef3' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1022' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { dir, htmlLang } = localeMeta[lang]

  return (
    <html
      lang={htmlLang}
      dir={dir}
      suppressHydrationWarning
      className={`${bricolage.variable} ${newsreader.variable} ${gulzar.variable} ${nastaliq.variable}`}
    >
      <head>
        {/* Apply the saved Urdu/Roman reading preference before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: scriptInit }} />
      </head>
      <body>
        <Providers>
          <Cursor />
          <Header locale={lang} nav={dict.nav} controls={dict.controls} homeLabel={dict.nav.home} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={lang} dict={dict} />
        </Providers>
        <JsonLd data={graph(personNode(lang), websiteNode(lang))} />
      </body>
    </html>
  )
}
