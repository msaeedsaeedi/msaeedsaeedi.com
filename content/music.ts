// Albums for /sound. Track → poem mapping lives in each poem's frontmatter (spotifyTrack, trackNo).
import type { L } from '@/i18n/config'

export type Album = {
  slug: string
  title: L
  status: 'released' | 'upcoming'
  cover: string | null
  spotifyId: string | null
  trackCount: number
  /** Total running time in ms (released albums only). */
  durationMs?: number
  /** For upcoming albums: poems (slugs) expected on it, if known. */
  poems?: string[]
}

export const albums: Album[] = [
  {
    slug: 'gulab-e-suman',
    title: { en: 'Gulab-e-Suman', ur: 'گلابِ سمن' },
    status: 'released',
    cover: '/images/music/gulab-e-suman.jpg',
    spotifyId: '3UMgWtCOb5RlAhPvCiXQfk',
    trackCount: 9,
    durationMs: 3387044,
  },
  {
    slug: 'wehm-e-kham-e-khayal',
    title: { en: 'Wehm-e-Kham-e-Khayal', ur: 'وہمِ خامِ خیال' },
    status: 'upcoming',
    // Drop artwork at public/images/music/wehm-e-kham-e-khayal.jpg and set the path here.
    cover: null,
    spotifyId: null,
    trackCount: 3,
    poems: ['wehm-e-kham-e-khayal'],
  },
]

/** Durations from Spotify, keyed by track id. */
export const trackDurations: Record<string, number> = {
  '4Ql9hRFH3jtwZMxcYSyvuT': 387123,
  '0RGog4cirokUcgp1M1veKx': 804896,
  '1ce8vGqbNJadQMkQQCa1ut': 372169,
  '0HbmRLam4s5z6bE3TNN0KQ': 269258,
  '2ki6tHiWJ21Eye5hXLv5Ge': 236007,
  '7GadchJjkJ7jzjeQ67DSHN': 358051,
  '2ZvzfT5KaIxQeEyIbAN7Ih': 332788,
  '3z2nQsN5vvkw5mEymZwtwJ': 308175,
  '3R0StrvoNoduw4lfq2Ofo1': 318577,
}
