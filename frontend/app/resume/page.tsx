import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { GlowingOrbBackground } from "@/components/glowing-orb-background"
import { TypingEffect } from "@/components/typing-effect"

export default function ResumePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GlowingOrbBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-container p-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TypingEffect text="Resume" speed={100} hideCursorAfter={500} />
              </h1>
              <p
                className="mt-2 text-muted-foreground md:text-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                My professional experience and skills
              </p>
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
            >
              <Button asChild variant="outline" className="border-2">
                <a href="#" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>

          <div
            className="space-y-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            {/* Education Section */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                    <span className="text-sm text-muted-foreground">2018 - 2022</span>
                  </div>
                  <p className="text-muted-foreground">University of Technology</p>
                  <p className="mt-2 text-sm">
                    Graduated with honors. Specialized in web development and artificial intelligence.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Senior Frontend Developer</h3>
                    <span className="text-sm text-muted-foreground">2022 - Present</span>
                  </div>
                  <p className="text-muted-foreground">Tech Innovations Inc.</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>Led the development of the company's flagship web application</li>
                    <li>Implemented responsive designs and improved performance by 40%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Web Developer</h3>
                    <span className="text-sm text-muted-foreground">2020 - 2022</span>
                  </div>
                  <p className="text-muted-foreground">Digital Solutions LLC</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>Developed and maintained client websites using React and Next.js</li>
                    <li>Collaborated with designers to implement pixel-perfect UI</li>
                    <li>Integrated third-party APIs and services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold">Frontend</h3>
                    <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                      <li>React / Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>HTML / CSS</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Backend</h3>
                    <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                      <li>Node.js</li>
                      <li>Express</li>
                      <li>MongoDB</li>
                      <li>PostgreSQL</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Tools & Others</h3>
                    <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                      <li>Git / GitHub</li>
                      <li>Docker</li>
                      <li>CI/CD</li>
                      <li>Agile / Scrum</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

