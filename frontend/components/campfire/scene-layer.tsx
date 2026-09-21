'use client'

import { useEffect, useRef } from 'react'
import { RuinsScene } from '@/components/ruins/ruins-scene'

const credits = [
  {
    role: 'Environment',
    name: 'Ancient ruins by fedorzabelin',
    href: 'https://sketchfab.com/3d-models/ancient-ruins-5da77fdce0cd46b395cbbdcce7eb17a7',
    license: 'CC BY 4.0',
    licenseHref: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    role: 'Fireflies',
    name: 'Lowpoly Firefly by Caledhril',
    href: 'https://sketchfab.com/3d-models/lowpoly-firefly-5effa6605b5545f2915da8b8fff8fa48',
    license: 'CC BY 4.0',
    licenseHref: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    role: 'Capybara',
    name: 'Poly by Google',
    href: 'https://poly.pizza/m/66d-mKAgF17',
    license: 'CC BY 3.0',
    licenseHref: 'https://creativecommons.org/licenses/by/3.0/',
  },
]

/** The campfire scene as a permanent, full-bleed backdrop — present behind every
 * route (mounted once at the layout level), so the whole site feels like it's
 * happening inside the same world instead of a hero that hands off to static pages. */
export function SceneLayer() {
  const credit = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    // Close the credits popover on outside click or Escape.
    const close = (e: Event) => {
      const el = credit.current
      if (!el?.open) return
      if (e instanceof KeyboardEvent) {
        if (e.key === 'Escape') el.open = false
      } else if (!el.contains(e.target as Node)) el.open = false
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [])
  return (
    <>
      <div className="scene-layer">
        <div className="ruins-still" aria-hidden="true" />
        <RuinsScene />
      </div>
      {/* Outside the scene layer on purpose: that layer sits beneath the page
          content, and the popover has to open above it. */}
      <details className="scene-credits" ref={credit}>
        <summary>Scene credits</summary>
        <div>
          <ul>
            {credits.map((c) => (
              <li key={c.role}>
                <span>{c.role}</span>
                <a href={c.href} target="_blank" rel="noreferrer">
                  {c.name}
                </a>
                <a
                  className="license"
                  href={c.licenseHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.license}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Textures compressed, lighting and animation adapted. Inspired by{' '}
            <a
              href="https://playground.babylonjs.com/#DR9MT2#77"
              target="_blank"
              rel="noreferrer"
            >
              Babylon.js Playground
            </a>
            .
          </p>
        </div>
      </details>
    </>
  )
}
