import type { Metadata } from 'next'
import { site } from '@content/site'
import { publishedLocales, localeMeta, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'

/** Builds per-page metadata with canonical + hreflang alternates for both languages. */
export function pageMetadata(
  locale: Locale,
  path: string,
  opts: { title?: string; description?: string; image?: string; type?: 'website' | 'article' } = {},
): Metadata {
  const dict = getDictionary(locale)
  const suffix = path ? `/${path.replace(/^\/+/, '')}` : ''
  const url = `${site.url}/${locale}${suffix}`
  const title = opts.title ?? dict.meta.siteTitle
  const description = opts.description ?? dict.meta.description
  const image = opts.image ?? `${site.url}/${locale}/opengraph-image`
  return {
    title: opts.title ? title : { absolute: dict.seo.homeTitle },
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(publishedLocales.map((l) => [localeMeta[l].htmlLang, `${site.url}/${l}${suffix}`])),
        'x-default': `${site.url}/en${suffix}`,
      },
    },
    openGraph: {
      type: opts.type ?? 'website',
      url,
      title,
      description,
      siteName: dict.meta.siteTitle,
      locale: localeMeta[locale].ogLocale,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
