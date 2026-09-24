'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useState } from 'react'

export type Script = 'ur' | 'both' | 'roman'
const scripts: Script[] = ['ur', 'both', 'roman']

/**
 * Runs in <head> before first paint so the chosen script shows without a flash.
 * Urdu is the default and has no attribute; `both` and `roman` set `data-script`. CSS in
 * globals.css does the hiding: `.script-ur` (Urdu script), `.script-roman` (Roman Urdu),
 * `.only-roman` (shown in Roman mode only).
 */
export const scriptInit = `try{var s=localStorage.getItem('script');if(s==='both'||s==='roman')document.documentElement.dataset.script=s}catch(e){}`

export function currentScript(): Script {
  const s = typeof document === 'undefined' ? null : document.documentElement.dataset.script
  return s === 'both' || s === 'roman' ? s : 'ur'
}

type Labels = { label: string } & Record<Script, string>

/** Urdu · Both · Roman. The choice is site-wide and remembered. */
export function ScriptToggle({ labels, className }: { labels: Labels; className?: string }) {
  const [script, setScript] = useState<Script>('ur')
  const pill = useId()

  useEffect(() => {
    setScript(currentScript())
    const sync = () => setScript(currentScript())
    window.addEventListener('scriptchange', sync)
    return () => window.removeEventListener('scriptchange', sync)
  }, [])

  function choose(s: Script) {
    if (s === 'ur') delete document.documentElement.dataset.script
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

/**
 * The toggle floating at the bottom of the screen, so it's always within reach while reading.
 * Slides in shortly after load, and steps aside while the footer is on screen.
 */
export function ScriptDock({ labels }: { labels: Labels }) {
  const [ready, setReady] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600)
    const footer = document.querySelector('footer')
    const io = footer ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting)) : null
    if (footer && io) io.observe(footer)
    return () => {
      clearTimeout(t)
      io?.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {ready && !footerVisible && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex justify-center px-4"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-line bg-paper/85 p-1 shadow-xl sm:ps-4 shadow-ink/10 backdrop-blur-xl">
            <span className="meta hidden sm:inline">{labels.label}</span>
            <ScriptToggle labels={labels} className="border-0 !p-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
