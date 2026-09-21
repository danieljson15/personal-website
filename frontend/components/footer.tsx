import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
export function Footer() {
  return (
    <footer className="site-footer portfolio-width">
      <p>© {new Date().getFullYear()} Daniel Son</p>
      <nav aria-label="Social and extra links">
        <a
          href="https://github.com/danieljson15"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={12} />
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-son15/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <ArrowUpRight size={12} />
        </a>
        <Link href="/capybara">
          Capybara <ArrowUpRight size={12} />
        </Link>
      </nav>
    </footer>
  )
}
