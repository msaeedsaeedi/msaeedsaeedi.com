'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

/**
 * Click-to-load Spotify player. Nothing from Spotify loads (no cookies, no
 * 1MB of script) until the visitor asks for it.
 */
export function SpotifyEmbed({
  kind,
  id,
  title,
  cta,
  note,
  compact = false,
}: {
  kind: 'track' | 'album'
  id: string
  title: string
  cta: string
  note: string
  compact?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const height = compact ? 152 : 380
  if (loaded) {
    return (
      <iframe
        title={title}
        src={`https://open.spotify.com/embed/${kind}/${id}?utm_source=msaeedsaeedi.com&theme=0`}
        width="100%"
        height={height}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="rounded-2xl border-0"
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      data-cursor="▶"
      className="spot group flex w-full items-center gap-4 rounded-2xl border border-line p-4 text-start transition-colors hover:border-rose"
      style={{ minHeight: compact ? 88 : 120 }}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose text-white transition-transform duration-500 group-hover:scale-110">
        <Play size={18} fill="currentColor" className="translate-x-[1px]" />
      </span>
      <span>
        <span className="block font-semibold">{cta}</span>
        <span className="meta block">{note}</span>
      </span>
    </button>
  )
}
