'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/lib/LocaleContext'
import { navLinks } from '@/lib/data'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import { MobileNav } from '@/components/MobileNav'
import { useNavScroll } from '@/hooks/useNavScroll'

/**
 * Site header with logo, desktop nav links, theme toggle,
 * language toggle, and mobile menu trigger.
 *
 * The desktop nav links use the magnetic hover hook.
 * Scroll behaviour (adds `.scrolled` class for background
 * transition) is handled by `useNavScroll`.
 */
export function Header() {
  const { lang, t } = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useNavScroll()

  const isActive = (slug: string) => pathname === `/${lang}${slug}`

  return (
    <>
      <header ref={navRef} className="nav">
        <div className="wrap nav__inner">
          {/* Logo — bilingual EN/UR */}
          <Link href={`/${lang}`} className="logo magnetic">
            <span className="logo__en" lang="en">M. Saeed</span>
            <span className="logo__ur" lang="ur" dir="rtl">محمد سعید</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${lang}${link.slug}`}
                className={`nav__link magnetic${isActive(link.slug) ? ' active' : ''}`}
                aria-current={isActive(link.slug) ? 'page' : undefined}
              >
                {t(`nav.${link.key}`) as string}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="nav__actions">
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              className="menu-toggle icon-btn"
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.menu') as string}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
