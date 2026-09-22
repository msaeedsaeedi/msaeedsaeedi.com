import { notFound } from 'next/navigation'
import { createTranslator } from '@/lib/translate'
import { getMessages } from '@/lib/messages'
import { projects, alsoOnGitHub } from '@/lib/data'
import { Reveal } from '@/components/Reveal'
import { TiltCard } from '@/components/TiltCard'
import Link from 'next/link'
import type { Locale } from '@/i18n/types'

const LOCALES: Locale[] = ['en', 'ur']

function i18nKey(id: string): string {
  return id.replace(/-/g, '_')
}

export default function WorkPage({ params }: { params: { lang: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) notFound()

  const locale = params.lang as Locale
  const messages = getMessages(locale)
  const t = createTranslator(messages)

  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="section__head">
            <h1 className="section__title">{t('work.title') as string}</h1>
            <p className="section__intro">{t('work.intro') as string}</p>
          </div>
        </Reveal>

        <div className="work__grid">
          {projects.map((project) => {
            const key = i18nKey(project.id)
            const title = t(`work.projects.${key}.title`) as string
            const desc = t(`work.projects.${key}.desc`) as string
            const linkText = t(`work.projects.${key}.link`) as string
            const status = t(`work.${project.status}`) as string

            return (
              <Reveal key={project.id}>
                <TiltCard className="project-card">
                  <div className={`project-card__thumb ${project.thumbClass || ''}`} />

                  <div className="project-card__body">
                    <div className="project-card__top">
                      <h3 className="project-card__title">{title}</h3>
                      <span className="status-pill">{status}</span>
                    </div>

                    {desc && (
                      <p
                        className={
                          `project-card__desc` +
                          (project.placeholder ? ' placeholder' : '')
                        }
                      >
                        {desc}
                      </p>
                    )}

                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.link && linkText && (
                      <Link
                        href={project.link}
                        className="project-card__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkText}
                      </Link>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="also-row">
            <span>{t('work.also_on_github') as string}</span>
            {alsoOnGitHub.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="magnetic"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label === 'full profile'
                  ? (t('work.full_profile') as string)
                  : item.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
