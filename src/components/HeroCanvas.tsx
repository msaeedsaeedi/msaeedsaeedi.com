'use client'

import { useRef } from 'react'
import { useParticles } from '@/hooks/useParticles'

/**
 * Full-bleed canvas behind the hero.  The particle field
 * starts when the hero enters the viewport and pauses when
 * it leaves, conserving battery on mobile.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticles(canvasRef)
  return (
    <canvas
      ref={canvasRef}
      className="hero__canvas"
      id="hero-canvas"
      aria-hidden="true"
    />
  )
}
