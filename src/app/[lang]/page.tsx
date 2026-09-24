import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { builds, getBuild } from '@content/builds'
import { roles } from '@content/journey'
import { albums } from '@content/music'
import { selectedAshaar } from '@content/poet'
import { site } from '@content/site'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { getPoem, getPoems } from '@/lib/kalaam'
import { href } from '@/lib/routes'
import { pageMetadata } from '@/lib/metadata'
import { homeGraph } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { localDigits } from '@/lib/format'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { Hero } from '@/components/home/Hero'
import { Worlds, type World } from '@/components/home/Worlds'
import { SherRotator } from '@/components/home/SherRotator'
import { Vortex } from '@/components/home/Vortex'
import { Sher } from '@/components/kalaam/Sher'
import { BuildCover } from '@/components/ui/BuildCover'
import { Rise, Appear } from '@/components/ui/Reveal'
import { Magnetic } from '@/components/ui/Magnetic'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return isLocale(lang) ? pageMetadata(lang, '') : {}
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const locale: Locale = lang
  const dict = getDictionary(locale)
  const other = locale === 'en' ? ur : en
  const poems = getPoems()
  const flagship = getBuild('vortexme')!
  const album = albums[0]

  const worlds: World[] = [
    {
      key: 'builds',
      title: dict.nav.builds,
      alt: other.nav.builds,
      body: dict.home.worlds.builds,
      href: href(locale, 'builds'),
      fact: dict.home.worldFacts.builds(builds.length, builds.filter((b) => b.status === 'shipped').length),
      preview: <BuildCover build={flagship} className="h-full w-full" />,
    },
    {
      key: 'journey',
      title: dict.nav.journey,
      alt: other.nav.journey,
      body: dict.home.worlds.journey,
      href: href(locale, 'journey'),
      fact: dict.home.worldFacts.journey(roles.at(-1)!.start.slice(0, 4), roles.length),
      preview: (
        <div className="grid h-full w-full place-items-center bg-gold text-paper">
          <span className="display text-6xl" dir="ltr">
            {localDigits('2021', locale)}
            <span className="opacity-60">→</span>
            {localDigits('26', locale)}
          </span>
        </div>
      ),
    },
    {
      key: 'kalaam',
      title: dict.nav.kalaam,
      alt: other.nav.kalaam,
      body: dict.home.worlds.kalaam,
      href: href(locale, 'kalaam'),
      fact: dict.home.worldFacts.kalaam(poems.length, poems.filter((p) => p.trackNo).length),
      preview: (
        <div className="grid h-full w-full place-items-center bg-rose px-6 text-white">
          <Sher lines={selectedAshaar[1].lines} size="sm" />
        </div>
      ),
    },
    {
      key: 'albums',
      title: dict.nav.albums,
      alt: other.nav.albums,
      body: dict.home.worlds.albums,
      href: href(locale, 'albums'),
      fact: dict.home.worldFacts.albums(albums.filter((a) => a.status === 'released').length, albums.filter((a) => a.status !== 'released').length),
      preview: <img src={album.cover!} alt="" className="h-full w-full object-cover" />,
    },
    {
      key: 'self',
      title: dict.nav.self,
      alt: other.nav.self,
      body: dict.home.worlds.self,
      href: href(locale, 'self'),
      fact: dict.home.worldFacts.self,
      preview: <img src={site.portrait.src} alt="" className="h-full w-full object-cover object-top" />,
    },
  ]

  const ashaar = selectedAshaar.map((s) => {
    const poem = getPoem(s.from)!
    return { lines: s.lines, href: href(locale, `kalaam/${poem.slug}`), title: poem.titleUr }
  })

  const [first, ...rest] = site.name[locale].split(' ')
  const nameLines = locale === 'en' ? [first, rest.join(' ')] : [site.name.ur]

  return (
    <>
      <JsonLd data={homeGraph(locale)} />
      <Hero
        locale={locale}
        name={nameLines}
        counterName={locale === 'en' ? site.penName.ur : 'Saeed'}
        lede={dict.home.lede}
        ctaPrimary={{ label: dict.home.ctaBuilds, href: href(locale, 'builds') }}
        ctaSecondary={{ label: dict.home.ctaKalaam, href: href(locale, 'kalaam') }}
        ink={{ hint: dict.home.inkHint, on: dict.home.inkOn, off: dict.home.inkOff }}
        portrait={{ src: site.portrait.src, srcSet: site.portrait.srcSet, alt: site.portrait.alt[locale] }}
      />

      {/* Right now: each item opens the room it belongs to. */}
      <section className="wrap border-t border-line py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 className="h3 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose" />
            </span>
            {dict.home.nowTitle}
          </h2>
          <p className="meta">{dict.home.nowUpdated}</p>
        </div>
        <Appear>
          <ul className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {dict.home.now.map((item, i, all) => (
              <li key={item.title} className={i === all.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <Link href={href(locale, item.to)} className="group flex h-full flex-col gap-3 bg-paper p-6 transition-colors duration-500 hover:bg-paper-2 md:p-7">
                  <span className="flex items-center justify-between gap-4">
                    <span className="meta font-medium !text-rose">{item.label}</span>
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="text-ink-2 transition-transform duration-500 group-hover:-rotate-45 group-hover:text-rose rtl:-scale-x-100"
                    />
                  </span>
                  <span className="text-xl font-semibold tracking-tight transition-colors group-hover:text-rose lg:mt-6">{item.title}</span>
                  <span className="text-[0.95rem] text-ink-2">{item.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Appear>
      </section>

      {/* Five rooms */}
      <section className="wrap py-16 md:py-24">
        <h2 className="display h2 mb-12 max-w-3xl">
          <Rise>{dict.home.worldsTitle}</Rise>
        </h2>
        <Worlds worlds={worlds} locale={locale} />
      </section>

      {/* Flagship */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid items-center gap-12 overflow-hidden rounded-[2.5rem] bg-paper-2 p-6 md:grid-cols-2 md:p-14">
            <div>
              <p className="meta mb-4">{dict.home.flagshipTitle}</p>
              <h2 className="display h2">
                <Rise>{flagship.name}</Rise>
              </h2>
              <p className="lede mt-6 max-w-xl">{flagship.oneLiner[locale]}</p>
              <p className="mt-6 max-w-xl text-ink-2">{flagship.problem[locale]}</p>
              <div className="mt-8">
                <Magnetic>
                  <Link href={href(locale, `builds/${flagship.slug}`)} className="btn btn-solid">
                    {dict.home.flagshipCta}
                  </Link>
                </Magnetic>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              <Vortex />
            </div>
          </div>
        </div>
      </section>

      {/* A sher */}
      <section className="wrap py-20 md:py-28" aria-labelledby="sher-title">
        <h2 id="sher-title" className="meta mb-10 text-center">
          {dict.home.sherTitle}
        </h2>
        <Appear>
          <SherRotator items={ashaar} next={dict.home.sherNext} read={dict.home.sherRead} />
        </Appear>
      </section>

      {/* Closing */}
      <section className="wrap pt-16 md:pt-24">
        <div className="border-t border-line pt-16 md:pt-24">
          <h2 className="display h1 max-w-5xl">
            <Rise>{dict.home.closingTitle}</Rise>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <p className="lede text-ink-2">{dict.home.closingBody}</p>
            <Magnetic strength={0.45}>
              <Link href={href(locale, 'contact')} className="btn btn-solid !px-8 !py-5 text-lg" data-cursor="✉">
                {dict.home.closingCta}
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  )
}
