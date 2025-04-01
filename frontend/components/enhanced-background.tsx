"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface MousePosition {
  x: number
  y: number
}

export function EnhancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationFrameRef = useRef<number>()
  const timeRef = useRef<number>(0)

  // Track actual mouse position and target position for smooth movement
  const actualMousePosition = useRef<MousePosition>({ x: 0, y: 0 })
  const targetMousePosition = useRef<MousePosition>({ x: 0, y: 0 })

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    targetMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  // Handle touch movement for mobile
  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      targetMousePosition.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
    }
  }

  // Handle window resize
  const handleResize = () => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect()
      setDimensions({ width, height })

      // Set initial position to center of screen
      if (actualMousePosition.current.x === 0 && actualMousePosition.current.y === 0) {
        actualMousePosition.current = {
          x: width / 2,
          y: height / 2,
        }
        targetMousePosition.current = {
          x: width / 2,
          y: height / 2,
        }
      }

      // Update canvas dimensions
      canvasRef.current.width = width
      canvasRef.current.height = height
    }
  }

  // Draw the combined background effects
  const drawBackground = (timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Update time reference for animations
    timeRef.current = timestamp * 0.001 // convert to seconds

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Smooth movement - ease towards target position
    actualMousePosition.current.x += (targetMousePosition.current.x - actualMousePosition.current.x) * 0.1
    actualMousePosition.current.y += (targetMousePosition.current.y - actualMousePosition.current.y) * 0.1

    // Update state for components that might need it
    setMousePosition({
      x: actualMousePosition.current.x,
      y: actualMousePosition.current.y,
    })

    // Draw flowing lines (from AnimatedBackground)
    drawFlowingLines(ctx, canvas.width, canvas.height, timeRef.current)

    // Draw floating particles (from AnimatedBackground)
    drawFloatingParticles(ctx, canvas.width, canvas.height, timeRef.current)

    // Draw the glowing orb (from GlowingOrbBackground)
    drawGlowingOrb(ctx, canvas.width, canvas.height, timeRef.current)

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(drawBackground)
  }

  // Draw flowing lines
  const drawFlowingLines = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const isDark = resolvedTheme === "dark"
    const lineCount = 15
    const lineSpacing = height / lineCount

    for (let i = 0; i < lineCount; i++) {
      const y = i * lineSpacing

      ctx.beginPath()
      ctx.moveTo(0, y)

      // Create a more pronounced wave effect
      for (let x = 0; x < width; x += 5) {
        const amplitude = 25 // Increased amplitude for more visibility
        const frequency = 0.002
        const speed = 0.5

        const waveY = y + Math.sin(x * frequency + time * speed) * amplitude

        ctx.lineTo(x, waveY)
      }

      // Use more visible colors for the lines
      if (isDark) {
        // Dark mode - brighter lines
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + (i / lineCount) * 0.08})` // Increased opacity
      } else {
        // Light mode - darker lines for better visibility
        ctx.strokeStyle = `rgba(100, 110, 120, ${0.08 + (i / lineCount) * 0.08})` // Using the antimatter grey color
      }

      ctx.lineWidth = 1.5 // Slightly thicker lines
      ctx.stroke()
    }
  }

  // Draw floating particles
  const drawFloatingParticles = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const isDark = resolvedTheme === "dark"
    const particleCount = 40 // More particles

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.sin(time * (i * 0.2) + i * 50) * 0.5 + 0.5) * width
      const y = (Math.cos(time * (i * 0.15) + i * 50) * 0.5 + 0.5) * height
      const size = 1.5 + Math.sin(time * i) * 1.5 // Larger particles

      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)

      if (isDark) {
        // Dark mode - brighter particles
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.15})`
      } else {
        // Light mode - darker particles for better visibility
        ctx.fillStyle = `rgba(100, 110, 120, ${0.3 + Math.sin(time + i) * 0.15})`
      }

      ctx.fill()
    }
  }

  // Draw the glowing orb
  const drawGlowingOrb = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const isDarkTheme = resolvedTheme === "dark"

    // Add subtle pulsing effect
    const pulseSize = 1 + Math.sin(time * 1.5) * 0.1 // 10% size variation
    const pulseOpacity = 0.9 + Math.sin(time * 2) * 0.1 // 10% opacity variation

    // Create the main glow
    const gradient = ctx.createRadialGradient(
      actualMousePosition.current.x,
      actualMousePosition.current.y,
      0,
      actualMousePosition.current.x,
      actualMousePosition.current.y,
      isDarkTheme ? 300 * pulseSize : 280 * pulseSize, // Slightly larger in light mode for more presence
    )

    if (isDarkTheme) {
      // Dark theme - ghostly light grey glow
      gradient.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity})`)
      gradient.addColorStop(0.2, `rgba(230, 230, 230, 0.7)`)
      gradient.addColorStop(0.4, `rgba(200, 200, 200, 0.4)`)
      gradient.addColorStop(0.7, `rgba(150, 150, 150, 0.2)`)
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
    } else {
      // Light theme - antimatter/ghost-like grey
      // Using cooler, slightly bluish greys for an antimatter feel
      gradient.addColorStop(0, `rgba(180, 185, 190, ${pulseOpacity * 0.9})`) // Cool grey with slight blue tint
      gradient.addColorStop(0.2, `rgba(150, 160, 170, 0.7)`) // Medium cool grey
      gradient.addColorStop(0.4, `rgba(120, 130, 140, 0.5)`) // Darker cool grey
      gradient.addColorStop(0.6, `rgba(90, 100, 110, 0.3)`) // Even darker
      gradient.addColorStop(0.8, `rgba(70, 75, 80, 0.1)`) // Almost black with blue tint
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    }

    // Draw the gradient
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add a small center with subtle animation
    const centerSize = 30 * (1 + Math.sin(time * 3) * 0.15) // 15% size variation
    const centerGradient = ctx.createRadialGradient(
      actualMousePosition.current.x,
      actualMousePosition.current.y,
      0,
      actualMousePosition.current.x,
      actualMousePosition.current.y,
      centerSize,
    )

    if (isDarkTheme) {
      // Dark theme - brighter center
      centerGradient.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity})`)
      centerGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    } else {
      // Light theme - ghostly grey center with slight inversion effect
      centerGradient.addColorStop(0, `rgba(160, 170, 180, ${pulseOpacity * 0.95})`) // Cool grey center
      centerGradient.addColorStop(0.5, `rgba(130, 140, 150, ${pulseOpacity * 0.7})`) // Fade to medium grey
      centerGradient.addColorStop(1, "rgba(100, 110, 120, 0)") // Fade to darker grey then transparent
    }

    ctx.fillStyle = centerGradient
    ctx.fillRect(0, 0, width, height)

    // Add a subtle "antimatter" effect in light mode - a very slight inverted halo
    if (!isDarkTheme) {
      const inverseCenterSize = 15 * (1 + Math.sin(time * 2.5) * 0.1) // Smaller, faster pulsing
      const inverseGradient = ctx.createRadialGradient(
        actualMousePosition.current.x,
        actualMousePosition.current.y,
        inverseCenterSize * 0.2, // Start slightly away from center
        actualMousePosition.current.x,
        actualMousePosition.current.y,
        inverseCenterSize,
      )

      // Create a subtle darker ring for the antimatter effect
      inverseGradient.addColorStop(0, "rgba(70, 75, 80, 0.1)")
      inverseGradient.addColorStop(0.5, "rgba(60, 65, 70, 0.15)")
      inverseGradient.addColorStop(1, "rgba(50, 55, 60, 0)")

      ctx.fillStyle = inverseGradient
      ctx.fillRect(0, 0, width, height)
    }
  }

  useEffect(() => {
    // Set up event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("resize", handleResize)

    // Initialize dimensions
    handleResize()

    // Start animation
    animationFrameRef.current = requestAnimationFrame(drawBackground)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full z-0" style={{ touchAction: "none" }} />
}

