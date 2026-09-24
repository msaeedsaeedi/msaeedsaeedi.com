'use client'

import { useEffect, useRef } from 'react'

type Pt = { x: number; y: number; t: number }

const LIFE = 1600 // ms a stroke stays visible
const NIB = (-38 * Math.PI) / 180 // a broad nib held at an angle, like a qalam

/**
 * The hero's signature: the pointer writes with a calligrapher's broad nib.
 * Stroke width comes from the nib angle against the direction of travel, so
 * curves thicken and thin the way Nastaliq does. A short demo stroke plays on
 * load to show that the page can be written on. Disabled for reduced motion.
 */
export function InkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let pts: Pt[] = []
    let raf = 0
    let running = false
    let w = 0
    let h = 0
    let nib = 16
    let rose = '#a3203f'
    let gold = '#8d6a22'

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      rose = cs.getPropertyValue('--rose').trim() || rose
      gold = cs.getPropertyValue('--gold').trim() || gold
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nib = Math.max(10, Math.min(22, w / 70))
    }

    const add = (x: number, y: number) => {
      const last = pts[pts.length - 1]
      const now = performance.now()
      if (last && Math.hypot(x - last.x, y - last.y) < 2) return
      // Interpolate long jumps so fast flicks stay continuous.
      if (last) {
        const d = Math.hypot(x - last.x, y - last.y)
        const steps = Math.min(12, Math.floor(d / 14))
        for (let i = 1; i < steps; i++) {
          const k = i / steps
          pts.push({ x: last.x + (x - last.x) * k, y: last.y + (y - last.y) * k, t: now })
        }
      }
      pts.push({ x, y, t: now })
      start()
    }

    const draw = () => {
      const now = performance.now()
      pts = pts.filter((p) => now - p.t < LIFE)
      ctx.clearRect(0, 0, w, h)
      const nx = Math.cos(NIB)
      const ny = Math.sin(NIB)
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        if (b.t - a.t > 120) continue // lifted pen
        const age = (now - b.t) / LIFE
        const fade = 1 - age * age
        const half = (nib / 2) * (0.35 + 0.65 * fade)
        ctx.globalAlpha = 0.9 * fade
        ctx.fillStyle = i % 9 === 0 ? gold : rose
        ctx.beginPath()
        ctx.moveTo(a.x + nx * half, a.y + ny * half)
        ctx.lineTo(b.x + nx * half, b.y + ny * half)
        ctx.lineTo(b.x - nx * half, b.y - ny * half)
        ctx.lineTo(a.x - nx * half, a.y - ny * half)
        ctx.closePath()
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (pts.length) raf = requestAnimationFrame(draw)
      else running = false
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x < 0 || y < 0 || x > r.width || y > r.height) return
      if (e.pointerType === 'touch' && e.buttons === 0) return
      add(x, y)
    }

    // Demo stroke: one sweeping swash, right to left like a line of Urdu, ending in a small loop.
    let demoRaf = 0
    const demo = () => {
      const t0 = performance.now()
      const R = Math.min(w, h) * 0.18
      const x0 = w * 0.62
      const y0 = h * 0.42
      const step = () => {
        const k = (performance.now() - t0) / 1300
        if (k > 1) return
        const e = 1 - Math.pow(1 - k, 2)
        const x = x0 - e * R * 2.4 + Math.sin(e * Math.PI * 3) * R * 0.18 * e
        const y = y0 + Math.sin(e * Math.PI * 1.15) * R * 0.75 - Math.cos(e * Math.PI * 3) * R * 0.12 * e
        add(x, y)
        demoRaf = requestAnimationFrame(step)
      }
      step()
    }

    readColors()
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('pointermove', onMove, { passive: true })
    const demoTimer = window.setTimeout(demo, 1400)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(demoRaf)
      clearTimeout(demoTimer)
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
