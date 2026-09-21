import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Memory Map',
      description:
        'A collaborative full-stack travel app with interactive maps, shared memory and wishlist pins, photo uploads, trip planning, and checklists. Hybrid pgvector search ranks wishlist destinations by similarity to past travels, and a Llama 3.3 trip suggester returns structured destinations with cost estimates.',
      tags: [
        'Next.js',
        'TypeScript',
        'Supabase',
        'pgvector',
        'Voyage AI',
        'Groq',
        'Vercel',
      ],
      image: '/personal-website/projects/memory-map.svg',
    },
    {
      title:
        'Semantic Convergence: Investigating Shared Representations Across Scaled LLMs',
      description:
        'ACL Student Research Workshop 2025. Presented at the ACL Conference in Vienna, Austria as first author. We study whether larger LLMs converge toward shared internal representations across scaled Gemma-2 models, probing what converges and where.',
      tags: [
        'LLMs',
        'Representation Similarity',
        'Interpretability',
        'Gemma-2',
        'ACL SRW ’25',
      ],
      videoUrl:
        'https://underline.io/events/485/posters/20617/poster/123435-semantic-convergence-investigating-shared-representations-across-scaled-llms?tab=Video',
      paperUrl: 'https://arxiv.org/abs/2507.22918',
      image: '/personal-website/projects/acl-srw-2025.png',
    },
    {
      title: 'Nexus',
      description:
        'A voice-activated assistant built with a team of four, combining an Electron and React interface with Python, LangGraph agent routing, and ChromaDB memory for browser tasks and question answering. Features an audio-reactive orb driven by live microphone data.',
      tags: ['Electron', 'React', 'Python', 'LangGraph', 'ChromaDB'],
      githubUrl: 'https://github.com/JouBarzdukas/hoo-needs-hands',
      image: '/personal-website/projects/jarvis.png',
    },
    {
      title: '@everyone',
      description:
        'A Discord analytics app built with a team of four that turns chat exports into behavioral metrics and an interactive 3D view of conversational similarity. Topic embeddings and 12 behavioral features are standardized and reduced with PCA.',
      tags: ['Python', 'React', 'Next.js', 'Three.js', 'Flask', 'scikit-learn', 'SQLite'],
      githubUrl: 'https://github.com/pradeepravi26/at-everyone',
      image: '/personal-website/projects/@everyone.png',
    },
    {
      title: 'Steam Forecasting',
      description:
        'A time series analysis project using ARIMA, SARIMA, ETS, and Prophet to forecast monthly game release trends on Steam from 1997 to 2024.',
      tags: ['Python', 'Pandas', 'Matplotlib', 'Statsmodels', 'Forecasting', 'Time Series'],
      githubUrl: 'https://github.com/danieljson15/steam-release-forecasting',
      image: '/personal-website/projects/steam.jpg',
    },
  ]

  return (
    <div className="content-page relative min-h-screen w-full">
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <div className="page-title inline-block p-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span>Projects</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg ">
                <span>A collection of projects I've worked on!</span>
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 ">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-border bg-card portfolio-card"
              >
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
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.videoUrl && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ▶ Video/Poster
                      </a>
                    </Button>
                  )}
                  {project.paperUrl && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={project.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
