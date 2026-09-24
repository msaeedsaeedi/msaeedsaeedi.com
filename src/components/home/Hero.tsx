'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { InkCanvas } from './InkCanvas'
import { Magnetic } from '@/components/ui/Magnetic'

const ease = [0.16, 1, 0.3, 1] as const

type Props = {
  locale: Locale
  name: string[] // lines of the display name
  counterName: string // the name in the other script
  lede: string
  roles: string[]
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  hint: string
  portrait: { src: string; srcSet: string; alt: string }
}

export function Hero({ locale, name, counterName, lede, roles, ctaPrimary, ctaSecondary, hint, portrait }: Props) {
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

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 pb-16 md:pt-32"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        px.set(e.clientX / window.innerWidth - 0.5)
        py.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      <InkCanvas className="absolute inset-0 -z-10 h-full w-full" />

      <div className="wrap grid items-end gap-10 md:grid-cols-12">
        <div className="relative z-10 md:col-span-7 lg:col-span-7">
          <motion.ul
            className="meta mb-8 flex flex-wrap gap-x-5 gap-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {roles.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-rose" aria-hidden />
                {r}
              </li>
            ))}
          </motion.ul>

          <h1 className="display h1 relative">
            {name.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            {/* The same person in the other script, floating over the name. */}
            <motion.span
              aria-hidden
              lang={isUr ? 'en' : 'ur'}
              className={`pointer-events-none absolute select-none text-gold ${
                isUr
                  ? 'font-sans -bottom-[0.1em] start-[55%] text-[0.42em] font-bold italic tracking-tight'
                  : 'font-gulzar -top-[0.25em] end-[2%] text-[0.62em] leading-none md:end-[-6%]'
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
            className="lede measure mt-8 text-ink"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
          >
            {lede}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
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
            className="relative mx-auto aspect-[3/4] w-[min(78vw,26rem)] overflow-hidden rounded-[2rem] bg-paper-2 md:w-full"
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
          <motion.p
            className="meta mt-4 hidden text-center [@media(hover:hover)]:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            {hint}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
