import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { site } from '@content/site'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { getNeighbours, getPoem, getPoems } from '@/lib/kalaam'
import { pageMetadata } from '@/lib/metadata'
import { href } from '@/lib/routes'
import { localDigits } from '@/lib/format'
import { PoemReader } from '@/components/kalaam/PoemReader'
import { SpotifyEmbed } from '@/components/ui/SpotifyEmbed'
import { Rise, Appear } from '@/components/ui/Reveal'

type Props = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((lang) => getPoems().map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const poem = getPoem(slug)
  if (!isLocale(lang) || !poem) return {}
  const title = lang === 'ur' ? poem.titleUr : `${poem.title} (${poem.titleUr})`
  return pageMetadata(lang, `kalaam/${slug}`, { title, description: poem.shers[0].join(' / '), type: 'article' })
}

export default async function PoemPage({ params }: Props) {
  const { lang, slug } = await params
  const poem = getPoem(slug)
  if (!isLocale(lang) || !poem) notFound()
  const d = getDictionary(lang)
  const t = d.kalaam
  const { prev, next } = getNeighbours(slug)
  const url = `${site.url}${href(lang, `kalaam/${slug}`)}`
  const Back = lang === 'ur' ? ArrowRight : ArrowLeft

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    genre: 'Ghazal',
    name: poem.titleUr,
    alternateName: poem.title,
    inLanguage: 'ur',
    author: { '@type': 'Person', name: site.fullName.en, alternateName: site.penName.ur, url: site.url },
    text: poem.shers.map((s) => s.join('\n')).join('\n\n'),
    url,
    ...(poem.spotifyTrack ? { audio: { '@type': 'AudioObject', url: `https://open.spotify.com/track/${poem.spotifyTrack}` } } : {}),
  }

  return (
    <article>
      <header className="wrap pt-32 text-center md:pt-40">
        <Link href={href(lang, 'kalaam')} className="meta group inline-flex items-center gap-2 hover:text-ink">
          <Back size={15} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          {t.back}
        </Link>
        <p className="meta mt-12">
          {t.ghazal}
          {poem.trackNo ? <> &nbsp;/&nbsp; {t.track(poem.trackNo)}</> : null}
        </p>
        <h1 lang="ur" className="font-gulzar mt-2 text-[clamp(3rem,9vw,7rem)] leading-[1.6] text-ink">
          <Rise>{poem.titleUr}</Rise>
        </h1>
        {lang === 'en' && <p className="lede -mt-2 italic text-ink-2">{poem.title}</p>}
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
          title={`${poem.titleUr} — ${site.penName.ur}`}
          url={url}
          poet={site.penName.ur}
          labels={{ copy: t.copy, copied: t.copied, share: t.share, linkCopied: t.linkCopied }}
        />
      </section>

      <nav className="wrap mt-28 grid grid-cols-2 border-t border-line" aria-label={t.back}>
        <div className="border-e border-line py-10 pe-4">
          {prev && (
            <Link href={href(lang, `kalaam/${prev.slug}`)} className="group block">
              <span className="meta">{t.prev}</span>
              <span lang="ur" className="font-gulzar mt-2 block text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.9] transition-colors group-hover:text-rose">
                {prev.titleUr}
              </span>
            </Link>
          )}
        </div>
        <div className="py-10 ps-4 text-end">
          {next && (
            <Link href={href(lang, `kalaam/${next.slug}`)} className="group block">
              <span className="meta">{t.next}</span>
              <span lang="ur" className="font-gulzar mt-2 block text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.9] transition-colors group-hover:text-rose">
                {next.titleUr}
              </span>
            </Link>
          )}
        </div>
      </nav>
      <p className="meta wrap text-center">
        {localDigits(poem.order, lang)} / {localDigits(getPoems().length, lang)}
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  )
}
