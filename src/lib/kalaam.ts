import poemsJson from '@/generated/kalaam.json'

export type Poem = {
  slug: string
  title: string
  titleUr: string
  form: string
  order: number
  spotifyTrack: string | null
  album: string | null
  trackNo: number | null
  epigraph: string | null
  epigraphCredit: string | null
  shers: string[][]
  /** Roman Urdu, sher for sher with `shers`; null until transliterated. */
  roman: string[][] | null
}

const poems = poemsJson as Poem[]

export function getPoems(): Poem[] {
  return poems
}

export function getPoem(slug: string): Poem | undefined {
  return poems.find((p) => p.slug === slug)
}

export function getNeighbours(slug: string) {
  const i = poems.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? poems[i - 1] : null,
    next: i < poems.length - 1 ? poems[i + 1] : null,
  }
}

export function getAlbumTracks(album: string): Poem[] {
  return poems.filter((p) => p.album === album && p.trackNo).sort((a, b) => a.trackNo! - b.trackNo!)
}
