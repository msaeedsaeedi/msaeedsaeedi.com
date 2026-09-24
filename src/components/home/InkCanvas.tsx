'use client'

import { useEffect, useRef } from 'react'

/** Tune the pen here. Every value is a plain number so it's easy to experiment. */
export const INK_DEFAULTS = {
  /** Thickest stroke, drawn when the pen moves slowly (px). */
  maxWidth: 9,
  /** Thinnest stroke, drawn on fast flicks (px). */
  minWidth: 1.2,
  /** Speed (px/frame) at which the stroke reaches its thinnest. */
  fastSpeed: 38,
  /** Angle of the broad nib, like a qalam held for Nastaliq (degrees). */
  nibAngle: -40,
  /** How much the nib angle shapes the width, 0 = round brush, 1 = pure broad nib. */
  nibInfluence: 0.55,
  /** How closely the pen follows the cursor, 0..1. Lower = smoother, lazier. */
  follow: 0.28,
  /** How quickly ink dries away, 0..1 per frame. Lower = trails last longer. */
  dryRate: 0.032,
  /** Selector for elements the pen lifts over. Ink lives in the negative space. */
  avoid: 'a, button, input, h1, h2, p, img, figure, [data-ink-avoid]',
}

type Options = Partial<typeof INK_DEFAULTS>

/**
 * Cursor calligraphy for the hero. A pen glides after the pointer (so strokes are
 * smooth even when the mouse is jittery), its width set by speed and nib angle.
 * It lifts over text, buttons and the portrait, so it never scribbles on content,
 * and the ink dries away on its own. Off for touch, reduced motion, or when disabled.
 */
export function InkCanvas({ className, enabled = true, options }: { className?: string; enabled?: boolean; options?: Options }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !enabled) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const o = { ...INK_DEFAULTS, ...options }
    const nib = (o.nibAngle * Math.PI) / 180

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let ink = '#a3203f'
    // Pointer target and the pen chasing it.
    const target = { x: 0, y: 0, down: false }
    const pen = { x: 0, y: 0, width: o.minWidth, active: false }
    let inkLeft = 0 // frames of drying left before the loop can idle

    const readColor = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--rose').trim() || ink
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const segment = (x0: number, y0: number, x1: number, y1: number, w0: number, w1: number) => {
      // A filled quad with round caps: no seams, no overlap artefacts.
      const dx = x1 - x0
      const dy = y1 - y0
      const len = Math.hypot(dx, dy) || 1
      const nx = -dy / len
      const ny = dx / len
      ctx.beginPath()
      ctx.moveTo(x0 + nx * w0, y0 + ny * w0)
      ctx.lineTo(x1 + nx * w1, y1 + ny * w1)
      ctx.lineTo(x1 - nx * w1, y1 - ny * w1)
      ctx.lineTo(x0 - nx * w0, y0 - ny * w0)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x1, y1, w1, 0, Math.PI * 2)
      ctx.fill()
    }

    const frame = () => {
      raf = 0
      // Dry the ink: fade everything already on the canvas a little.
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0,0,0,${o.dryRate})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      if (target.down) {
        if (!pen.active) {
          pen.x = target.x
          pen.y = target.y
          pen.width = o.minWidth
          pen.active = true
        } else {
          const nx = pen.x + (target.x - pen.x) * o.follow
          const ny = pen.y + (target.y - pen.y) * o.follow
          const dx = nx - pen.x
          const dy = ny - pen.y
          const speed = Math.hypot(dx, dy)
          if (speed > 0.4) {
            const bySpeed = o.maxWidth - (o.maxWidth - o.minWidth) * Math.min(1, speed / o.fastSpeed)
            const angle = Math.atan2(dy, dx)
            const byNib = Math.abs(Math.sin(angle - nib))
            const wanted = Math.max(o.minWidth, bySpeed * (1 - o.nibInfluence + o.nibInfluence * byNib))
            const next = pen.width + (wanted - pen.width) * 0.35
            ctx.fillStyle = ink
            ctx.globalAlpha = 0.85
            segment(pen.x, pen.y, nx, ny, pen.width / 2, next / 2)
            ctx.globalAlpha = 1
            pen.width = next
            inkLeft = 130 // long enough for the ink to fully dry before the loop stops
          }
          pen.x = nx
          pen.y = ny
        }
      } else {
        pen.active = false
      }

      if (inkLeft > 0) inkLeft--
      if (visible && (target.down || inkLeft > 0)) raf = requestAnimationFrame(frame)
      else ctx.clearRect(0, 0, w, h)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height
      const over = (e.target as Element | null)?.closest?.(o.avoid)
      target.x = x
      target.y = y
      // Lift the pen over content; put it down again in empty space.
      target.down = inside && !over
      kick()
    }
    const onLeave = () => {
      target.down = false
      kick()
    }

    readColor()
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const mo = new MutationObserver(readColor)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) kick()
    })
    io.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      ctx.clearRect(0, 0, w, h)
    }
  }, [enabled, options])

  return <canvas ref={ref} aria-hidden className={className} />
}
