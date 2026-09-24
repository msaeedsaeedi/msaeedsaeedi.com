import type { Build } from '@content/builds'

/**
 * Typographic cover for a build: no stock imagery, just the project's glyph
 * over a field of lines whose rhythm depends on the kind of build.
 * Replace with a real screenshot by adding `cover` support if you prefer.
 */
export function BuildCover({ build, className = '' }: { build: Pick<Build, 'glyph' | 'kind' | 'slug'>; className?: string }) {
  const lines = build.kind === 'flagship' ? 18 : build.kind === 'product' ? 12 : 8
  const seed = [...build.slug].reduce((a, c) => a + c.charCodeAt(0), 0)
  return (
    <div className={`relative overflow-hidden bg-[#131a33] text-[#ebe7ef] dark:bg-[#1b2140] ${className}`} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: lines }, (_, i) => {
          const r = 30 + i * (260 / lines)
          const cx = 200 + ((seed % 7) - 3) * 18
          const cy = 150 + ((seed % 5) - 2) * 14
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={i % 4 === 0 ? '#e8577a' : 'currentColor'}
              strokeOpacity={i % 4 === 0 ? 0.9 : 0.14}
              strokeWidth={i % 4 === 0 ? 1.4 : 1}
              strokeDasharray={build.kind === 'tool' ? '2 6' : undefined}
            />
          )
        })}
      </svg>
      <span className="font-sans absolute bottom-3 start-5 text-[5.5rem] font-bold leading-none tracking-[-0.06em] text-white/95">
        {build.glyph}
      </span>
    </div>
  )
}
