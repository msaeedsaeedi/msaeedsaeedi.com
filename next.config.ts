import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Every route is prerendered, so the whole site ships as static files in `out/`.
  // Cloudflare serves those from Workers Static Assets for free: no Worker runs for pages
  // or for the router's `?_rsc=` prefetches. Redirects live in public/_redirects and
  // headers in public/_headers, because next.config redirects/headers need a server.
  output: 'export',
  reactStrictMode: true,
  // Images are pre-optimized by `bun run images`; there is no image server.
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
}

export default nextConfig
