/**
 * Inline SVG icons — self-contained, no external CDN dependency.
 * Based on Phosphor Regular style (24×24 viewBox, 1.6 stroke width).
 */

type IconProps = { className?: string }

/* ── Theme toggle ────────────────────────── */

export function IconSun({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={17}
      height={17}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      fill="none"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  )
}

export function IconMoon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={17} height={17} fill="currentColor">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  )
}

/* ── Preview cards (home) ───────────────────── */

export function IconCube({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M12 2L2 7v10l10 5 10-5V7z" />
      <path d="M2 17l10 5v-5.5M12 12V2M22 7l-10 5M2 7l10 5" />
    </svg>
  )
}

export function IconMusicNote({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M9 18V5l9-3v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 6 0M9 9l9-3" />
    </svg>
  )
}

export function IconQuotes({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M3 2l3 10H3v6h6V8l3-6H3zM15 2l3 10h-3v6h6V8l3-6h-8z" />
    </svg>
  )
}

/* ── Utility ────────────────────────────────── */

export function IconExternalLink({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={13}
      height={13}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M13 3l9 9M13 3h6v6M13 3V1" />
      <path d="M21 12v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

export function IconChevronLeft({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={14}
      height={14}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

/* ── Mobile nav ─────────────────────────────── */

export function IconX({ className = '' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={16}
      height={16}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
