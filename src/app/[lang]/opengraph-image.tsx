import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { locales } from '@/i18n/config'

// Rendered once per language at build time; served as a static file.
export const dynamic = 'force-static'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Mohammad Saeed, product builder and Urdu poet'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function OgImage() {
  const portrait = await readFile(join(process.cwd(), 'public/images/portrait-square.jpg'))
  const src = `data:image/jpeg;base64,${portrait.toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0c1022', color: '#ebe7ef', fontFamily: 'sans-serif' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 56px 56px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 34, fontWeight: 700 }}>
            saeed<span style={{ color: '#e8577a', margin: '0 6px' }}>/</span>
            <span style={{ color: '#d8b266' }}>saeedi</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4 }}>Mohammad</div>
            <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4 }}>Saeed</div>
            <div style={{ marginTop: 28, fontSize: 32, color: '#979db6', maxWidth: 560, lineHeight: 1.3 }}>
              I build products and write Urdu ghazals.
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#979db6' }}>msaeedsaeedi.com</div>
        </div>
        <div style={{ width: 430, height: '100%', display: 'flex', position: 'relative' }}>
          <img src={src} width={430} height={630} style={{ objectFit: 'cover', width: 430, height: 630 }} alt="" />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(90deg, #0c1022 0%, rgba(12,16,34,0) 35%)' }} />
        </div>
      </div>
    ),
    size,
  )
}
