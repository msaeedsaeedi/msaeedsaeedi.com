// Structured data (schema.org JSON-LD). One Person entity with a stable @id is declared
// site-wide in the layout; every page refers back to it, so search engines and AI answer
// engines resolve "Mohammad Saeed", "Saeedi" and "سعیدی" to the same person.
import { site, socials } from '@content/site'
import { builds, type Build } from '@content/builds'
import { albums, trackDurations } from '@content/music'
import { getAlbumTracks, getPoems, type Poem } from '@/lib/kalaam'
import { education } from '@content/journey'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { href } from '@/lib/routes'

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
}

export const abs = (locale: Locale, path = '') => `${site.url}${href(locale, path)}`

export function personNode(locale: Locale) {
  const d = getDictionary(locale)
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: site.fullName.en,
    alternateName: [site.name.en, site.penName.en, site.fullName.ur, site.penName.ur, 'msaeedsaeedi'],
    description: d.meta.description,
    url: abs(locale),
    image: `${site.url}${site.portrait.square}`,
    email: `mailto:${site.email}`,
    jobTitle: ['Software engineer', 'Urdu poet'],
    worksFor: { '@type': 'Organization', name: 'CMOonTheGO' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school.en },
    homeLocation: { '@type': 'Place', name: site.location.en },
    address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
    nationality: { '@type': 'Country', name: 'Pakistan' },
    knowsLanguage: ['en', 'ur'],
    knowsAbout: [
      'Software engineering',
      'Full-stack web development',
      'Multi-agent AI systems',
      'Cloud computing',
      'Digital twins',
      'Urdu poetry',
      'Ghazal',
    ],
    sameAs: socials.map((s) => s.href),
  }
}

export function websiteNode(locale: Locale) {
  const d = getDictionary(locale)
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: site.url,
    name: d.meta.siteTitle,
    alternateName: [site.fullName.en, site.penName.en],
    description: d.meta.description,
    inLanguage: locale,
    publisher: { '@id': ids.person },
    author: { '@id': ids.person },
  }
}

/** Home → … → current page. `trail` excludes Home. */
export function breadcrumb(locale: Locale, trail: { name: string; path: string }[]) {
  const d = getDictionary(locale)
  const items = [{ name: d.nav.home, path: '' }, ...trail]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(locale, it.path) })),
  }
}

/** A page node that ties the URL to the site and to its subject. */
export function webPage(locale: Locale, path: string, type: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    '@type': type,
    '@id': `${abs(locale, path)}#page`,
    url: abs(locale, path),
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.person },
    ...extra,
  }
}

/** ISO 8601 duration from milliseconds (e.g. PT6M27S). */
export function isoDuration(ms: number) {
  const s = Math.round(ms / 1000)
  return `PT${Math.floor(s / 60)}M${s % 60}S`
}

export function graph(...nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

// ── Page graphs ──────────────────────────────────────────────────────────────

export function homeGraph(locale: Locale) {
  const d = getDictionary(locale)
  return graph(webPage(locale, '', 'ProfilePage', d.seo.homeTitle, d.meta.description, { mainEntity: { '@id': ids.person } }))
}

/** Simple section pages: Self (AboutPage), Journey (ProfilePage), Contact (ContactPage). */
export function sectionGraph(locale: Locale, key: 'self' | 'journey' | 'contact') {
  const d = getDictionary(locale)
  const type = { self: 'AboutPage', journey: 'ProfilePage', contact: 'ContactPage' }[key]
  return graph(
    webPage(locale, key, type, d.seo[key].title, d.seo[key].description, key === 'contact' ? {} : { mainEntity: { '@id': ids.person } }),
    breadcrumb(locale, [{ name: d.nav[key], path: key }]),
  )
}

function buildNode(locale: Locale, b: Build) {
  const d = getDictionary(locale)
  const type = b.kind === 'research' ? 'CreativeWork' : b.links.repo ? 'SoftwareSourceCode' : 'CreativeWork'
  return {
    '@type': type,
    '@id': `${abs(locale, `builds/${b.slug}`)}#work`,
    name: b.name,
    url: abs(locale, `builds/${b.slug}`),
    description: b.oneLiner[locale],
    abstract: b.problem[locale],
    ...(b.kind === 'research' ? { genre: 'Research', additionalType: 'https://schema.org/ResearchProject' } : {}),
    creator: { '@id': ids.person },
    author: { '@id': ids.person },
    dateCreated: b.year.slice(0, 4),
    keywords: b.stack.join(', '),
    ...(b.links.repo ? { codeRepository: b.links.repo } : {}),
    ...(b.links.site ? { sameAs: b.links.site } : {}),
    creativeWorkStatus: d.builds.status[b.status],
  }
}

export function buildsGraph(locale: Locale) {
  const d = getDictionary(locale)
  return graph(
    webPage(locale, 'builds', 'CollectionPage', d.seo.builds.title, d.seo.builds.description, {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: builds.map((b, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(locale, `builds/${b.slug}`), name: b.name })),
      },
    }),
    breadcrumb(locale, [{ name: d.nav.builds, path: 'builds' }]),
  )
}

export function buildGraph(locale: Locale, b: Build) {
  const d = getDictionary(locale)
  const path = `builds/${b.slug}`
  return graph(
    webPage(locale, path, 'WebPage', b.name, b.oneLiner[locale], { mainEntity: { '@id': `${abs(locale, path)}#work` } }),
    buildNode(locale, b),
    breadcrumb(locale, [
      { name: d.nav.builds, path: 'builds' },
      { name: b.name, path },
    ]),
  )
}

export function kalaamGraph(locale: Locale) {
  const d = getDictionary(locale)
  return graph(
    webPage(locale, 'kalaam', 'CollectionPage', d.seo.kalaam.title, d.seo.kalaam.description, {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: getPoems().map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(locale, `kalaam/${p.slug}`),
          name: `${p.titleUr} (${p.title})`,
        })),
      },
    }),
    breadcrumb(locale, [{ name: d.nav.kalaam, path: 'kalaam' }]),
  )
}

export function poemGraph(locale: Locale, poem: Poem) {
  const d = getDictionary(locale)
  const path = `kalaam/${poem.slug}`
  const album = albums.find((a) => a.slug === poem.album)
  return graph(
    {
      '@type': 'CreativeWork',
      '@id': `${abs(locale, path)}#poem`,
      name: poem.titleUr,
      alternateName: poem.title,
      headline: d.seo.poemTitle(poem.title, poem.titleUr),
      genre: ['Ghazal', 'Urdu poetry'],
      inLanguage: 'ur',
      author: { '@id': ids.person },
      creator: { '@id': ids.person },
      text: poem.shers.map((s) => s.join('\n')).join('\n\n'),
      url: abs(locale, path),
      mainEntityOfPage: abs(locale, path),
      isPartOf: { '@id': `${abs(locale, 'kalaam')}#page` },
      ...(poem.epigraph ? { citation: poem.epigraph } : {}),
      ...(album && poem.trackNo
        ? {
            workExample: {
              '@type': 'MusicRecording',
              name: poem.title,
              inAlbum: { '@type': 'MusicAlbum', name: album.title.en, url: abs(locale, 'albums') },
              ...(poem.spotifyTrack ? { url: `https://open.spotify.com/track/${poem.spotifyTrack}` } : {}),
            },
          }
        : {}),
    },
    breadcrumb(locale, [
      { name: d.nav.kalaam, path: 'kalaam' },
      { name: poem.title, path },
    ]),
  )
}

export function albumsGraph(locale: Locale) {
  const d = getDictionary(locale)
  const albumNodes = albums.map((a) => {
    const tracks = getAlbumTracks(a.slug)
    return {
      '@type': 'MusicAlbum',
      '@id': `${abs(locale, 'albums')}#${a.slug}`,
      name: a.title.en,
      alternateName: a.title.ur,
      inLanguage: 'ur',
      genre: ['Ghazal', 'Urdu'],
      albumProductionType: 'https://schema.org/StudioAlbum',
      albumReleaseType: 'https://schema.org/AlbumRelease',
      byArtist: { '@id': ids.person },
      numTracks: a.trackCount,
      ...(a.cover ? { image: `${site.url}${a.cover}` } : {}),
      ...(a.spotifyId ? { sameAs: `https://open.spotify.com/album/${a.spotifyId}` } : {}),
      ...(a.durationMs ? { duration: isoDuration(a.durationMs) } : {}),
      creativeWorkStatus: a.status === 'released' ? 'Released' : 'In production',
      track: tracks.map((p) => ({
        '@type': 'MusicRecording',
        name: p.title,
        alternateName: p.titleUr,
        position: p.trackNo,
        ...(p.spotifyTrack ? { url: `https://open.spotify.com/track/${p.spotifyTrack}` } : {}),
        ...(p.spotifyTrack && trackDurations[p.spotifyTrack] ? { duration: isoDuration(trackDurations[p.spotifyTrack]) } : {}),
        recordingOf: {
          '@type': 'MusicComposition',
          name: p.titleUr,
          alternateName: p.title,
          inLanguage: 'ur',
          lyricist: { '@id': ids.person },
          lyrics: { '@type': 'CreativeWork', url: abs(locale, `kalaam/${p.slug}`), inLanguage: 'ur' },
        },
      })),
    }
  })
  return graph(
    webPage(locale, 'albums', 'CollectionPage', d.seo.albums.title, d.seo.albums.description, {
      mainEntity: albumNodes.map((a) => ({ '@id': a['@id'] })),
    }),
    ...albumNodes,
    breadcrumb(locale, [{ name: d.nav.albums, path: 'albums' }]),
  )
}
