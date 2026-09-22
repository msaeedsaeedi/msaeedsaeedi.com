'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/LocaleContext'
import { socialLinks } from '@/lib/data'

/**
 * Site footer with a tagline, contact links, social icons,
 * and copyright.  All copy is localized via `t()`.
 */
export function Footer() {
  const { lang, t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          {/* Tagline column */}
          <div className="footer__col">
            <div className="footer__tag">M. Saeed</div>
            <div className="footer__sub">
              {t('footer.tagline') as string}
            </div>
          </div>

          {/* Contact column */}
          <div className="footer__col">
            <div className="footer__tag">{t('footer.reach') as string}</div>
            <div className="footer__sub footer__sub--links">
              <a href="mailto:saeed@saeed.pk" className="footer__link magnetic">
                {t('footer.email') as string}
              </a>
              <a
                href="https://github.com/msaeedsaeedi"
                className="footer__link magnetic"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.github') as string}
              </a>
            </div>
          </div>

          {/* Social column */}
          <div className="footer__col">
            <div className="footer__tag">{t('footer.social') as string}</div>
            <div className="footer__sub footer__sub--links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer__link magnetic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>© {year} Mohammad Saeed</span>
          <Link href={`/${lang}/connect`} className="footer__link magnetic">
            {t('footer.connect') as string}
          </Link>
        </div>
      </div>
    </footer>
  )
}
