import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { builds, getBuild } from '@content/builds'
import { site } from '@content/site'
import { statusDot } from '@/components/builds/status'
import { isLocale, publishedLocales } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata } from '@/lib/metadata'
import { buildGraph } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { href } from '@/lib/routes'
import { BuildCover } from '@/components/ui/BuildCover'
import { Rise, Appear } from '@/components/ui/Reveal'
import { SocialIcon } from '@/components/ui/SocialIcon'

type Props = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return publishedLocales.flatMap((lang) => builds.map((b) => ({ lang, slug: b.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const b = getBuild(slug)
  if (!isLocale(lang) || !b) return {}
  return pageMetadata(lang, `builds/${slug}`, { title: b.name, description: b.oneLiner[lang], type: 'article' })
}

export default async function BuildPage({ params }: Props) {
  const { lang, slug } = await params
  const b = getBuild(slug)
  if (!isLocale(lang) || !b) notFound()
  const d = getDictionary(lang).builds
  const i = builds.indexOf(b)
  const next = builds[(i + 1) % builds.length]
  const Back = lang === 'ur' ? ArrowRight : ArrowLeft
  const Fwd = lang === 'ur' ? ArrowLeft : ArrowRight

  return (
    <article>
      <JsonLd data={buildGraph(lang, b)} />
      <header className="wrap pt-32 md:pt-40">
        <Link href={href(lang, 'builds')} className="meta link group inline-flex items-center gap-2">
          <Back size={15} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          {d.back}
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="chip">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[b.status]}`} aria-hidden />
            {d.status[b.status]}
          </span>
          <span className="chip">{d.kind[b.kind]}</span>
        </div>
        <h1 className="latin display h1 mt-6">
          <Rise>{b.name}</Rise>
        </h1>
        <Appear delay={0.2}>
          <p className="lede measure mt-8">{b.oneLiner[lang]}</p>
        </Appear>
        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
          <div>
            <dt className="meta">{d.role}</dt>
            <dd className="mt-1 font-medium">{b.role[lang]}</dd>
          </div>
          <div>
            <dt className="meta">{d.year}</dt>
            <dd className="latin mt-1 font-medium">{b.year}</dd>
          </div>
          <div className="col-span-2">
            <dt className="meta">{d.stack}</dt>
            <dd className="latin mt-1 font-medium">{b.stack.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <Appear className="wrap mt-12">
        <BuildCover build={b} className="h-[38vh] min-h-64 rounded-[2rem]" />
      </Appear>

      <div className="wrap mt-20 grid gap-16 md:grid-cols-12">
        <div className="space-y-14 md:col-span-7">
          {b.question && (
            <figure className="border-s-2 border-rose ps-6">
              <figcaption className="meta mb-3">{d.question}</figcaption>
              <blockquote className="lede">{b.question[lang]}</blockquote>
            </figure>
          )}
          <section>
            <h2 className="h3 mb-4">{d.problem}</h2>
            <p className="prose-serif text-ink">{b.problem[lang]}</p>
          </section>
          <section>
            <h2 className="h3 mb-4">{d.approach}</h2>
            <p className="prose-serif text-ink">{b.approach[lang]}</p>
          </section>
          {b.epilogue && (
            <section className="rounded-[1.75rem] bg-paper-2 p-7 md:p-9">
              <h2 className="h3 mb-4">{d.epilogue}</h2>
              <p className="prose-serif text-ink">{b.epilogue[lang]}</p>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(b.name)}`} className="btn btn-solid mt-6">
                <Mail size={16} />
                {b.epilogueCta?.[lang] ?? d.epilogueCta}
              </a>
            </section>
          )}
          {b.draft && <p className="rounded-2xl border border-dashed border-gold/60 p-5 text-ink-2">{d.moreSoon}</p>}
        </div>
        <aside className="space-y-12 md:col-span-4 md:col-start-9">
          <section>
            <h2 className="h3 mb-4">{d.highlights}</h2>
            <ul className="space-y-3">
              {b.highlights.map((h) => (
                <li key={h.en} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-rose" aria-hidden />
                  <span>{h[lang]}</span>
                </li>
              ))}
            </ul>
          </section>
          {(b.links.repo || b.links.site || b.links.extra) && (
          <section>
            <h2 className="h3 mb-4">{d.links}</h2>
            <ul className="space-y-2">
              {b.links.repo && (
                <li>
                  <a href={b.links.repo} target="_blank" rel="noopener noreferrer" className="link group inline-flex items-center gap-2 font-medium">
                    <SocialIcon id="github" size={16} />
                    {d.source}
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              )}
              {b.links.site && (
                <li>
                  <a href={b.links.site} target="_blank" rel="noopener noreferrer" className="link group inline-flex items-center gap-2 font-medium">
                    {d.visit}
                    <ArrowUpRight size={15} />
                  </a>
                </li>
              )}
              {b.links.extra?.map((x) => (
                <li key={x.href}>
                  <a href={x.href} target="_blank" rel="noopener noreferrer" className="link group inline-flex items-center gap-2 font-medium">
                    {x.label[lang]}
                    <ArrowUpRight size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          )}
        </aside>
      </div>

      <nav className="wrap mt-28" aria-label={d.next}>
        <Link href={href(lang, `builds/${next.slug}`)} className="group block border-t border-line pt-10">
          <span className="meta inline-flex items-center gap-2">
            {d.next}
            <Fwd size={15} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </span>
          <span className="latin display h2 mt-3 block transition-colors group-hover:text-rose">{next.name}</span>
        </Link>
      </nav>
    </article>
  )
}
