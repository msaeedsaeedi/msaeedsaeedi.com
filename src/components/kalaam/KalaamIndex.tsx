'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Music2, Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import type { Locale } from '@/i18n/config'
import { localDigits } from '@/lib/format'
import { ScriptDock, type Script } from './ScriptToggle'

export type PoemCard = {
  slug: string
  title: string
  titleUr: string
  matla: string[]
  romanMatla: string[] | null
  sherCount: number
  trackNo: number | null
  /** Album name, shown as a tooltip on the track badge. */
  album: string | null
  shersText: string
  /** Plain text of every line, used for search. */
  text: string
  /** Roman Urdu of every line, used for search. */
  romanText: string
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
  script: { label: string } & Record<Script, string>
}

// Harakat and other marks that shouldn't block a match (zer, zabar, pesh, shadd, etc.).
const MARKS = /[ً-ٰٟۖ-ۭٕٔ]/g
// Roman Urdu has no fixed spelling: "kis ko lahad mein utara gaya hai" is typed as
// "kisko lahad ma utara gya ha", "mohabbat" as "mohabat", "bhi" as "b". So both sides are reduced to
// a consonant skeleton: word-final nasal n dropped, then h and vowels removed, q/v/f folded into k/w/p,
// doubled letters collapsed, spaces ignored. Matching is a substring test on the skeletons.
const plain = (s: string) => ` ${s.toLowerCase().replace(/[^a-z]+/g, ' ').trim()} `
const romanKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .replace(/([aeiou])n\b/g, '$1')
    .replace(/[\sh]|[aeiou]/g, '')
    .replace(/q/g, 'k')
    .replace(/v/g, 'w')
    .replace(/f/g, 'p')
    .replace(/(.)\1+/g, '$1')
const norm = (s: string) => s.replace(MARKS, '').replace(/ۂ/g, 'ہ').replace(/ي/g, 'ی').toLowerCase()

export function KalaamIndex({ poems, locale, t, hrefBase }: { poems: PoemCard[]; locale: Locale; t: T; hrefBase: string }) {
  const [q, setQ] = useState('')
  const [onlySung, setOnlySung] = useState(false)
  const query = useDeferredValue(q)

  const indexed = useMemo(
    () => poems.map((p) => ({ ...p, hay: norm(`${p.titleUr} ${p.text}`), romanHay: romanKey(`${p.title} ${p.romanText}`), romanPlain: plain(`${p.title} ${p.romanText}`) })),
    [poems],
  )
  const q2 = query.trim().toLowerCase()
  const qKey = romanKey(q2)
  // Latin input searches titles and Roman Urdu; anything else searches the Urdu. Short queries
  // collapse to a skeleton of a letter or two, so they match whole words instead.
  const matches = (p: (typeof indexed)[number]) =>
    /[a-z]/.test(q2)
      ? p.romanPlain.includes(plain(q2).trimEnd()) || (qKey.length >= 3 && p.romanHay.includes(qKey))
      : p.hay.includes(norm(q2))
  const shown = indexed.filter((p) => (!onlySung || p.trackNo) && (!q2 || matches(p)))

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row-reverse md:items-center md:justify-between">
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

      <ScriptDock labels={t.script} />
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
        <ul dir="rtl" className="script-flip grid border-t border-line md:grid-cols-2">
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
                    <h2 className="transition-colors group-hover:text-rose">
                      <span lang="ur" className="script-ur font-gulzar text-[1.9rem] leading-[1.8]">
                        {p.titleUr}
                      </span>
                      <span dir="ltr" lang="ur-Latn" className="only-roman font-serif text-[1.7rem] italic leading-[1.5]">
                        {p.title}
                      </span>
                    </h2>
                    {p.trackNo && (
                      <span className="chip shrink-0" title={p.album ?? t.sung}>
                        <Music2 size={12} aria-hidden />
                        {localDigits(p.trackNo, locale)}
                      </span>
                    )}
                  </div>
                  {locale === 'en' && (
                    <p dir="ltr" lang="en" className="script-ur meta -mt-3 text-end italic">
                      {p.title}
                    </p>
                  )}
                  <div lang="ur" dir="rtl" className="script-ur font-gulzar max-w-[26rem] text-[1.15rem] leading-[2.1] text-ink-2 transition-colors group-hover:text-ink">
                    {p.matla.map((l, i) => (
                      <span key={i} className="misra">
                        {l}
                      </span>
                    ))}
                  </div>
                  {p.romanMatla && (
                    <div lang="ur-Latn" dir="ltr" className="roman script-roman text-flip text-right transition-colors group-hover:text-ink">
                      {p.romanMatla.map((l, i) => (
                        <span key={i} className="block">
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
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
