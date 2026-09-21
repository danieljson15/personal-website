'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/contact', label: 'Contact' },
]
export function Navigation() {
  const pathname = usePathname().replace(/\/$/, '') || '/',
    [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 12)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  // The same clean bar everywhere: absolute over the home hero, sticky on inner
  // pages (gaining a soft blurred backing once content scrolls beneath it).
  return (
    <header
      className={`site-header landing-header ${pathname === '/' ? '' : 'is-sticky'} ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="portfolio-width nav-inner">
        <Link className="wordmark" href="/" aria-label="Daniel Son — home">
          <span>
            Daniel Son<span className="accent-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? 'page' : undefined}
              className={cn(pathname === n.href && 'active')}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav-controls">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                className="mobile-menu-trigger"
                variant="ghost"
                size="icon"
              >
                <Menu size={20} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-nav-panel">
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Projects, experience, and interests.
              </SheetDescription>
              <nav aria-label="Mobile navigation">
                {[...navItems, { href: '/capybara', label: 'Capybara' }].map(
                  (n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === n.href ? 'page' : undefined}
                    >
                      {n.label}
                    </Link>
                  ),
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
