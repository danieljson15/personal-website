'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Pause, Play, RotateCcw } from 'lucide-react'
import type { RuinsWorld } from './create-ruins-scene'

const POKE_LINES = [
  'Capybara approves.',
  'Status: chilling.',
  'Quietly keeping an eye on you.',
  'It is thinking about grass.',
  'Please do not disturb. (Too late.)',
  'You have made a friend.',
]

/** Mounted once at the layout level so the world (and its loaded assets)
 * survive route changes — the scene panel is a permanent companion, not a
 * per-page hero. On navigation the camera eases to that route's framing of
 * the scene, which stands in for a page transition without covering the
 * panel or reloading anything. */
export function RuinsScene() {
  const canvas = useRef<HTMLCanvasElement>(null),
    world = useRef<RuinsWorld | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  )
  const [paused, setPaused] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const pokes = useRef(0)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const mood: 'day' | 'night' = resolvedTheme === 'light' ? 'day' : 'night'
  const moodRef = useRef(mood)
  const initialPathname = useRef(pathname)
  const lastPathname = useRef(pathname)
  useEffect(() => {
    moodRef.current = mood
    world.current?.setMood(mood)
  }, [mood, state])
  useEffect(() => {
    if (state === 'loading') return
    // Keep the intro loader up briefly even when everything is cached, so it reads as a beat, not a flash.
    const timer = setTimeout(
      () => {
        document.documentElement.dataset.scene = state
      },
      Math.max(0, 900 - performance.now()),
    )
    return () => clearTimeout(timer)
  }, [state])
  useEffect(() => {
    if (state !== 'ready' || pathname === lastPathname.current) return
    lastPathname.current = pathname
    world.current?.focus(pathname)
  }, [pathname, state])
  useEffect(() => {
    let cancelled = false,
      failed = false
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    setPaused(media.matches)
    const mediaChange = () => setPaused(media.matches)
    media.addEventListener('change', mediaChange)
    const fail = () => {
      if (!cancelled && !failed) {
        failed = true
        setState('fallback')
        world.current?.dispose()
        world.current = null
      }
    }
    const timeout = setTimeout(fail, 25000)
    import('./create-ruins-scene')
      .then(({ createRuinsScene }) => {
        if (cancelled || failed || !canvas.current) return
        try {
          world.current = createRuinsScene(
            canvas.current,
            () => {
              if (!cancelled && !failed) {
                clearTimeout(timeout)
                setState('ready')
              }
            },
            fail,
            initialPathname.current,
            () => {
              setToast(POKE_LINES[pokes.current++ % POKE_LINES.length])
              clearTimeout(toastTimer.current)
              toastTimer.current = setTimeout(() => setToast(null), 2400)
            },
          )
          world.current.setMood(moodRef.current, true)
        } catch {
          fail()
        }
      })
      .catch(fail)
    return () => {
      cancelled = true
      clearTimeout(timeout)
      media.removeEventListener('change', mediaChange)
      clearTimeout(toastTimer.current)
      world.current?.dispose()
      world.current = null
    }
  }, [])
  return (
    <>
      <canvas
        ref={canvas}
        className={`ruins-canvas ${state === 'ready' ? 'is-ready' : ''}`}
        aria-hidden="true"
      />
      <div className="scene-controls">
        <span className="scene-status" role="status">
          {state === 'loading'
            ? 'Lighting the clearing…'
            : state === 'fallback'
              ? 'Welcome. Take a look around.'
              : 'Drag to explore · poke the capybara'}
        </span>
        {state === 'ready' && (
          <>
            <button
              aria-label="Reset scene view"
              onClick={() => world.current?.reset()}
            >
              <RotateCcw size={14} />
            </button>
            <button
              aria-label={
                paused ? 'Play scene animation' : 'Pause scene animation'
              }
              onClick={() => {
                const next = !paused
                setPaused(next)
                world.current?.setPaused(next)
              }}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </>
        )}
      </div>
      {toast &&
        createPortal(
          <div className="scene-toast" role="status" key={toast + pokes.current}>
            {toast}
          </div>,
          document.body,
        )}
    </>
  )
}
