import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EnhancedBackground } from "@/components/enhanced-background"
import { TypingEffect } from "@/components/typing-effect"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <EnhancedBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="text-container p-6">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block gradient-text">
              <TypingEffect text="Daniel Son" speed={100} hideCursorAfter={500} />
            </span>
            <span className="mt-2 block text-muted-foreground text-2xl sm:text-3xl md:text-4xl">
              <TypingEffect text="Welcome to my personal website!" speed={60} delay={1500} hideCursorAfter={500} />
            </span>
          </h1>
          <p
            className="mt-6 max-w-md text-base text-muted-foreground md:text-lg opacity-0 animate-fade-in"
            style={{ animationDelay: "3s", animationFillMode: "forwards" }}
          >
            First-year student at the University of Virginia planning to double major in Computer Science and Data Science. Interested in Al/ML, research, and computational social sciences.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in justify-center"
            style={{ animationDelay: "4s", animationFillMode: "forwards" }}
          >
            <Button asChild size="lg" variant="outline" className="border-2">
              <Link href="/projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/experience">My Experience</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

