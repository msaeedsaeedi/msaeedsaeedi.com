import Link from 'next/link'
import { site, socials } from '@content/site'
import type { Dictionary } from '@/i18n/en'
import type { Locale } from '@/i18n/config'
import { href, navItems } from '@/lib/routes'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { Logo } from './Logo'
import { BackToTop } from './BackToTop'

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo locale={locale} label={dict.nav.home} />
          <p className="meta max-w-xs">{dict.footer.line}</p>
          <a href={`mailto:${site.email}`} className="link-u inline-block font-medium" dir="ltr">
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
            {[...navItems, 'contact' as const].map((key) => (
              <li key={key}>
                <Link href={href(locale, key)} className="link-u text-ink-2 hover:text-ink">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-wrap content-start gap-2" aria-label={dict.contact.elsewhere}>
          {socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={s.label}
                title={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-rose hover:text-rose"
              >
                <SocialIcon id={s.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-line py-6">
        <p className="meta">
          © {locale === 'ur' ? '۲۰۲۶' : '2026'} {site.name[locale]}. {dict.footer.rights}
        </p>
        <BackToTop label={dict.footer.top} />
      </div>
    </footer>
  )
}
