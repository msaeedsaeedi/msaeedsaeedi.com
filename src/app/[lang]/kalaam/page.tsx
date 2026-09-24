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
import { kalaamGraph } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
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
  return pageMetadata(lang, 'kalaam', { title: d.seo.kalaam.title, description: d.seo.kalaam.description })
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
    romanMatla: p.roman?.[0] ?? null,
    sherCount: p.shers.length,
    shersText: t.shers(p.shers.length),
    trackNo: p.trackNo,
    album: albums.find((a) => a.slug === p.album)?.title[lang] ?? null,
    text: p.shers.flat().join(' '),
    romanText: p.roman?.flat().join(' ') ?? '',
  }))

  // Roman Urdu for each selected sher, found in its source ghazal. NFC because ۂ is stored both
  // precomposed and as ہ + hamza.
  const same = (a: string, b: string) => a.normalize('NFC') === b.normalize('NFC')
  const roman = selectedAshaar.map((s) => {
    const poem = getPoem(s.from)!
    const i = poem.shers.findIndex((sh) => same(sh[0], s.lines[0]) && same(sh[1], s.lines[1]))
    return i >= 0 ? (poem.roman?.[i] ?? null) : null
  })

  return (
    <>
      <JsonLd data={kalaamGraph(lang)} />
      <PageHeader title={t.title} alt={other.kalaam.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro} />

      {/* Poetry is Urdu, so this whole area reads right to left, in the poet's own introduction. */}
      <section lang="ur" dir="rtl" className="script-flip wrap mb-24 grid gap-6 md:grid-cols-12" aria-labelledby="poet">
        <h2 id="poet" className="text-gold md:col-span-3">
          <span className="script-ur font-gulzar text-2xl leading-[2]">{ur.kalaam.poetTitle}</span>
          <span lang="en" dir="ltr" className="only-roman font-serif block text-2xl italic">
            {en.kalaam.poetTitle}
          </span>
        </h2>
        <Appear className="md:col-span-8">
          <p className="script-ur font-nastaliq text-[1.2rem] leading-[2.4] text-ink">{poetIntro.ur}</p>
          {/* Readers who chose Roman don't read the Urdu script, so they get the English introduction. */}
          <p lang="en" dir="ltr" className="only-roman prose-serif text-ink">
            {poetIntro.en}
          </p>
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
            script: t.script,
          }}
        />
      </section>

      <section className="mt-32 bg-paper-2 py-24" aria-labelledby="ashaar">
        <div className="wrap">
          <h2 id="ashaar" lang="ur" className="font-gulzar mb-16 text-center text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.7]">
            <span className="script-ur">{ur.kalaam.selectedTitle}</span>
            <span lang="en" className="only-roman font-serif italic">
              {en.kalaam.selectedTitle}
            </span>
          </h2>
          <ul dir="rtl" className="grid gap-x-16 gap-y-16 md:grid-cols-2">
            {selectedAshaar.map((s, i) => {
              const poem = getPoem(s.from)!
              return (
                <li key={i}>
                  <Link href={href(lang, `kalaam/${poem.slug}`)} className="group block">
                    <Sher lines={s.lines} className="script-ur mx-auto transition-colors group-hover:text-rose" />
                    {roman[i] && (
                      <p lang="ur-Latn" dir="ltr" className="roman script-roman mx-auto mt-3 max-w-[30rem] text-center transition-colors group-hover:text-rose">
                        {roman[i]!.map((l, j) => (
                          <span key={j} className="block">
                            {l}
                          </span>
                        ))}
                      </p>
                    )}
                    <p lang="ur" className="script-ur font-gulzar meta mt-3 text-center">
                      «{poem.titleUr}»
                    </p>
                    <p dir="ltr" className="only-roman meta mt-3 text-center italic">{poem.title}</p>
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
