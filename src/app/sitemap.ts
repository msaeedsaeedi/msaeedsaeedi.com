import type { MetadataRoute } from 'next'
import { builds } from '@content/builds'
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
  return paths.map((p) => {
    const suffix = p ? `/${p}` : ''
    return {
      url: `${site.url}/en${suffix}`,
      changeFrequency: 'monthly',
      priority: p === '' ? 1 : p.includes('/') ? 0.6 : 0.8,
      alternates: { languages: Object.fromEntries(publishedLocales.map((l) => [l, `${site.url}/${l}${suffix}`])) },
    }
  })
}
