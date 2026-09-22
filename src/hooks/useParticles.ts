'use client'

import { useEffect, useRef } from 'react'

/**
 * Hero background particle field on a <canvas>.
 * Particles drift gently and are repelled by the cursor.
 * Stops when the hero section leaves the viewport (via IntersectionObserver)
 * and on reduced-motion / coarse-pointer devices.
 */
export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    heroRef.current = canvas.closest<HTMLElement>('.hero')
    const heroEl = heroRef.current
    if (!heroEl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, particles: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const accentColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c9932e'

    const resize = () => {
      const rect = heroEl.getBoundingClientRect()
      w = canvas.width = Math.max(1, rect.width * dpr)
      h = canvas.height = Math.max(1, rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    const seed = () => {
      resize()
      const count = Math.min(55, Math.floor((w * h) / (dpr * dpr) / 9000))
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18 * dpr,
          vy: (Math.random() - 0.5) * 0.18 * dpr,
          r: (Math.random() * 1.3 + 0.6) * dpr,
        })
      }
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      const col = accentColor()
      const rad = 130 * dpr

      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy

        if (d2 < rad * rad) {
          const d = Math.sqrt(d2) || 1
          const f = (rad - d) / rad
          p.x += (dx / d) * f * 1.5
          p.y += (dy / d) * f * 1.5
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = col
        ctx.globalAlpha = 0.4
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(step)
    }

    const start = () => { seed(); cancelAnimationFrame(raf); raf = requestAnimationFrame(step) }
    const stop = () => cancelAnimationFrame(raf)

    let running = false

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * dpr
      mouse.y = (e.clientY - rect.top) * dpr
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    window.addEventListener('resize', seed)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    // Only animate when the hero is visible
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          if (!running) { start(); running = true }
        } else {
          if (running) { stop(); running = false }
        }
      })
    }, { threshold: 0.05 })

    io.observe(heroEl)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', seed)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [canvasRef])
}
