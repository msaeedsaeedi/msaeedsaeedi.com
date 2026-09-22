import { notFound } from 'next/navigation'
import { createTranslator } from '@/lib/translate'
import { getMessages } from '@/lib/messages'
import { socialLinks } from '@/lib/data'
import { Reveal } from '@/components/Reveal'
import { MagneticLink } from '@/components/MagneticLink'
import type { Locale } from '@/i18n/types'

const LOCALES: Locale[] = ['en', 'ur']

/** Short two-letter label for social buttons */
const shortLabels: Record<string, string> = {
  LinkedIn: 'in',
  GitHub: 'gh',
  Instagram: 'ig',
  Spotify: 'sp',
  'Dev.to': 'dv',
}

export default function ConnectPage({ params }: { params: { lang: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) notFound()

  const locale = params.lang as Locale
  const messages = getMessages(locale)
  const t = createTranslator(messages)

  return (
    <section className="connect">
      <div className="wrap connect__inner">
        <Reveal>
          <h1 className="connect__title">{t('connect.title') as string}</h1>
        </Reveal>

        <Reveal>
          <p className="connect__line">{t('connect.line') as string}</p>
        </Reveal>

        <Reveal>
          <a
            href={`mailto:${t('connect.email') as string}`}
            className="connect__email magnetic"
          >
            {t('connect.email') as string}
          </a>
        </Reveal>

        <Reveal>
          <div className="social-row">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="social-btn magnetic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                title={link.ariaLabel}
              >
                {shortLabels[link.label] || link.ariaLabel}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
