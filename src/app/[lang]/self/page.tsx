import { notFound } from 'next/navigation'
import { site } from '@content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { pageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import { Appear, Rise } from '@/components/ui/Reveal'
import { Spotlight } from '@/components/ui/Spotlight'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const d = getDictionary(lang)
  return pageMetadata(lang, 'self', { title: d.self.title, description: d.self.bio[0] })
}

export default async function SelfPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang).self
  const other = lang === 'en' ? ur : en

  return (
    <>
      <PageHeader title={t.title} alt={other.self.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro} />

      <section className="wrap grid gap-12 md:grid-cols-12">
        <Appear className="md:col-span-5">
          <figure className="overflow-hidden rounded-[2rem] bg-paper-2">
            <img
              src={site.portrait.src}
              srcSet={site.portrait.srcSet}
              sizes="(min-width: 768px) 40vw, 100vw"
              alt={site.portrait.alt[lang]}
              width={960}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </figure>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {t.facts.map((f) => (
              <div key={f.k}>
                <dt className="meta">{f.k}</dt>
                <dd className="font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Appear>
        <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-8">
          {t.bio.map((p, i) => (
            <Appear key={i} delay={i * 0.1}>
              <p className={i === 0 ? 'lede' : 'prose-serif text-ink-2'}>{p}</p>
            </Appear>
          ))}
        </div>
      </section>

      <section className="wrap mt-32" aria-labelledby="think">
        <h2 id="think" className="display h2 mb-12">
          <Rise>{t.thinkTitle}</Rise>
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {t.think.map((b, i) => (
            <li key={b.title}>
              <Spotlight className={`h-full rounded-[1.75rem] border p-8 md:p-10 ${i === 3 ? 'border-rose/40 bg-paper-2' : 'border-line'}`}>
                <p className="h3">{b.title}</p>
                <p className="mt-4 max-w-2xl text-ink-2">{b.body}</p>
              </Spotlight>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap mt-32 grid gap-12 md:grid-cols-12" aria-labelledby="dream">
        <h2 id="dream" className="display h2 md:col-span-4">
          <Rise>{t.dreamTitle}</Rise>
        </h2>
        <ul className="space-y-8 md:col-span-7 md:col-start-6">
          {t.dreams.map((dr, i) => (
            <Appear key={dr} delay={i * 0.08}>
              <li className="lede border-b border-line pb-8">{dr}</li>
            </Appear>
          ))}
        </ul>
      </section>

      <section className="wrap mt-32" aria-labelledby="off">
        <h2 id="off" className="h3 mb-8">{t.offTitle}</h2>
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.off.map((o) => (
            <li key={o.title} className="bg-paper p-7">
              <p className="text-xl font-semibold tracking-tight">{o.title}</p>
              <p className="mt-2 text-ink-2">{o.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
