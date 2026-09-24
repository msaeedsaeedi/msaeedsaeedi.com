'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import type { Build, BuildKind } from '@content/builds'
import { statusDot } from './status'
import type { Dictionary } from '@/i18n/en'
import type { Locale } from '@/i18n/config'
import { href } from '@/lib/routes'
import { BuildCover } from '@/components/ui/BuildCover'
import { Spotlight } from '@/components/ui/Spotlight'

type Filter = 'all' | BuildKind

export function BuildsGrid({ builds, locale, t }: { builds: Build[]; locale: Locale; t: Dictionary['builds'] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = builds.filter((b) => filter === 'all' || b.kind === filter)
  const filters = (['all', 'flagship', 'research', 'product', 'tool'] as Filter[]).filter((f) => f === 'all' || builds.some((b) => b.kind === f))

  return (
    <div>
      <div role="group" aria-label="Filter" className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="relative isolate rounded-full border border-line px-4 py-1.5 text-sm transition-colors aria-pressed:border-ink aria-pressed:text-paper"
          >
            {filter === f && <motion.span layoutId="build-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            {t.filters[f]}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((b) => (
            <motion.li
              key={b.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={b.kind === 'flagship' ? 'md:col-span-2' : ''}
            >
              <Spotlight className="group h-full overflow-hidden rounded-[2rem] border border-line transition-colors hover:border-rose/50">
                <Link href={href(locale, `builds/${b.slug}`)} className={`grid h-full ${b.kind === 'flagship' ? 'md:grid-cols-[1.1fr_1fr]' : ''}`} data-cursor={locale === 'ur' ? 'دیکھیے' : 'Open'}>
                  <div className="overflow-hidden">
                    <BuildCover build={b} className={`transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] ${b.kind === 'flagship' ? 'h-64 md:h-full md:min-h-80' : 'h-52'}`} />
                  </div>
                  <div className="flex flex-col gap-4 p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip">
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[b.status]}`} aria-hidden />
                        {t.status[b.status]}
                      </span>
                      <span className="chip">{t.kind[b.kind]}</span>
                      <span className="meta latin ms-auto">{b.year}</span>
                    </div>
                    <h2 className="latin text-2xl font-semibold tracking-tight md:text-3xl">{b.name}</h2>
                    <p className="text-ink-2">{b.oneLiner[locale]}</p>
                    <ul className="latin mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 text-sm text-ink-2">
                      {b.stack.slice(0, 5).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Spotlight>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
