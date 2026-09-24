import Link from 'next/link'
import { notFound } from 'next/navigation'
import { poetIntro, selectedAshaar } from '@content/poet'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { getPoem, getPoems } from '@/lib/kalaam'
import { pageMetadata } from '@/lib/metadata'
import { href } from '@/lib/routes'
import { PageHeader } from '@/components/layout/PageHeader'
import { KalaamIndex, type PoemCard } from '@/components/kalaam/KalaamIndex'
import { Sher } from '@/components/kalaam/Sher'
import { Appear } from '@/components/ui/Reveal'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const d = getDictionary(lang)
  return pageMetadata(lang, 'kalaam', { title: d.kalaam.title, description: d.kalaam.intro })
}

export default async function KalaamPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const d = getDictionary(lang)
  const t = d.kalaam
  const other = lang === 'en' ? ur : en
  const poems = getPoems()

  const cards: PoemCard[] = poems.map((p) => ({
    slug: p.slug,
    title: p.title,
    titleUr: p.titleUr,
    matla: p.shers[0],
    sherCount: p.shers.length,
    shersText: t.shers(p.shers.length),
    trackNo: p.trackNo,
    text: p.shers.flat().join(' '),
  }))

  return (
    <>
      <PageHeader title={t.title} alt={other.kalaam.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro} />

      <section className="wrap mb-24 grid gap-8 md:grid-cols-12" aria-labelledby="poet">
        <h2 id="poet" className="meta md:col-span-3">{t.poetTitle}</h2>
        <Appear className="md:col-span-8">
          <p className="prose-serif text-ink">{poetIntro[lang]}</p>
        </Appear>
      </section>

      <section className="wrap">
        <KalaamIndex
          poems={cards}
          locale={lang}
          hrefBase={href(lang, 'kalaam')}
          t={{
            search: t.search,
            searchLabel: t.searchLabel,
            all: t.all,
            sung: t.sung,
            empty: t.empty,
            clear: t.clear,
            count: Array.from({ length: poems.length + 1 }, (_, n) => t.count(n)),
          }}
        />
      </section>

      <section className="mt-32 bg-paper-2 py-24" aria-labelledby="ashaar">
        <div className="wrap">
          <h2 id="ashaar" className="display h2 mb-16 text-center">{t.selectedTitle}</h2>
          <ul className="grid gap-x-16 gap-y-16 md:grid-cols-2">
            {selectedAshaar.map((s, i) => {
              const poem = getPoem(s.from)!
              return (
                <li key={i}>
                  <Link href={href(lang, `kalaam/${poem.slug}`)} className="group block">
                    <Sher lines={s.lines} className="mx-auto transition-colors group-hover:text-rose" />
                    <p lang="ur" className="font-gulzar meta mt-3 text-center">
                      «{poem.titleUr}»
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
