'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

/** Preserves the original orb's 0.1 interpolation at 60 Hz, independent of frame rate. */
export function EnhancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)'),
      fine = matchMedia('(pointer: fine)')
    let frame = 0,
      last = 0,
      seen = false,
      width = 0,
      height = 0
    const actual = { x: 0, y: 0 },
      target = { x: 0, y: 0 }
    const resize = () => {
      width = innerWidth
      height = innerHeight
      canvas.width = width
      canvas.height = height
    }
    const move = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!seen) {
        actual.x = target.x
        actual.y = target.y
        seen = true
      }
    }
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const blend = 1 - Math.pow(0.9, Math.min((t - last) / 16.667, 3))
      last = t
      actual.x += (target.x - actual.x) * blend
      actual.y += (target.y - actual.y) * blend
      if (seen) {
        const glow = ctx.createRadialGradient(
          actual.x,
          actual.y,
          0,
          actual.x,
          actual.y,
          55,
        )
        glow.addColorStop(
          0,
          resolvedTheme === 'dark'
            ? 'rgba(239,176,91,.17)'
            : 'rgba(171,113,44,.1)',
        )
        glow.addColorStop(1, 'rgba(200,145,70,0)')
        ctx.fillStyle = glow
        ctx.fillRect(actual.x - 55, actual.y - 55, 110, 110)
        ctx.beginPath()
        ctx.arc(actual.x, actual.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(201,146,66,.55)'
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }
    const restart = () => {
      cancelAnimationFrame(frame)
      ctx.clearRect(0, 0, width, height)
      if (!document.hidden && !reduced.matches && fine.matches) {
        last = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    resize()
    restart()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', restart)
    reduced.addEventListener('change', restart)
    fine.addEventListener('change', restart)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', restart)
      reduced.removeEventListener('change', restart)
      fine.removeEventListener('change', restart)
    }
  }, [resolvedTheme])
  return <canvas ref={canvasRef} className="ember-cursor" aria-hidden="true" />
}
