import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { EnhancedBackground } from "@/components/enhanced-background"
import { TypingEffect } from "@/components/typing-effect"

export default function ProjectsPage() {
  const projects = [
    // ✅ NEW — ACL SRW 2025 goes first
    {
      title: "Semantic Convergence: Investigating Shared Representations Across Scaled LLMs",
      description:
        "ACL Student Research Workshop 2025- Presented at the ACL Conference in Vienna, Austria as First Author. We study whether larger LLMs converge toward shared internal representations across scaled Gemma-2 models, probing what converges (and where).",
      tags: [
        "LLMs",
        "Representation Similarity",
        "NLP Robustness",
        "Interpretability",
        "Gemma-2",
        "Transformers",
        "ACL SRW ’25"
      ],
      // Optional links for this card:
      videoUrl:
        "https://underline.io/events/485/posters/20617/poster/123435-semantic-convergence-investigating-shared-representations-across-scaled-llms?tab=Video",
      paperUrl: "https://arxiv.org/abs/2507.22918",
      // Drop a thumbnail at /public/personal-website/projects/acl-srw-2025.jpg
      image: "/personal-website/projects/acl-srw-2025.png",
    },

    // existing projects (unchanged)
    {
      title: "Jarvis",
      description:
        "A voice-activated multi-agent assistant that uses LLMs for browser control, data retrieval, and knowledge tasks through LangChain-powered coordination.",
      tags: [
        "Python",
        "Electron",
        "React",
        "Next.js",
        "TypeScript",
        "LangChain",
        "LangGraph",
        "Porcupine",
      ],
      githubUrl: "https://github.com/JouBarzdukas/hoo-needs-hands",
      image: "/personal-website/projects/jarvis.png",
    },
    {
      title: "@everyone",
      description:
        "A personalized Discord analytics tool that uses ML to extract conversational insights and embeds users into a 3D semantic space based on message history.",
      tags: [
        "Python",
        "React",
        "Next.js",
        "Three.js",
        "TypeScript",
        "Flask",
        "SQLite",
        "scikit-learn",
        "Transformers",
      ],
      githubUrl: "https://github.com/pradeepravi26/at-everyone",
      image: "/personal-website/projects/@everyone.png",
    },
    {
      title: "Steam Forecasting",
      description:
        "A time series analysis project using ARIMA, SARIMA, ETS, and Prophet to forecast monthly game release trends on Steam from 1997–2024.",
      tags: [
        "Python",
        "Pandas",
        "Matplotlib",
        "Statsmodels",
        "Forecasting",
        "Time Series",
      ],
      githubUrl: "https://github.com/danieljson15/steam-release-forecasting",
      image: "/personal-website/projects/steam.jpg",
    },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <EnhancedBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <div className="text-container inline-block p-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <TypingEffect text="Projects" speed={50} hideCursorAfter={500} />
              </h1>
              <p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <TypingEffect
                  text="A collection of projects I've worked on!"
                  speed={35}
                  delay={600}
                  hideCursorAfter={500}
                />
              </p>
            </div>
          </div>

          <div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 opacity-0 animate-fade-in"
            style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
          >
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden border border-border bg-card/70 backdrop-blur-md">
                <div className="aspect-video overflow-hidden bg-secondary/20">
                  <img
                    src={project.image}
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
                <CardFooter className="flex flex-wrap gap-2">
                  {/* Conditionally render whichever links exist, no new imports */}
                  {project.githubUrl && (
                    <Button asChild size="sm" variant="outline">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.videoUrl && (
                    <Button asChild size="sm" variant="outline">
                      <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                        ▶ Video/Poster
                      </a>
                    </Button>
                  )}
                  {project.paperUrl && (
                    <Button asChild size="sm" variant="outline">
                      <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                        📄 Paper
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}