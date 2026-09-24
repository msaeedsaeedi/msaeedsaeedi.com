'use client'

import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { SmoothScroll } from './SmoothScroll'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* reducedMotion="user" makes every motion component honour the OS setting. */}
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        {children}
      </MotionConfig>
    </ThemeProvider>
  )
}
