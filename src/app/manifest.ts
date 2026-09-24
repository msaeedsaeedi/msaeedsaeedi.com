import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohammad Saeed',
    short_name: 'Saeed',
    description: 'Product builder and Urdu poet (Saeedi).',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c1022',
    theme_color: '#0c1022',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
