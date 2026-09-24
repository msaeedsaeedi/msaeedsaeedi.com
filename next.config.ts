import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Images are pre-optimized by `bun run images`; Cloudflare Workers has no sharp at runtime.
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      // Locale negotiation without middleware (works on Cloudflare Workers via OpenNext).
      // English-only for now (see publishedLocales in src/i18n/config.ts). When Urdu ships,
      // add these above the default rule:
      //   { source: '/', has: [{ type: 'cookie', key: 'locale', value: 'ur' }], destination: '/ur', permanent: false },
      //   { source: '/', has: [{ type: 'cookie', key: 'locale', value: 'en' }], destination: '/en', permanent: false },
      //   { source: '/', has: [{ type: 'header', key: 'accept-language', value: '(?:^|.*,)\\s*ur.*' }], destination: '/ur', permanent: false },
      { source: '/', destination: '/en', permanent: false },
      // Old URLs from the previous site.
      { source: '/:lang(en|ur)/work', destination: '/:lang/journey', permanent: true },
      { source: '/:lang(en|ur)/music', destination: '/:lang/albums', permanent: true },
      { source: '/:lang(en|ur)/sound', destination: '/:lang/albums', permanent: true },
      { source: '/:lang(en|ur)/connect', destination: '/:lang/contact', permanent: true },
      { source: '/:lang(en|ur)/about', destination: '/:lang/self', permanent: true },
      { source: '/:lang(en|ur)/poetry/:path*', destination: '/:lang/kalaam/:path*', permanent: true },
    ]
  },
}

export default nextConfig

// Enables Cloudflare bindings (getCloudflareContext) during `next dev`.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
