'use client'

import { useTheme } from '@/hooks/useTheme'
import { IconMoon, IconSun } from '@/components/icons'

/**
 * Sun / moon toggle button with a view-transition circle-wipe.
 * The sun icon is shown in dark mode (click to go light);
 * the moon icon is shown in light mode (click to go dark).
 */
export function ThemeToggle() {
  const { toggle } = useTheme()

  return (
    <button
      type="button"
      className="icon-btn theme-toggle magnetic"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <IconSun className="ph-sun" />
      <IconMoon className="ph-moon" />
    </button>
  )
}
