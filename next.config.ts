import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Images are pre-optimized by `bun run images`; Cloudflare Workers has no sharp at runtime.
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      // Locale negotiation without middleware (works on Cloudflare Workers via OpenNext).
      // 1) An explicit choice made on the site wins (cookie set by the language switch).
      { source: '/', has: [{ type: 'cookie', key: 'locale', value: 'ur' }], destination: '/ur', permanent: false },
      { source: '/', has: [{ type: 'cookie', key: 'locale', value: 'en' }], destination: '/en', permanent: false },
      // 2) Otherwise, respect an Urdu browser.
      { source: '/', has: [{ type: 'header', key: 'accept-language', value: '(?:^|.*,)\\s*ur.*' }], destination: '/ur', permanent: false },
      // 3) Default.
      { source: '/', destination: '/en', permanent: false },
      // Old URLs from the previous site.
      { source: '/:lang(en|ur)/work', destination: '/:lang/journey', permanent: true },
      { source: '/:lang(en|ur)/music', destination: '/:lang/sound', permanent: true },
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
