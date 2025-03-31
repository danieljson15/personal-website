import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website built with Next.js and Tailwind CSS.",
      tags: ["Next.js", "React", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with user authentication and payment processing.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "#",
      githubUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Weather App",
      description: "A weather application that displays current weather and forecasts based on location.",
      tags: ["JavaScript", "API", "CSS"],
      demoUrl: "#",
      githubUrl: "#",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Projects</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              A collection of projects I've worked on, showcasing my skills and experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
                <div className="aspect-video overflow-hidden bg-secondary/20">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 opacity-80"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

