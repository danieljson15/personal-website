"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursor?: boolean
  hideCursorAfter?: number // Time in ms to hide cursor after typing completes
}

export function TypingEffect({
  text,
  speed = 70,
  delay = 0,
  className = "",
  cursor = true,
  hideCursorAfter = 1000, // Default 1 second
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(cursor)

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
    } else if (cursor && hideCursorAfter > 0) {
      // Hide cursor after specified delay when typing is complete
      const cursorTimeout = setTimeout(() => {
        setShowCursor(false)
      }, hideCursorAfter)

      return () => clearTimeout(cursorTimeout)
    }
  }, [currentIndex, isTyping, speed, text, cursor, hideCursorAfter])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-blink" />
      )}
      {showCursor && currentIndex >= text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-blink" />
      )}
    </span>
  )
}

