"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw()
    }

    // Create a more visible flowing effect
    function draw() {
      if (!ctx) return

      const time = Date.now() * 0.0005
      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      // Draw flowing lines
      const lineCount = 15
      const lineSpacing = height / lineCount

      for (let i = 0; i < lineCount; i++) {
        const y = i * lineSpacing

        ctx.beginPath()
        ctx.moveTo(0, y)

        // Create a more pronounced wave effect
        for (let x = 0; x < width; x += 5) {
          const amplitude = 20
          const frequency = 0.002
          const speed = 0.5

          const waveY = y + Math.sin(x * frequency + time * speed) * amplitude

          ctx.lineTo(x, waveY)
        }

        // Use more visible gray for the lines
        const isDark = resolvedTheme === "dark"
        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${0.05 + (i / lineCount) * 0.05})`
          : `rgba(0, 0, 0, ${0.05 + (i / lineCount) * 0.05})`

        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Add some floating particles
      const particleCount = 30
      const isDark = resolvedTheme === "dark"

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time * (i * 0.2) + i * 50) * 0.5 + 0.5) * width
        const y = (Math.cos(time * (i * 0.15) + i * 50) * 0.5 + 0.5) * height
        const size = 1 + Math.sin(time * i) * 1

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${0.2 + Math.sin(time + i) * 0.1})`
          : `rgba(0, 0, 0, ${0.2 + Math.sin(time + i) * 0.1})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

