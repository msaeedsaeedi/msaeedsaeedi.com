'use client'

import { useLocale } from '@/lib/LocaleContext'
import { Bilingual } from '@/components/Bilingual'

/**
 * Animated scroll-down cue with a sliding dot.
 * Shows localized "Scroll" label that switches
 * automatically via the Bilingual component.
 */
export function ScrollCue() {
  const { lang } = useLocale()
  return (
    <div className="scroll-cue" aria-hidden="true">
      <span className="scroll-cue__line" />
      <span className="scroll-cue__label">
        <Bilingual en="Scroll" ur="سکرول" locale={lang} />
      </span>
    </div>
  )
}
