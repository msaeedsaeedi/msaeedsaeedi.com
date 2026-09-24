import Link from 'next/link'
import { notFound } from 'next/navigation'
import { poetIntro, selectedAshaar } from '@content/poet'
import { albums } from '@content/music'
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
    album: albums.find((a) => a.slug === p.album)?.title[lang] ?? null,
    text: p.shers.flat().join(' '),
  }))

  return (
    <>
      <PageHeader title={t.title} alt={other.kalaam.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro} />

      {/* Poetry is Urdu, so this whole area reads right to left, in the poet's own introduction. */}
      <section lang="ur" dir="rtl" className="wrap mb-24 grid gap-6 md:grid-cols-12" aria-labelledby="poet">
        <h2 id="poet" className="font-gulzar text-2xl leading-[2] text-gold md:col-span-3">
          {ur.kalaam.poetTitle}
        </h2>
        <Appear className="md:col-span-8">
          <p className="font-nastaliq text-[1.2rem] leading-[2.4] text-ink">{poetIntro.ur}</p>
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
          <h2 id="ashaar" lang="ur" className="font-gulzar mb-16 text-center text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.7]">
            {ur.kalaam.selectedTitle}
          </h2>
          <ul dir="rtl" className="grid gap-x-16 gap-y-16 md:grid-cols-2">
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
