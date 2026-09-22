import { notFound } from 'next/navigation'
import { createTranslator } from '@/lib/translate'
import { getMessages } from '@/lib/messages'
import { stats, alsoOnGitHub } from '@/lib/data'
import { Hero } from '@/components/Hero'
import { Reveal } from '@/components/Reveal'
import { MagneticLink } from '@/components/MagneticLink'
import { IconCube, IconMusicNote, IconQuotes, IconExternalLink } from '@/components/icons'
import Link from 'next/link'
import type { Locale } from '@/i18n/types'

const LOCALES: Locale[] = ['en', 'ur']

/**
 * Strip HTML tags from a localized string for use in plain-text contexts.
 */
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

export default function HomePage({ params }: { params: { lang: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) {
    notFound()
  }

  const locale = params.lang as Locale
  const messages = getMessages(locale)
  const t = createTranslator(messages)

  /* ── Preview cards (Work / Music / Poetry) ── */
  const previewCards = [
    {
      key: 'work',
      Icon: IconCube,
      href: `/${locale}/work`,
      title: t('work.title') as string,
      desc: stripHtml(t('work.intro') as string),
    },
    {
      key: 'music',
      Icon: IconMusicNote,
      href: `/${locale}/music`,
      title: t('music.title') as string,
      desc: stripHtml(t('music.intro') as string),
    },
    {
      key: 'kalaam',
      Icon: IconQuotes,
      href: `/${locale}/kalaam`,
      title: t('kalaam.title') as string,
      desc: stripHtml(t('kalaam.intro') as string),
    },
  ]

  /* ── Skill domains ── */
  const domains = [
    { key: 'software', title: 'Software' },
    { key: 'marketing', title: 'Marketing' },
    { key: 'people', title: 'People' },
  ]

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* About preview */}
      <section className="section">
        <div className="wrap about__grid">
          <Reveal className="about__portrait">
            <span className="mono">MS</span>
            <span className="tag-note">Inquire within</span>
          </Reveal>

          <Reveal className="about__body">
            <p
              dangerouslySetInnerHTML={{ __html: t('about.preview') as string }}
            />

            <div className="stats">
              {stats.map((stat) => (
                <div key={stat.key} className="stat">
                  <div className="stat__num">{stat.num}</div>
                  <div className="stat__label">
                    {t(`about.stats.${stat.key}`) as string}
                  </div>
                </div>
              ))}
            </div>

            <MagneticLink
              href={`/${locale}/connect`}
              className="btn btn-outline"
            >
              {t('about.contact') as string}
            </MagneticLink>
          </Reveal>
        </div>
      </section>

      {/* Skill domains */}
      <section className="section domains">
        <div className="wrap">
          <div className="section__head">
            <h2 className="section__title">{t('domains.title') as string}</h2>
          </div>
          <div className="domains__grid">
            {domains.map((domain) => (
              <Reveal key={domain.key}>
                <div className="domain-card magnetic">
                  <h3>{domain.title}</h3>
                  <p>{t(`domains.${domain.key}`) as string}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Preview cards */}
      <section className="section preview-strip">
        <div className="wrap">
          <div className="cards-row">
            {previewCards.map((card) => {
              const Icon = card.Icon
              return (
                <Reveal key={card.key}>
                  <Link href={card.href} className="preview-card magnetic">
                    <Icon />
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <IconExternalLink className="preview-card__chevron" />
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* GitHub quick links */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="also-row">
              <span>{t('work.also_on_github') as string}</span>
              {alsoOnGitHub.map((item) => (
                <Link key={item.label} href={item.href} className="magnetic">
                  {item.label === 'full profile'
                    ? t('work.full_profile') as string
                    : item.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
