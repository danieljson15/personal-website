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
        <div className="text-container p-6 text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl gradient-text">
            <TypingEffect text="Daniel Son" speed={50} hideCursorAfter={500} />
          </h1>
          <p
            className="mt-6 mx-auto max-w-md text-base text-muted-foreground md:text-lg opacity-0 animate-fade-in"
            style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
          >
            Software engineer focused on ML/AI systems. BS Data Science / BA Computer Science at UVA (4.0 GPA). Research experience in LLM interpretability (ACL '25, LREC '26). Actively seeking Summer 2027 SWE/ML engineering internships.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in justify-center"
            style={{ animationDelay: "1.9s", animationFillMode: "forwards" }}
          >
            <Button asChild variant="secondary" size="lg">
              <Link href="/experience">
                My Experience <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2">
              <Link href="/projects">View My Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}