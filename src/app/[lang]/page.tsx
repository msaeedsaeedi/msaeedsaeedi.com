import Link from 'next/link'
import { notFound } from 'next/navigation'
import { builds, getBuild } from '@content/builds'
import { albums } from '@content/music'
import { selectedAshaar } from '@content/poet'
import { site } from '@content/site'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { getPoem, getPoems } from '@/lib/kalaam'
import { href } from '@/lib/routes'
import { pageMetadata } from '@/lib/metadata'
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
      count: builds.length,
      preview: <BuildCover build={flagship} className="h-full w-full" />,
    },
    {
      key: 'journey',
      title: dict.nav.journey,
      alt: other.nav.journey,
      body: dict.home.worlds.journey,
      href: href(locale, 'journey'),
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
      count: poems.length,
      preview: (
        <div className="grid h-full w-full place-items-center bg-rose px-6 text-white">
          <Sher lines={selectedAshaar[1].lines} size="sm" />
        </div>
      ),
    },
    {
      key: 'sound',
      title: dict.nav.sound,
      alt: other.nav.sound,
      body: dict.home.worlds.sound,
      href: href(locale, 'sound'),
      preview: <img src={album.cover!} alt="" className="h-full w-full object-cover" />,
    },
    {
      key: 'self',
      title: dict.nav.self,
      alt: other.nav.self,
      body: dict.home.worlds.self,
      href: href(locale, 'self'),
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
      <Hero
        locale={locale}
        name={nameLines}
        counterName={locale === 'en' ? site.penName.ur : 'Saeed'}
        lede={dict.home.lede}
        roles={dict.home.roles}
        ctaPrimary={{ label: dict.home.ctaBuilds, href: href(locale, 'builds') }}
        ctaSecondary={{ label: dict.home.ctaKalaam, href: href(locale, 'kalaam') }}
        hint={dict.home.inkHint}
        portrait={{ src: site.portrait.src, srcSet: site.portrait.srcSet, alt: site.portrait.alt[locale] }}
      />

      {/* Right now */}
      <section className="wrap grid gap-8 border-t border-line py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <h2 className="h3 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose" />
            </span>
            {dict.home.nowTitle}
          </h2>
          <p className="meta mt-1">{dict.home.nowUpdated}</p>
        </div>
        <ul className="grid gap-x-10 gap-y-5 md:col-span-8 md:grid-cols-2">
          {dict.home.now.map((item) => (
            <li key={item} className="border-s-2 border-rose/40 ps-4 text-ink">
              {item}
            </li>
          ))}
        </ul>
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
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link href={href(locale, `builds/${flagship.slug}`)} className="btn btn-solid">
                    {dict.home.flagshipCta}
                  </Link>
                </Magnetic>
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                  {dict.builds.status[flagship.status]}
                </span>
                <span className="chip">{flagship.role[locale]}</span>
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
