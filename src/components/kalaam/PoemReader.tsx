'use client'

import { motion } from 'motion/react'
import { Check, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'
import { currentScript, ScriptDock, type Script } from './ScriptToggle'

type Labels = { copy: string; copied: string; share: string; linkCopied: string; script: { label: string } & Record<Script, string> }

// Rendered width of a misra in Gulzar is about 0.32–0.36em per character; a little headroom keeps justified lines from wrapping.
const EM_PER_CHAR = 0.38

/**
 * The ghazal, one sher at a time. Each sher rises in as it scrolls into view
 * and can be copied on its own (with attribution), which is how shers travel.
 * `longest` is the character count of the poem's longest misra; the type scales down so it always fits on one line.
 * `roman` (Roman Urdu) is always in the HTML so search engines index it; the reading preference only hides one or the other.
 */
export function PoemReader({
  shers,
  roman,
  longest,
  title,
  url,
  poet,
  labels,
}: {
  shers: string[][]
  roman: string[][] | null
  longest: number
  title: string
  url: string
  poet: string
  labels: Labels
}) {
  const fontSize = `min(clamp(1.45rem, 3.2vw, 2.15rem), max(0.95rem, calc(100cqi / ${(longest * EM_PER_CHAR).toFixed(2)})))`
  // Short poems stay compact instead of justifying a few words across the whole column.
  const maxWidth = `${(longest * (EM_PER_CHAR - 0.01)).toFixed(1)}em`

  const [copied, setCopied] = useState<number | null>(null)
  const [shared, setShared] = useState(false)
  async function copy(i: number) {
    // Copy what the reader is looking at.
    const script = roman ? currentScript() : 'ur'
    const parts = [script !== 'roman' && shers[i].join('\n'), script !== 'ur' && roman?.[i].join('\n')].filter(Boolean)
    const text = `${parts.join('\n\n')}\n— ${poet}\n${url}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(i)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      /* ignore */
    }
  }

  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url })
      else {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 1800)
      }
    } catch {
      /* dismissed */
    }
  }

  return (
    <div>
      {roman && <ScriptDock labels={labels.script} />}
      <ol className="mx-auto max-w-[46rem] space-y-2">
        {shers.map((lines, i) => (
          <motion.li
            key={i}
            className="group relative rounded-3xl px-2 pb-12 pt-5 transition-colors [container-type:inline-size] hover:bg-paper-2 md:px-16 md:py-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p lang="ur" dir="rtl" className="sher script-ur mx-auto" style={{ fontSize, maxWidth }}>
              {lines.map((l, j) => (
                <span key={j} className="misra">
                  {l}
                </span>
              ))}
            </p>
            {roman && (
              <p lang="ur-Latn" dir="ltr" className="roman script-roman mx-auto mt-3 max-w-[34rem] text-center">
                {roman[i].map((l, j) => (
                  <span key={j} className="block">
                    {l}
                  </span>
                ))}
              </p>
            )}
            <button
              type="button"
              onClick={() => copy(i)}
              aria-label={`${labels.copy} ${i + 1}`}
              className="absolute bottom-1 end-1 grid h-9 w-9 md:bottom-auto md:end-3 md:top-1/2 md:-translate-y-1/2 place-items-center rounded-full text-ink-2 opacity-0 transition-opacity hover:text-rose focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-60"
            >
              {copied === i ? <Check size={15} /> : <Copy size={15} />}
            </button>
            {copied === i && (
              <span role="status" className="meta absolute bottom-3 end-11 md:bottom-1 md:end-4">
                {labels.copied}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
      <div className="mt-12 flex justify-center">
        <button type="button" onClick={share} className="btn btn-ghost">
          {shared ? <Check size={15} /> : <Share2 size={15} />}
          <span aria-live="polite">{shared ? labels.linkCopied : labels.share}</span>
        </button>
      </div>
    </div>
  )
}
