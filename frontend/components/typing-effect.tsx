"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursor?: boolean
}

export function TypingEffect({ text, speed = 70, delay = 0, className = "", cursor = true }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startTyping)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isTyping, speed, text])

  return (
    <span className={className}>
      {displayedText}
      {cursor && currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-blink" />
      )}
      {cursor && currentIndex >= text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-blink" />
      )}
    </span>
  )
}

