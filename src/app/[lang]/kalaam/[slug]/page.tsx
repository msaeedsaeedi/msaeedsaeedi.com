import { notFound } from 'next/navigation'
import type { ComponentType } from 'react'
import { createTranslator } from '@/lib/translate'
import { getMessages } from '@/lib/messages'
import { poems } from '@/content/poems'
import { Reveal } from '@/components/Reveal'
import { Bilingual } from '@/components/Bilingual'
import Link from 'next/link'
import type { Locale } from '@/i18n/types'

// Statically imported poem components (MDX files)
import GhazalOne from '@/content/kalaam/ghazal-1.mdx'
import GhazalTwo from '@/content/kalaam/ghazal-2.mdx'
import GhazalThree from '@/content/kalaam/ghazal-3.mdx'
import GhazalFour from '@/content/kalaam/ghazal-4.mdx'

const LOCALES: Locale[] = ['en', 'ur']

const poemComponents: Record<string, ComponentType<{ locale: string }>> = {
  'ghazal-1': GhazalOne,
  'ghazal-2': GhazalTwo,
  'ghazal-3': GhazalThree,
  'ghazal-4': GhazalFour,
}

export async function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }))
}

export default function PoemPage({ params }: { params: { lang: string; slug: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) notFound()

  const { lang, slug } = params
  const locale = lang as Locale
  const messages = getMessages(locale)
  const t = createTranslator(messages)

  const poem = poems.find((p) => p.slug === slug)
  const PoemContent = poemComponents[slug]

  if (!poem || !PoemContent) notFound()

  const albumLabel =
    poem.albumId === 'gulab'
      ? (t('music.albums.gulab.title') as string)
      : (t('music.albums.wehm.title') as string)

  return (
    <section className="section">
      <div className="wrap verse-page">
        <Reveal>
          <Link href={`/${locale}/kalaam`} className="back-link">
            ← {t('kalaam.back') as string}
          </Link>
        </Reveal>

        <article className="verse-content">
          <PoemContent locale={locale} />
        </article>

        <Reveal>
          <div className="verse-page__listen">
            <Link
              href={`/${locale}/music`}
              className="btn btn-outline magnetic"
            >
              {t('kalaam.listen_to_album') as string} · {albumLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
