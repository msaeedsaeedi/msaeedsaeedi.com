import type { BuildStatus } from '@content/builds'

/** Dot colour next to a build's status label. */
export const statusDot: Record<BuildStatus, string> = {
  design: 'bg-gold',
  research: 'bg-gold',
  experimental: 'bg-gold',
  building: 'bg-rose',
  shipped: 'bg-ink-2',
  paused: 'bg-ink-2/40',
}
