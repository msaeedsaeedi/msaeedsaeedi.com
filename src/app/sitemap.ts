import type { MetadataRoute } from 'next'
import { builds } from '@content/builds'
import { albums } from '@content/music'
import { site } from '@content/site'
import { publishedLocales } from '@/i18n/config'
import { getPoems } from '@/lib/kalaam'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    'builds',
    ...builds.map((b) => `builds/${b.slug}`),
    'journey',
    'kalaam',
    ...getPoems().map((p) => `kalaam/${p.slug}`),
    'albums',
    'self',
    'contact',
  ]
  // Image sitemap entries help the portrait and album covers show up in image search.
  const images: Record<string, string[]> = {
    '': [site.portrait.square],
    self: [site.portrait.square],
    albums: albums.flatMap((a) => (a.cover ? [a.cover] : [])),
  }
  return paths.map((p) => {
    const suffix = p ? `/${p}` : ''
    return {
      ...(images[p] ? { images: images[p].map((src) => `${site.url}${src}`) } : {}),
      url: `${site.url}/en${suffix}`,
      changeFrequency: 'monthly',
      priority: p === '' ? 1 : p.includes('/') ? 0.6 : 0.8,
      alternates: { languages: Object.fromEntries(publishedLocales.map((l) => [l, `${site.url}/${l}${suffix}`])) },
    }
  })
}
