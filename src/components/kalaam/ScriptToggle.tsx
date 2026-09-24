'use client'

import { motion } from 'motion/react'
import { useEffect, useId, useState } from 'react'

export type Script = 'ur' | 'both' | 'roman'
const scripts: Script[] = ['ur', 'both', 'roman']

/**
 * Runs in <head> before first paint so the chosen script shows without a flash.
 * `both` is the default and has no attribute. CSS in globals.css does the hiding:
 * `.script-ur` (Urdu script), `.script-roman` (Roman Urdu), `.only-roman` (shown in Roman mode only).
 */
export const scriptInit = `try{var s=localStorage.getItem('script');if(!s&&localStorage.getItem('roman')==='off')s='ur';if(s==='ur'||s==='roman')document.documentElement.dataset.script=s}catch(e){}`

export function currentScript(): Script {
  const s = typeof document === 'undefined' ? null : document.documentElement.dataset.script
  return s === 'ur' || s === 'roman' ? s : 'both'
}

/** Urdu · Both · Roman. The choice is site-wide and remembered. */
export function ScriptToggle({ labels, className }: { labels: { label: string } & Record<Script, string>; className?: string }) {
  const [script, setScript] = useState<Script>('both')
  const pill = useId()

  useEffect(() => {
    setScript(currentScript())
    const sync = () => setScript(currentScript())
    window.addEventListener('scriptchange', sync)
    return () => window.removeEventListener('scriptchange', sync)
  }, [])

  function choose(s: Script) {
    if (s === 'both') delete document.documentElement.dataset.script
    else document.documentElement.dataset.script = s
    try {
      localStorage.setItem('script', s)
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event('scriptchange'))
  }

  return (
    <div role="radiogroup" aria-label={labels.label} dir="ltr" className={`inline-flex rounded-full border border-line p-1 text-sm ${className ?? ''}`}>
      {scripts.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={script === s}
          onClick={() => choose(s)}
          className="relative isolate rounded-full px-3.5 py-1 text-ink-2 transition-colors hover:text-ink aria-checked:text-paper"
        >
          {script === s && (
            <motion.span layoutId={pill} className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
          )}
          <span lang={s === 'ur' ? 'ur' : undefined} className={s === 'ur' ? 'font-gulzar text-base leading-none' : ''}>
            {labels[s]}
          </span>
        </button>
      ))}
    </div>
  )
}
