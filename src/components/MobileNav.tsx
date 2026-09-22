'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/LocaleContext'
import { navLinks } from '@/lib/data'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import { IconX } from '@/components/icons'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen mobile drawer.  Driven by `body.nav-open`
 * (which slides the drawer in via CSS) plus a local `open`
 * state for event handling.  Closes on Escape or click.
 * Locks body scroll while open.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const { lang, t } = useLocale()

  // Toggle body.nav-open class + lock scroll
  useEffect(() => {
    if (open) {
      document.body.classList.add('nav-open')
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.classList.remove('nav-open')
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [open, onClose])

  return (
    <nav className="mobile-nav" aria-label="Mobile" aria-hidden={!open}>
      <button
        type="button"
        className="mobile-nav__close icon-btn"
        onClick={onClose}
        aria-label={t('nav.close') as string}
      >
        <IconX />
      </button>

      <div className="mobile-nav__links">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={`/${lang}${link.slug}`}
            onClick={onClose}
          >
            {t(`nav.${link.key}`) as string}
          </Link>
        ))}
      </div>

      <div className="mobile-nav__actions">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </nav>
  )
}
