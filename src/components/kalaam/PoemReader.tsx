'use client'

import { motion } from 'motion/react'
import { Check, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'

type Labels = { copy: string; copied: string; share: string; linkCopied: string }

/**
 * The ghazal, one sher at a time. Each sher rises in as it scrolls into view
 * and can be copied on its own (with attribution), which is how shers travel.
 */
export function PoemReader({ shers, title, url, poet, labels }: { shers: string[][]; title: string; url: string; poet: string; labels: Labels }) {
  const [copied, setCopied] = useState<number | null>(null)
  const [shared, setShared] = useState(false)

  async function copy(i: number) {
    const text = `${shers[i].join('\n')}\n— ${poet}\n${url}`
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
      <ol className="mx-auto max-w-[40rem] space-y-2">
        {shers.map((lines, i) => (
          <motion.li
            key={i}
            className="group relative rounded-3xl px-4 py-5 transition-colors hover:bg-paper-2 md:px-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p lang="ur" dir="rtl" className="sher text-[clamp(1.45rem,3.2vw,2.15rem)]">
              {lines.map((l, j) => (
                <span key={j} className="misra">
                  {l}
                </span>
              ))}
            </p>
            <button
              type="button"
              onClick={() => copy(i)}
              aria-label={`${labels.copy} ${i + 1}`}
              className="absolute end-2 top-2 grid h-9 w-9 place-items-center rounded-full text-ink-2 opacity-0 transition-opacity hover:text-rose focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-60"
            >
              {copied === i ? <Check size={15} /> : <Copy size={15} />}
            </button>
            {copied === i && (
              <span role="status" className="meta absolute end-12 top-3">
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
