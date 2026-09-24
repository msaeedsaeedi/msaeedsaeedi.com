// Handles URLs outside /en and /ur (e.g. /something-old). Requires experimental.globalNotFound.
import type { Metadata } from 'next'
import { Bricolage_Grotesque, Gulzar, Noto_Nastaliq_Urdu } from 'next/font/google'
import { NotFoundBody } from '@/components/layout/NotFoundBody'
import './globals.css'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', axes: ['wdth', 'opsz'] })
const gulzar = Gulzar({ subsets: ['arabic'], weight: '400', variable: '--font-gulzar-face', preload: false })
const nastaliq = Noto_Nastaliq_Urdu({ subsets: ['arabic'], variable: '--font-noto-nastaliq', preload: false })

export const metadata: Metadata = { title: 'Page not found | Mohammad Saeed', robots: { index: false } }

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${bricolage.variable} ${gulzar.variable} ${nastaliq.variable}`}>
      <body>
        <NotFoundBody />
      </body>
    </html>
  )
}
