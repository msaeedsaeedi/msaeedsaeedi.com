'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Dictionary } from '@/i18n/en'
import type { Locale } from '@/i18n/config'
import { href, navItems } from '@/lib/routes'
import { isMultilingual } from '@/i18n/config'
import { LanguageSwitch } from './LanguageSwitch'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

type Props = { locale: Locale; nav: Dictionary['nav']; controls: Dictionary['controls']; homeLabel: string }

export function Header({ locale, nav, controls, homeLabel }: Props) {
  const pathname = usePathname() ?? ''
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Tuck the header away while reading down; bring it back on any upward scroll.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 240 && y > prev && !open)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (key: string) => pathname.startsWith(href(locale, key))
  const items = [...navItems, 'contact'] as const

  return (
    <>
      <a href="#main" className="sr-only z-[90] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {nav.skip}
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
            scrolled || open ? 'border-b border-line bg-paper/75 backdrop-blur-xl' : 'border-b border-transparent'
          }`}
        >
          <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
            <Logo locale={locale} label={homeLabel} />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((key) => (
                  <li key={key}>
                    <Link
                      href={href(locale, key)}
                      aria-current={isActive(key) ? 'page' : undefined}
                      className="group relative block rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink"
                    >
                      {isActive(key) && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-paper-2"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">
                        {nav[key]}
                        {/* Hover underline: draws in from the start edge. */}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 -bottom-1 h-[1.5px] origin-left scale-x-0 rounded-full bg-rose transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100 rtl:origin-right"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link href={href(locale, 'contact')} className="btn btn-solid hidden !py-2.5 lg:inline-flex">
                {nav.contact}
              </Link>
              {isMultilingual && <LanguageSwitch locale={locale} label={controls.language} short={controls.languageShort} />}
              <ThemeToggle labels={controls} />
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? nav.close : nav.menu}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-3 w-4">
                  <span className={`absolute inset-x-0 top-0 h-[1.5px] bg-current transition-transform duration-500 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                  <span className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition-transform duration-500 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper pt-[4.5rem] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
          >
            <nav aria-label="Mobile" className="wrap flex h-full flex-col justify-center pb-24">
              <ul>
                {items.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link href={href(locale, key)} className="flex items-baseline justify-between gap-4 py-3" aria-current={isActive(key) ? 'page' : undefined}>
                      <span className="display text-[clamp(2.4rem,11vw,4rem)] aria-[current=page]:text-rose">{nav[key]}</span>
                      <span className="meta text-end">{nav.hints[key]}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
