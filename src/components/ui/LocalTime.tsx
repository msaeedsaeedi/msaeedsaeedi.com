'use client'

import { useEffect, useState } from 'react'

export function LocalTime({ timeZone, locale }: { timeZone: string; locale: 'en' | 'ur' }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])
  if (!now) return <span className="opacity-0">00:00</span>
  const fmt = new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-GB', { timeZone, hour: '2-digit', minute: '2-digit' })
  return <time dateTime={now.toISOString()}>{fmt.format(now)}</time>
}
