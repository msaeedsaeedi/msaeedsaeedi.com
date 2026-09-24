'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { PenLine, PenOff } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n/config'
import { InkCanvas } from './InkCanvas'
import { ProximityName } from './ProximityName'
import { Magnetic } from '@/components/ui/Magnetic'

const ease = [0.16, 1, 0.3, 1] as const
const INK_KEY = 'ink'

type Props = {
  locale: Locale
  name: string[] // lines of the display name
  counterName: string // the name in the other script
  lede: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  ink: { hint: string; on: string; off: string }
  portrait: { src: string; srcSet: string; alt: string }
}

export function Hero({ locale, name, counterName, lede, ctaPrimary, ctaSecondary, ink, portrait }: Props) {
  // Pointer parallax for the portrait and the counter-script name.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 20 })
  const sy = useSpring(py, { stiffness: 60, damping: 20 })
  const imgX = useTransform(sx, (v) => v * -14)
  const imgY = useTransform(sy, (v) => v * -10)
  const nameX = useTransform(sx, (v) => v * 26)
  const nameY = useTransform(sy, (v) => v * 16)
  const isUr = locale === 'ur'

  // The ink can be switched off; the choice is remembered on this device.
  const [inkOn, setInkOn] = useState(true)
  const [canInk, setCanInk] = useState(false)
  useEffect(() => {
    setCanInk(window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    try {
      if (localStorage.getItem(INK_KEY) === 'off') setInkOn(false)
    } catch {}
  }, [])
  const toggleInk = () => {
    setInkOn((v) => {
      try {
        localStorage.setItem(INK_KEY, v ? 'off' : 'on')
      } catch {}
      return !v
    })
  }

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-24"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        px.set(e.clientX / window.innerWidth - 0.5)
        py.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      <InkCanvas className="absolute inset-0 -z-10 h-full w-full" enabled={inkOn} />

      <div className="wrap grid items-center gap-12 md:grid-cols-12">
        <div className="relative z-10 md:col-span-7">
          <h1 className="display h1 relative">
            <ProximityName lines={name} />
            {/* The same person in the other script, floating over the name. */}
            <motion.span
              aria-hidden
              lang={isUr ? 'en' : 'ur'}
              className={`pointer-events-none absolute select-none text-gold ${
                isUr
                  ? 'font-sans -bottom-[0.1em] start-[55%] text-[0.42em] font-bold italic tracking-tight'
                  : 'font-gulzar -top-[0.3em] end-[2%] text-[0.62em] leading-none md:end-[-8%]'
              }`}
              style={{ x: nameX, y: nameY }}
              initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
              animate={{ opacity: 0.9, scale: 1, rotate: -6 }}
              transition={{ duration: 1.6, delay: 0.7, ease }}
            >
              {counterName}
            </motion.span>
          </h1>

          <motion.p
            className="lede measure mt-10 text-ink"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
          >
            {lede}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
          >
            <Magnetic>
              <Link href={ctaPrimary.href} className="btn btn-solid">
                {ctaPrimary.label}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={ctaSecondary.href} className="btn btn-ghost">
                {ctaSecondary.label}
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <div className="relative md:col-span-5 lg:col-span-4 lg:col-start-9">
          <motion.figure
            className="relative mx-auto aspect-[3/4] w-[min(78vw,24rem)] overflow-hidden rounded-[2rem] bg-paper-2 md:w-full"
            style={{ x: imgX, y: imgY }}
            initial={{ clipPath: 'inset(100% 0 0 0 round 2rem)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 2rem)' }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.85, 0, 0.15, 1] }}
          >
            <motion.img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(min-width: 768px) 30vw, 78vw"
              alt={portrait.alt}
              width={960}
              height={1280}
              fetchPriority="high"
              className="h-full w-full object-cover grayscale-[15%]"
              initial={{ scale: 1.25 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 2, delay: 0.35, ease }}
            />
            {/* Duotone wash ties the photo to the palette in both themes. */}
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-70" aria-hidden />
            <div className="absolute inset-0 mix-blend-color bg-ink/10 dark:bg-rose/10" aria-hidden />
          </motion.figure>

          {canInk && (
            <motion.div
              className="mt-5 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <button
                type="button"
                onClick={toggleInk}
                aria-pressed={inkOn}
                className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-ink-2 transition-colors hover:border-rose hover:text-rose"
              >
                {inkOn ? <PenLine size={13} /> : <PenOff size={13} />}
                {inkOn ? ink.on : ink.off}
              </button>
              {inkOn && <span className="meta text-xs">{ink.hint}</span>}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
