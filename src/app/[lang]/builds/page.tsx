import { notFound } from 'next/navigation'
import { alsoOnGithub, builds } from '@content/builds'
import { socials } from '@content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { pageMetadata } from '@/lib/metadata'
import { buildsGraph } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/layout/PageHeader'
import { BuildsGrid } from '@/components/builds/BuildsGrid'
import { Appear } from '@/components/ui/Reveal'
import { SocialIcon } from '@/components/ui/SocialIcon'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const d = getDictionary(lang)
  return pageMetadata(lang, 'builds', { title: d.seo.builds.title, description: d.seo.builds.description })
}

export default async function BuildsPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const d = getDictionary(lang)
  const other = lang === 'en' ? ur : en
  const github = socials.find((s) => s.id === 'github')!

  return (
    <>
      <JsonLd data={buildsGraph(lang)} />
      <PageHeader title={d.builds.title} alt={other.builds.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={d.builds.intro} />
      <section className="wrap">
        <BuildsGrid builds={builds} locale={lang} t={d.builds} />
      </section>

      <section className="wrap mt-24 grid gap-10 border-t border-line pt-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="h3">{d.builds.alsoTitle}</h2>
          <p className="meta mt-2">{d.builds.alsoBody}</p>
          <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">
            <SocialIcon id="github" size={16} />
            {d.builds.profile}
          </a>
        </div>
        <Appear className="md:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {alsoOnGithub.map((r) => (
              <li key={r.name}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span className="latin link font-semibold">{r.name}</span>
                  <span className="text-ink-2">{r.note[lang]}</span>
                </a>
              </li>
            ))}
          </ul>
        </Appear>
      </section>
    </>
  )
}
