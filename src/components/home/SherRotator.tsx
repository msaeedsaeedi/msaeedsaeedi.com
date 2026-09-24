'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Sher } from '@/components/kalaam/Sher'

type Item = { lines: [string, string]; href: string; title: string }

export function SherRotator({ items, next, read }: { items: Item[]; next: string; read: string }) {
  const [i, setI] = useState(0)
  const item = items[i]
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="grid min-h-[9.5rem] w-full place-items-center md:min-h-[13rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="w-full"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sher lines={item.lines} size="xl" className="mx-auto" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href={item.href} className="btn btn-solid">
          {read}
          <span lang="ur" className="font-gulzar opacity-70">
            «{item.title}»
          </span>
        </Link>
        <button type="button" onClick={() => setI((v) => (v + 1) % items.length)} className="btn btn-ghost">
          <RefreshCw size={15} />
          {next}
        </button>
      </div>
    </div>
  )
}
