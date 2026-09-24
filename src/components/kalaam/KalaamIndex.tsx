'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Music2, Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import type { Locale } from '@/i18n/config'
import { localDigits } from '@/lib/format'

export type PoemCard = {
  slug: string
  title: string
  titleUr: string
  matla: string[]
  sherCount: number
  trackNo: number | null
  /** Album name, shown as a tooltip on the track badge. */
  album: string | null
  shersText: string
  /** Plain text of every line, used for search. */
  text: string
}

type T = {
  search: string
  searchLabel: string
  all: string
  sung: string
  empty: string
  clear: string
  /** Pre-rendered labels indexed by count (functions can't cross to the client). */
  count: string[]
}

// Harakat and other marks that shouldn't block a match (zer, zabar, pesh, shadd, etc.).
const MARKS = /[ً-ٰٟۖ-ۭٕٔ]/g
const norm = (s: string) => s.replace(MARKS, '').replace(/ۂ/g, 'ہ').replace(/ي/g, 'ی').toLowerCase()

export function KalaamIndex({ poems, locale, t, hrefBase }: { poems: PoemCard[]; locale: Locale; t: T; hrefBase: string }) {
  const [q, setQ] = useState('')
  const [onlySung, setOnlySung] = useState(false)
  const query = useDeferredValue(q)

  const indexed = useMemo(() => poems.map((p) => ({ ...p, hay: norm(`${p.title} ${p.titleUr} ${p.text}`) })), [poems])
  const shown = indexed.filter((p) => (!onlySung || p.trackNo) && (!query.trim() || p.hay.includes(norm(query.trim()))))

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-md">
          <span className="sr-only">{t.searchLabel}</span>
          <Search size={17} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-2" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
            className="w-full rounded-full border border-line bg-transparent py-3 ps-11 pe-4 outline-none transition-colors placeholder:text-ink-2/70 focus:border-rose"
          />
        </label>
        <div role="group" className="flex gap-2">
          {[false, true].map((sung) => (
            <button
              key={String(sung)}
              type="button"
              aria-pressed={onlySung === sung}
              onClick={() => setOnlySung(sung)}
              className="relative isolate inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm transition-colors aria-pressed:text-paper"
            >
              {onlySung === sung && <motion.span layoutId="kalaam-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              {sung && <Music2 size={14} />}
              {sung ? t.sung : t.all}
            </button>
          ))}
        </div>
      </div>

      <p className="meta mb-4" aria-live="polite">
        {t.count[shown.length]}
      </p>

      {shown.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line p-10 text-center">
          <p>{t.empty}</p>
          <button type="button" onClick={() => setQ('')} className="btn btn-ghost mt-6">
            <X size={15} />
            {t.clear}
          </button>
        </div>
      ) : (
        <ul dir="rtl" className="grid border-t border-line md:grid-cols-2">
          <AnimatePresence initial={false}>
            {shown.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b border-line md:odd:border-e md:[&:nth-child(odd)]:pe-8 md:[&:nth-child(even)]:ps-8"
              >
                <Link href={`${hrefBase}/${p.slug}`} className="group flex h-full flex-col gap-3 py-8" data-cursor={locale === 'ur' ? 'پڑھیے' : 'Read'}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 lang="ur" className="font-gulzar text-[1.9rem] leading-[1.8] transition-colors group-hover:text-rose">
                      {p.titleUr}
                    </h2>
                    {p.trackNo && (
                      <span className="chip shrink-0" title={p.album ?? t.sung}>
                        <Music2 size={12} aria-hidden />
                        {localDigits(p.trackNo, locale)}
                      </span>
                    )}
                  </div>
                  {locale === 'en' && (
                    <p dir="ltr" lang="en" className="meta -mt-3 text-end italic">
                      {p.title}
                    </p>
                  )}
                  <div lang="ur" dir="rtl" className="font-gulzar max-w-[26rem] text-[1.15rem] leading-[2.1] text-ink-2 transition-colors group-hover:text-ink">
                    {p.matla.map((l, i) => (
                      <span key={i} className="misra">
                        {l}
                      </span>
                    ))}
                  </div>
                  <p dir={locale === 'en' ? 'ltr' : 'rtl'} className="meta text-end">{p.shersText}</p>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
