'use client'

import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

/**
 * Manages theme state (dark / light) with localStorage persistence
 * and a view-transition circle wipe when toggling.
 *
 * Mirrors the behaviour from the original base.html inline script.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  // On mount, read saved preference or fall back to system.
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ms-theme') : null
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved)
      setTheme(saved)
    }
  }, [])

  const toggle = (e?: React.MouseEvent<HTMLElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    // Set origin coordinates for the view-transition wipe
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      document.documentElement.style.setProperty('--vt-x', `${x}px`)
      document.documentElement.style.setProperty('--vt-y', `${y}px`)
    }

    const apply = () => {
      applyTheme(next)
      localStorage.setItem('ms-theme', next)
      setTheme(next)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }

  return { theme, toggle }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}
