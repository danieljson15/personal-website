import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block gradient-text">Daniel Son</span>
          <span className="mt-2 block text-muted-foreground text-2xl sm:text-3xl md:text-4xl">Software Developer</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
          I build elegant, responsive web applications with modern technologies. Focused on creating meaningful user
          experiences through clean code.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
  )
}

