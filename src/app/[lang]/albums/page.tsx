import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, BookOpen, Play } from 'lucide-react'
import { albums, trackDurations } from '@content/music'
import { site } from '@content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { getAlbumTracks, getPoem } from '@/lib/kalaam'
import { pageMetadata } from '@/lib/metadata'
import { albumsGraph } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { href } from '@/lib/routes'
import { formatDuration, localDigits } from '@/lib/format'
import { PageHeader } from '@/components/layout/PageHeader'
import { SpotifyEmbed } from '@/components/ui/SpotifyEmbed'
import { Appear } from '@/components/ui/Reveal'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const d = getDictionary(lang)
  return pageMetadata(lang, 'albums', { title: d.seo.albums.title, description: d.seo.albums.description })
}

export default async function AlbumsPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const d = getDictionary(lang)
  const t = d.albums
  const other = lang === 'en' ? ur : en
  const [debut, upcoming] = albums
  const tracks = getAlbumTracks(debut.slug)
  const upcomingPoem = upcoming.poems?.[0] ? getPoem(upcoming.poems[0]) : undefined
  const upcomingTracks = getAlbumTracks(upcoming.slug)

  return (
    <>
      <JsonLd data={albumsGraph(lang)} />
      <PageHeader title={t.title} alt={other.albums.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro} />

      {/* Debut album */}
      <section className="wrap grid gap-12 md:grid-cols-12" aria-labelledby="debut">
        <div className="md:col-span-5">
          <Appear>
            <div className="group relative md:sticky md:top-28">
              <img
                src={debut.cover!}
                alt={`${debut.title.en} album cover`}
                width={640}
                height={640}
                className="aspect-square w-full rounded-[2rem] object-cover shadow-2xl shadow-rose/20 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.015]"
              />
              <div className="mt-6">
                <SpotifyEmbed kind="album" id={debut.spotifyId!} title={debut.title.en} cta={t.listen} note={d.kalaam.playerNote} compact />
              </div>
            </div>
          </Appear>
        </div>

        <div className="md:col-span-7">
          <p className="meta">{t.debut}</p>
          <h2 id="debut" className="mt-2">
            <span lang="ur" className="font-gulzar block text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.6]">
              {debut.title.ur}
            </span>
            {lang === 'en' && <span className="display h2 block">{debut.title.en}</span>}
          </h2>
          <p className="lede mt-6 text-ink-2">{t.albumAbout}</p>
          <p className="meta mt-4">
            {t.tracks(debut.trackCount)}, {t.minutes(Math.round((debut.durationMs ?? 0) / 60000))}
          </p>

          <h3 className="h3 mt-14 mb-4">{t.tracklist}</h3>
          <ol className="border-t border-line">
            {tracks.map((p) => (
              <li key={p.slug} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-line py-4">
                <span className="meta tabular-nums">{localDigits(p.trackNo!, lang)}</span>
                <Link href={href(lang, `kalaam/${p.slug}`)} className="min-w-0" data-cursor={t.readPoem}>
                  <span lang="ur" className="font-gulzar block truncate text-[1.45rem] leading-[1.9] transition-colors group-hover:text-rose">
                    {p.titleUr}
                  </span>
                  {lang === 'en' && <span className="meta block">{p.title}</span>}
                </Link>
                <span className="flex items-center gap-1">
                  <span className="meta me-2 tabular-nums">{formatDuration(trackDurations[p.spotifyTrack!] ?? 0, lang)}</span>
                  <Link
                    href={href(lang, `kalaam/${p.slug}`)}
                    aria-label={`${t.readPoem}: ${p.title}`}
                    title={t.readPoem}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-rose hover:text-rose"
                  >
                    <BookOpen size={15} />
                  </Link>
                  <a
                    href={`https://open.spotify.com/track/${p.spotifyTrack}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.play}: ${p.title}`}
                    title={t.play}
                    className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-rose"
                  >
                    <Play size={14} fill="currentColor" />
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Upcoming album */}
      <section className="wrap mt-32" aria-labelledby="upcoming">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-[#131a33] p-8 text-[#ebe7ef] md:grid-cols-2 dark:bg-paper-2 md:p-14">
          <div>
            <p className="text-sm opacity-70">{t.upcoming}</p>
            <h2 id="upcoming" className="mt-2">
              <span lang="ur" className="font-gulzar block text-[clamp(2.6rem,6vw,5rem)] leading-[1.6] text-[#d8b266]">
                {upcoming.title.ur}
              </span>
              {lang === 'en' && <span className="block text-2xl font-bold tracking-tight">{upcoming.title.en}</span>}
            </h2>
            <p className="mt-4 opacity-80">{t.upcomingBody}</p>
            {upcomingTracks.length > 0 && (
              <ol className="mt-8 border-t border-white/15">
                {upcomingTracks.map((p) => (
                  <li key={p.slug} className="border-b border-white/15">
                    <Link href={href(lang, `kalaam/${p.slug}`)} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 py-3" data-cursor={t.readPoem}>
                      <span className="text-sm tabular-nums opacity-60">{localDigits(p.trackNo!, lang)}</span>
                      <span className="min-w-0">
                        <span lang="ur" className="font-gulzar block truncate text-[1.35rem] leading-[1.9] transition-colors group-hover:text-[#d8b266]">
                          {p.titleUr}
                        </span>
                        {lang === 'en' && <span className="block text-sm opacity-60">{p.title}</span>}
                      </span>
                      <BookOpen size={15} className="opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" aria-hidden />
                {t.upcomingStatus}
              </span>
              <a href={site.spotifyArtist} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline">
                {t.notify}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          {upcoming.cover && (
            <figure className="md:order-first">
              <img
                src={upcoming.cover}
                alt={`${upcoming.title.en} album cover`}
                width={960}
                height={960}
                loading="lazy"
                className="aspect-square w-full rounded-[2rem] object-cover shadow-2xl shadow-black/40"
              />
              {upcomingPoem && (
                <figcaption className="mt-4 text-sm opacity-80">
                  <Link href={href(lang, `kalaam/${upcomingPoem.slug}`)} className="link">
                    {t.titleGhazal}
                  </Link>
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </section>
    </>
  )
}
