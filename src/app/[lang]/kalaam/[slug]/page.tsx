import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { site } from '@content/site'
import { albums } from '@content/music'
import { isLocale, publishedLocales } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { getNeighbours, getPoem, getPoems } from '@/lib/kalaam'
import { pageMetadata } from '@/lib/metadata'
import { poemGraph } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { href } from '@/lib/routes'
import { localDigits } from '@/lib/format'
import { PoemReader } from '@/components/kalaam/PoemReader'
import { SpotifyEmbed } from '@/components/ui/SpotifyEmbed'
import { Rise, Appear } from '@/components/ui/Reveal'

type Props = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return publishedLocales.flatMap((lang) => getPoems().map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const poem = getPoem(slug)
  if (!isLocale(lang) || !poem) return {}
  const d = getDictionary(lang).seo
  return pageMetadata(lang, `kalaam/${slug}`, {
    title: d.poemTitle(poem.title, poem.titleUr),
    // Roman Urdu first: it is how most people type a line they half remember.
    description: d.poemDescription((poem.roman?.[0] ?? poem.shers[0]).join(' / '), poem.title),
    type: 'article',
  })
}

export default async function PoemPage({ params }: Props) {
  const { lang, slug } = await params
  const poem = getPoem(slug)
  if (!isLocale(lang) || !poem) notFound()
  const d = getDictionary(lang)
  const t = d.kalaam
  const { prev, next } = getNeighbours(slug)
  const album = albums.find((a) => a.slug === poem.album)
  const url = `${site.url}${href(lang, `kalaam/${slug}`)}`
  const Back = lang === 'ur' ? ArrowRight : ArrowLeft

  return (
    <article>
      <JsonLd data={poemGraph(lang, poem)} />
      <header className="wrap pt-32 text-center md:pt-40">
        <Link href={href(lang, 'kalaam')} className="meta link group inline-flex items-center gap-2">
          <Back size={15} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          {t.back}
        </Link>
        <p className="meta mt-12">
          {t.ghazal}
          {album && poem.trackNo ? <> &nbsp;/&nbsp; {t.track(poem.trackNo, album.title[lang])}</> : null}
        </p>
        <h1 className="mt-8 text-ink md:mt-12">
          {/* Nastaliq rises well above the line box; give the reveal mask room so it doesn't crop the top. */}
          <span lang="ur" className="script-ur font-gulzar block text-[clamp(3rem,9vw,7rem)] leading-[1.6]">
            <Rise className="-mt-[0.4em] pt-[0.4em]">{poem.titleUr}</Rise>
          </span>
          <span lang="ur-Latn" className="only-roman font-serif block text-[clamp(2.6rem,7vw,5.5rem)] italic leading-[1.2]">
            {poem.title}
          </span>
        </h1>
        {lang === 'en' && <p className="script-ur lede -mt-2 italic text-ink-2">{poem.title}</p>}
        {poem.epigraph && (
          <Appear delay={0.3}>
            <blockquote lang="ur" dir="rtl" className="font-gulzar mx-auto mt-8 max-w-xl text-xl leading-[2] text-ink-2">
              «{poem.epigraph}»
              {poem.epigraphCredit && <footer className="font-nastaliq mt-1 text-sm">{poem.epigraphCredit}</footer>}
            </blockquote>
          </Appear>
        )}
        <div className="mx-auto mt-10 h-px w-24 bg-rose" aria-hidden />
      </header>

      {poem.spotifyTrack && (
        <Appear className="wrap mt-12 max-w-xl">
          <SpotifyEmbed kind="track" id={poem.spotifyTrack} title={poem.title} cta={t.listen} note={t.playerNote} compact />
        </Appear>
      )}

      <section className="wrap mt-14">
        <PoemReader
          shers={poem.shers}
          roman={poem.roman}
          longest={Math.max(...poem.shers.flat().map((l) => l.length))}
          title={`${poem.titleUr} — ${site.penName.ur}`}
          url={url}
          poet={site.penName.ur}
          labels={{ copy: t.copy, copied: t.copied, share: t.share, linkCopied: t.linkCopied, script: t.script }}
        />
      </section>

      {/* Right to left, like the poem: the previous ghazal sits on the right. */}
      <nav dir="rtl" className="script-flip wrap mt-28 grid grid-cols-2 border-t border-line" aria-label={t.back}>
        <div className="border-e border-line py-10 pe-4">
          {prev && (
            <Link href={href(lang, `kalaam/${prev.slug}`)} className="group block">
              <span className="meta">{t.prev}</span>
              <span lang="ur" className="script-ur font-gulzar mt-2 block text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.9] transition-colors group-hover:text-rose">
                {prev.titleUr}
              </span>
              <span dir="ltr" className="only-roman font-serif mt-2 block text-[clamp(1.3rem,2.6vw,1.9rem)] italic transition-colors group-hover:text-rose">
                {prev.title}
              </span>
            </Link>
          )}
        </div>
        <div className="py-10 ps-4 text-end">
          {next && (
            <Link href={href(lang, `kalaam/${next.slug}`)} className="group block">
              <span className="meta">{t.next}</span>
              <span lang="ur" className="script-ur font-gulzar mt-2 block text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.9] transition-colors group-hover:text-rose">
                {next.titleUr}
              </span>
              <span dir="ltr" className="only-roman font-serif mt-2 block text-[clamp(1.3rem,2.6vw,1.9rem)] italic transition-colors group-hover:text-rose">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
      <p className="meta wrap text-center">
        {localDigits(poem.order, lang)} / {localDigits(getPoems().length, lang)}
      </p>

    </article>
  )
}
