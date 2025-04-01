import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { EnhancedBackground } from "@/components/enhanced-background"
import { TypingEffect } from "@/components/typing-effect"

export default function ResumePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <EnhancedBackground />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
  <div className="text-container p-4">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
      <TypingEffect text="Experience" speed={100} hideCursorAfter={500} />
    </h1>
    <p
      className="mt-2 text-muted-foreground md:text-lg opacity-0 animate-fade-in"
      style={{ animationDelay: "1s", animationFillMode: "forwards" }}
    >
      <TypingEffect
                  text="My educational background, working/research experience, and skills."
                  speed={50}
                  delay={1000}
                  hideCursorAfter={500}
                />
    </p>
  </div>
</div>

          {/* Main Content */}
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
                    <h3 className="font-semibold">University of Virginia</h3>
                    <span className="text-sm text-muted-foreground">Aug. 2024 – May 2028</span>
                  </div>
                  <p className="text-muted-foreground">Charlottesville, VA</p>
                  <p className="mt-2 text-sm">
                    Bachelor of Arts in Computer Science &amp; Bachelor of Science in Data Science • GPA: 4.0
                  </p>
                  <p className="mt-2 text-sm">
                    Coursework: Data Structures &amp; Algorithms, Discrete Mathematics, Multivariable Calculus, Linear Algebra, Computer Systems, Data Science Foundations, Microeconomics.
                    <br />
                    Activities: Korean Student Association (Undergraduate Rep.), Business and AI Institute, ML @ UVA.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Experience and Research Section */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Experience and Research</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Computational Physics Researcher */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Computational Physics Researcher</h3>
                    <span className="text-sm text-muted-foreground">Mar. 2025 – Present</span>
                  </div>
                  <p className="text-muted-foreground">University of Virginia, Charlottesville, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Research and model the proton spin structure, focusing on the momentum distributions of polarized sea quarks
                    </li>
                    <li>
                      Onboarded with tools and frameworks to prepare for momentum detector simulations and upcoming data runs
                    </li>
                  </ul>
                </div>
                {/* Natural Language Processing Researcher */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Natural Language Processing Researcher</h3>
                    <span className="text-sm text-muted-foreground">Feb. 2025 – Present</span>
                  </div>
                  <p className="text-muted-foreground">University of Virginia, Charlottesville, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Research under PhD Aidan San to extend GSM-Symbolic and GSM-NoOp benchmarks for systematic LLM reliability evaluation
                    </li>
                    <li>
                      Investigate how textual injections via prompting affect LLM performance in mathematical reasoning
                    </li>
                  </ul>
                </div>
                {/* Data Science Intern */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Data Science Intern</h3>
                    <span className="text-sm text-muted-foreground">Dec. 2024 – Present</span>
                  </div>
                  <p className="text-muted-foreground">The Force for Health Network, Remote</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Reported AI vulnerabilities in chatbot features for jailbreak risks and misinformation
                    </li>
                    <li>
                      Collaborated with platform architects to address 30+ critical bugs and suggest actionable UI/UX improvements
                    </li>
                    <li>
                      Optimized SEO for web pages using Yoast SEO
                    </li>
                  </ul>
                </div>
                {/* Mechanistic Interpretability Researcher */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Mechanistic Interpretability Researcher</h3>
                    <span className="text-sm text-muted-foreground">Nov. 2024 – Present</span>
                  </div>
                  <p className="text-muted-foreground">Algoverse AI, Remote</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Collaborate with 4 researchers to explore feature universality in Gemma-2 models via Sparse Autoencoders
                    </li>
                    <li>
                      Utilize SVCCA and paired RSA scores to benchmark representational similarity between transformer models
                    </li>
                  </ul>
                </div>
                {/* Information Technology Laboratory Intern */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Information Technology Laboratory Intern</h3>
                    <span className="text-sm text-muted-foreground">May 2023 – Aug. 2023</span>
                  </div>
                  <p className="text-muted-foreground">
                    National Institute of Standards and Technology, Gaithersburg, MD
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Drafted documentation for mobile government-issued PIV cards aligning with CBOR standards and federal/NIST protocols
                    </li>
                    <li>
                      Defined 150+ unique data elements with 6 attributes for authentication, encryption, and digital signatures
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills Section */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold">Languages</h3>
                    <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                      <li>Java</li>
                      <li>Python</li>
                      <li>C</li>
                      <li>SQL</li>
                      <li>HTML/CSS</li>
                      <li>JavaScript</li>
                      <li>TypeScript</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Frameworks &amp; Libraries</h3>
                    <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                      <li>React, Node.js, Next.js, Flask, Electron, Three.js, SAELens</li>
                      <li>pandas, NumPy, Matplotlib, PyTorch, Transformers, scikit-learn</li>
                      <li>LangChain, LangGraph, Porcupine</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Developer Tools</h3>
                    <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                      <li>Google Colab</li>
                      <li>Git / GitHub</li>
                      <li>IntelliJ</li>
                      <li>VS Code</li>
                      <li>Jupyter</li>
                      <li>RunPod</li>
                      <li>Rivanna</li>
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