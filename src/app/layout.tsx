import '@/styles/base.css'
import type { ReactNode } from 'react'
import { Viewport } from 'next'

/**
 * Inline script that reads `ms-theme` from localStorage
 * (or falls back to OS preference) and sets `data-theme`
 * on <html> before CSS loads — eliminating the flash.
 */
const themeScript = `
(function(){try{
  var t=localStorage.getItem('ms-theme');
  if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
  document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();
`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0e12',
}

export const metadata = {
  // per-locale metadata is set in [lang]/layout
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Fraunces:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
