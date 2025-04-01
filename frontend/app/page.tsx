import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlowingOrbBackground } from "@/components/glowing-orb-background"
import { TypingEffect } from "@/components/typing-effect"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GlowingOrbBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="text-container p-6">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block gradient-text">
              <TypingEffect text="John Doe" speed={100} hideCursorAfter={500} />
            </span>
            <span className="mt-2 block text-muted-foreground text-2xl sm:text-3xl md:text-4xl">
              <TypingEffect text="Software Developer" speed={80} delay={1500} hideCursorAfter={500} />
            </span>
          </h1>
          <p
            className="mt-6 max-w-md text-base text-muted-foreground md:text-lg opacity-0 animate-fade-in"
            style={{ animationDelay: "3s", animationFillMode: "forwards" }}
          >
            I build elegant, responsive web applications with modern technologies. Focused on creating meaningful user
            experiences through clean code.
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
              <Link href="/resume">My Resume</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

