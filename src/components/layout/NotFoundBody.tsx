import Link from 'next/link'
import en from '@/i18n/en'
import ur from '@/i18n/ur'

/** Bilingual on purpose: a 404 can't know which language the visitor came from. */
export function NotFoundBody() {
  return (
    <section className="wrap grid min-h-[80vh] place-items-center pt-28 text-center">
      <div>
        <p lang="ur" dir="rtl" className="sher mx-auto max-w-md text-[clamp(1.4rem,3vw,2rem)] text-ink-2">
          <span className="misra">نہیں ہو ، نہیں ہو، نہیں ہو، نہیں ہو، نہیں ہو</span>
        </p>
        <h1 className="display h2 mt-10">{en.notFound.title}</h1>
        <p className="mt-3 text-ink-2">{en.notFound.body}</p>
        <p lang="ur" dir="rtl" className="font-gulzar mt-8 text-3xl leading-[1.8]">
          {ur.notFound.title}
        </p>
        <p lang="ur" dir="rtl" className="font-nastaliq text-ink-2 leading-[2.2]">
          {ur.notFound.body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/en" className="btn btn-solid">
            {en.notFound.home}
          </Link>
          <Link href="/ur" lang="ur" className="btn btn-ghost font-nastaliq">
            {ur.notFound.home}
          </Link>
        </div>
      </div>
    </section>
  )
}
