import type { ReactNode } from 'react'
import { Rise, Appear } from '@/components/ui/Reveal'

/** Title block shared by every inner page: the title in its own script, the counterpart in the other. */
export function PageHeader({ title, alt, altLang, intro, children }: { title: string; alt?: string; altLang?: 'en' | 'ur'; intro?: string; children?: ReactNode }) {
  return (
    <header className="wrap pt-36 pb-14 md:pt-44 md:pb-20">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
        <h1 className="display h1">
          <Rise>{title}</Rise>
        </h1>
        {alt && (
          <Appear delay={0.4}>
            <span aria-hidden lang={altLang} className={`text-gold ${altLang === 'ur' ? 'font-gulzar text-[clamp(1.8rem,4vw,3.2rem)]' : 'font-sans text-[clamp(1.2rem,2.4vw,2rem)] font-bold'}`}>
              {alt}
            </span>
          </Appear>
        )}
      </div>
      {intro && (
        <Appear delay={0.25}>
          <p className="lede measure mt-8 text-ink-2">{intro}</p>
        </Appear>
      )}
      {children}
    </header>
  )
}
