import { notFound } from 'next/navigation'
import { ArrowUpRight, Mail } from 'lucide-react'
import { site, socials } from '@content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import en from '@/i18n/en'
import ur from '@/i18n/ur'
import { pageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import { CopyButton } from '@/components/ui/CopyButton'
import { LocalTime } from '@/components/ui/LocalTime'
import { Magnetic } from '@/components/ui/Magnetic'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { Appear } from '@/components/ui/Reveal'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const d = getDictionary(lang)
  return pageMetadata(lang, 'contact', { title: d.contact.title, description: d.contact.intro })
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang).contact
  const other = lang === 'en' ? ur : en

  return (
    <>
      <PageHeader title={t.title} alt={other.contact.title} altLang={lang === 'en' ? 'ur' : 'en'} intro={t.intro} />

      <section className="wrap">
        <Appear>
          <a
            href={`mailto:${site.email}`}
            dir="ltr"
            data-cursor="✉"
            className="group block break-all font-sans text-[clamp(1.8rem,6.4vw,5.5rem)] font-bold leading-[1] tracking-[-0.04em] transition-colors hover:text-rose rtl:text-right"
          >
            {site.email}
            <span className="block h-[3px] origin-left scale-x-0 bg-rose transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" aria-hidden />
          </a>
        </Appear>
        <div className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <a href={`mailto:${site.email}`} className="btn btn-solid">
              <Mail size={16} />
              {t.write}
            </a>
          </Magnetic>
          <CopyButton text={site.email} label={t.copy} done={t.copied} />
        </div>
      </section>

      <section className="wrap mt-28 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="h3 mb-6">{t.reasonsTitle}</h2>
          <ul className="space-y-4">
            {t.reasons.map((r) => (
              <li key={r} className="flex gap-3 border-b border-line pb-4">
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-paper-2 p-6">
            <p className="meta">{t.localTime}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">
              <LocalTime timeZone={site.timeZone} locale={lang} />
            </p>
            <p className="meta">{t.timezone}</p>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="h3 mb-6">{t.elsewhere}</h2>
          <ul className="border-t border-line">
            {socials.map((s) => (
              <li key={s.id} className="border-b border-line">
                <a href={s.href} target="_blank" rel="noopener noreferrer me" className="group flex items-center gap-4 py-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors group-hover:border-rose group-hover:bg-rose group-hover:text-white">
                    <SocialIcon id={s.id} />
                  </span>
                  <span className="flex-1">
                    <span className="latin block font-semibold">{s.label}</span>
                    <span className="meta latin block">{s.handle}</span>
                  </span>
                  <ArrowUpRight size={18} className="text-ink-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose rtl:-scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
