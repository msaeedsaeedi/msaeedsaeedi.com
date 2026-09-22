'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/LocaleContext'
import { HeroCanvas } from '@/components/HeroCanvas'
import { Flourish } from '@/components/Flourish'
import { ScrollCue } from '@/components/ScrollCue'
import { MagneticLink } from '@/components/MagneticLink'

/**
 * Hero section: bilingual name heading, tagline, subline,
 * CTAs, SVG flourish, particle canvas, and scroll cue.
 *
 * All copy is localized via the locale context.
 */
export function Hero() {
  const { lang, t } = useLocale()
  const locale = lang

  return (
    <section className="hero hero-fade">
      <HeroCanvas />

      <div className="wrap hero__content">
        <div className="hero__label">{t('hero.label') as string}</div>

        <h1 className="hero__name">
          <span lang="en">Mohammad Saeed</span>
          <span className="font-ur" lang="ur" dir="rtl">محمد سعید</span>
        </h1>

        <Flourish />

        <div className="hero__tagline">{t('hero.tagline') as string}</div>
        <div className="hero__subline">{t('hero.subline') as string}</div>

        <div className="hero__cta">
          <MagneticLink href={`/${locale}/work`} className="btn btn-primary">
            {t('hero.cta.work') as string}
          </MagneticLink>
          <MagneticLink href={`/${locale}/kalaam`} className="btn btn-outline">
            {t('hero.cta.poetry') as string}
          </MagneticLink>
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
