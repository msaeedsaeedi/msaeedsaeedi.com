import { cn } from '@/lib/format'

/** A couplet set the traditional way: two misre justified to one shared width. */
export function Sher({ lines, className, size = 'md' }: { lines: string[]; className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: 'text-[1.15rem] max-w-[20rem]',
    md: 'text-[clamp(1.35rem,2.4vw,1.75rem)] max-w-[30rem]',
    lg: 'text-[clamp(1.6rem,3.4vw,2.5rem)] max-w-[40rem]',
    xl: 'text-[clamp(1.7rem,4vw,3rem)] max-w-[38rem]',
  }
  return (
    <p lang="ur" dir="rtl" className={cn('sher', sizes[size], className)}>
      {lines.map((l, i) => (
        <span key={i} className="misra">
          {l}
        </span>
      ))}
    </p>
  )
}
