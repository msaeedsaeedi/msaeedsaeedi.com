import { notFound } from 'next/navigation'
import { createTranslator } from '@/lib/translate'
import { getMessages } from '@/lib/messages'
import { poems } from '@/content/poems'
import { Reveal } from '@/components/Reveal'
import { Bilingual } from '@/components/Bilingual'
import Link from 'next/link'
import type { Locale } from '@/i18n/types'

const LOCALES: Locale[] = ['en', 'ur']

export default function KalaamIndexPage({ params }: { params: { lang: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) notFound()

  const locale = params.lang as Locale
  const messages = getMessages(locale)
  const t = createTranslator(messages)

  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="section__head">
            <h1 className="section__title">{t('kalaam.title') as string}</h1>
            <p className="section__intro">{t('kalaam.index.intro') as string}</p>
          </div>
        </Reveal>

        <div className="poem-grid">
          {poems.map((poem) => {
            const albumLabel =
              poem.albumId === 'gulab'
                ? (t('music.albums.gulab.title') as string)
                : (t('music.albums.wehm.title') as string)

            return (
              <Reveal key={poem.slug}>
                <Link
                  href={`/${locale}/kalaam/${poem.slug}`}
                  className="poem-card magnetic"
                >
                  <span className="poem-card__tag">
                    {t('kalaam.index.ghazal_tag') as string}
                  </span>

                  <div className="poem-card__verse">
                    <Bilingual
                      locale={locale}
                      en={<>{poem.snippetEn}</>}
                      ur={<span className="poem-card__verse--ur">{poem.snippetUr}</span>}
                    />
                  </div>

                  <div className="poem-card__foot">
                    <span className="poem-card__track">
                      {t('kalaam.track_prefix') as string} {poem.track}
                      {' '}
                      {t('kalaam.album_prefix') as string}{' '}
                      {albumLabel}
                    </span>
                    <span className="poem-card__link">
                      {t('kalaam.all_verses') as string}
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
