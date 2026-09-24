import { notFound } from 'next/navigation'
import { Download, Mail } from 'lucide-react'
import { domains, education, leadership, roles, toolbox } from '@content/journey'
import { site } from '@content/site'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { pageMetadata } from '@/lib/metadata'
import { localDigits } from '@/lib/format'
import { PageHeader } from '@/components/layout/PageHeader'
import { Appear } from '@/components/ui/Reveal'
import { Spotlight } from '@/components/ui/Spotlight'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const d = getDictionary(lang)
  return pageMetadata(lang, 'journey', { title: d.journey.title, description: d.journey.intro })
}

function period(start: string, end: string | null, locale: Locale, present: string) {
  const fmt = new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
  const f = (s: string) => localDigits(fmt.format(new Date(`${s}-01T00:00:00Z`)), locale)
  return `${f(start)} – ${end ? f(end) : present}`
}

export default async function JourneyPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const d = getDictionary(lang)
  const t = d.journey
  const other = lang === 'en' ? ur : en

  return (
    <>
      <PageHeader title={t.title} alt={other.journey.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro}>
        <div className="mt-10">
          {site.cvUrl ? (
            <a href={site.cvUrl} className="btn btn-solid" download>
              <Download size={16} />
              {t.cv}
            </a>
          ) : (
            <a href={`mailto:${site.email}?subject=CV%20request`} className="btn btn-ghost">
              <Mail size={16} />
              {t.cvRequest}
            </a>
          )}
        </div>
      </PageHeader>

      {/* Timeline: a real sequence, so it's ordered and dated. */}
      <section className="wrap" aria-labelledby="exp">
        <h2 id="exp" className="h3 mb-8">{t.experience}</h2>
        <ol className="relative border-s border-line">
          {roles.map((r) => (
            <li key={r.org + r.start} className="relative ps-8 pb-12 last:pb-0 md:ps-12">
              <span
                aria-hidden
                className={`absolute -start-[5px] top-[0.55em] h-2.5 w-2.5 rounded-full ${r.end ? 'bg-ink-2/40' : 'bg-rose ring-4 ring-rose/20'}`}
              />
              <Appear>
                <div className="grid gap-x-10 gap-y-2 md:grid-cols-[14rem_1fr]">
                  <p className="meta pt-1">{period(r.start, r.end, lang, t.present)}</p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      <span className="latin">{lang === 'ur' && r.orgUr ? r.orgUr : r.org}</span>
                    </h3>
                    <p className="text-ink-2">
                      {r.title[lang]}, {r.place[lang]}
                    </p>
                    <p className="measure mt-3">{r.summary[lang]}</p>
                  </div>
                </div>
              </Appear>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap mt-28" aria-labelledby="domains">
        <h2 id="domains" className="display h2 mb-12 max-w-3xl">{t.domainsTitle}</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {domains.map((dm) => (
            <li key={dm.id}>
              <Spotlight className="h-full rounded-[1.75rem] border border-line p-7 md:p-9">
                <h3 className="h3">{dm.title[lang]}</h3>
                <p className="mt-3 text-ink">{dm.body[lang]}</p>
                <p className="meta mt-6 border-t border-line pt-4">{dm.evidence[lang]}</p>
              </Spotlight>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap mt-28 grid gap-12 md:grid-cols-12" aria-labelledby="toolbox">
        <h2 id="toolbox" className="h3 md:col-span-3">{t.toolboxTitle}</h2>
        <dl className="grid gap-8 sm:grid-cols-2 md:col-span-9">
          {toolbox.map((g) => (
            <div key={g.group.en}>
              <dt className="meta mb-3">{g.group[lang]}</dt>
              <dd className="latin flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <span key={i} className="rounded-full bg-paper-2 px-3 py-1 text-sm">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap mt-28 grid gap-12 border-t border-line pt-14 md:grid-cols-2">
        <div>
          <h2 className="meta mb-3">{t.educationTitle}</h2>
          <p className="h3">{education.degree[lang]}</p>
          <p className="mt-1">{education.school[lang]}</p>
          <p className="meta mt-1">{education.period[lang]}</p>
          <p className="mt-4 text-ink-2">{education.note[lang]}</p>
        </div>
        <div>
          <h2 className="meta mb-3">{t.leadershipTitle}</h2>
          <p className="h3">{leadership.title[lang]}</p>
          <p className="meta mt-1">{leadership.period[lang]}</p>
          <p className="mt-4 text-ink-2">{leadership.note[lang]}</p>
        </div>
      </section>
    </>
  )
}
