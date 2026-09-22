import Image from 'next/image'

/**
 * Animated SVG flourish that draws itself on page load.
 * The path animation is handled entirely by CSS
 * (stroke-dasharray / stroke-dashoffset animation).
 */
export function Flourish() {
  return (
    <svg
      className="hero__flourish"
      viewBox="0 0 420 60"
      width={420}
      height={60}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4,42 C70,10 130,54 200,26 S330,4 416,34"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}
