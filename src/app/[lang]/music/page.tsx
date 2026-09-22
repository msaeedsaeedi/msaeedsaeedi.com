import { notFound } from 'next/navigation'
import { createTranslator } from '@/lib/translate'
import { getMessages } from '@/lib/messages'
import { albums } from '@/lib/data'
import { Reveal } from '@/components/Reveal'
import { TiltCard } from '@/components/TiltCard'
import Link from 'next/link'
import type { Locale } from '@/i18n/types'

const LOCALES: Locale[] = ['en', 'ur']

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

export default function MusicPage({ params }: { params: { lang: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) notFound()

  const locale = params.lang as Locale
  const messages = getMessages(locale)
  const t = createTranslator(messages)

  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="section__head">
            <h1 className="section__title">{t('music.title') as string}</h1>
            <p
              className="section__intro"
              dangerouslySetInnerHTML={{ __html: t('music.intro') as string }}
            />
          </div>
        </Reveal>

        <div className="music__grid">
          {albums.map((album) => {
            const a = t(`music.albums.${album.id}`) as unknown as Record<string, string>
            const title = a.title
            const urdu = a.urdu
            const meta = a.meta
            const desc = a.desc
            const cta = a.cta ?? ''
            const isComingSoon = cta.toLowerCase().includes('coming')

            return (
              <Reveal key={album.id}>
                <TiltCard
                  className={`album-card album-${album.id === 'gulab' ? 1 : 2}`}
                >
                  <div className="album-card__art">
                    <div className="ring" />
                  </div>

                  <div className="album-card__body">
                    <div className="album-card__title-row">
                      <h3 className="album-card__title">{title}</h3>
                      {urdu && (
                        <span className="album-card__title-ur" lang="ur">
                          {urdu}
                        </span>
                      )}
                    </div>

                    <div className="album-card__meta">{meta}</div>
                    <p className="album-card__desc">{desc}</p>

                    {isComingSoon ? (
                      <span className="btn btn-disabled">{cta}</span>
                    ) : (
                      <Link
                        href={album.spotifyUrl}
                        className="btn btn-outline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cta}
                      </Link>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
