import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { EnhancedBackground } from '@/components/enhanced-background'
import { SceneLayer } from '@/components/campfire/scene-layer'
import { SiteLoader } from '@/components/campfire/site-loader'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
export const metadata: Metadata = {
  title: {
    default: 'Daniel Son | Personal Portfolio',
    template: '%s | Daniel Son',
  },
  description:
    'Software engineer and ML researcher at the University of Virginia. Projects, research, and experience.',
  icons: { icon: '/personal-website/capybara-logo.png' },
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteLoader />
          <SceneLayer />
          <div id="portfolio-shell">
            <a className="skip-content" href="#main-content">
              Skip to content
            </a>
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
          <EnhancedBackground />
        </ThemeProvider>
      </body>
    </html>
  )
}
