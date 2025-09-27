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
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
            </div>
          </div>

          {/* Main Content */}
          <div
            className="space-y-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            {/* Education */}
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
                    Bachelor of Science in Data Science, Bachelor of Arts in Computer Science • GPA: 4.0
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      <span className="font-medium">Relevant Coursework:</span> Multivariable Calculus, Linear Algebra, Data
                      Structures and Algorithms, Discrete Mathematics and Theory, Computer Systems and Organizations,
                      Computational Probability, Systems I, Design I
                    </li>
                    <li>
                      <span className="font-medium">Activities:</span> Undergraduate Data Science Council (Professional
                      Development Comittee), Korean Student Association (Former Internal Intern, Current Sports Chair), BAI
                      Institute, Kappa Theta Pi
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Publications — mirrors LaTeX order/content */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Publications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">
                      Semantic Convergence: Investigating Shared Representations Across Scaled LLMs
                    </h3>
                    <span className="text-sm text-muted-foreground">July 2025</span>
                  </div>
                  <p className="text-muted-foreground">
                    ACL Student Research Workshop — First Author • Vienna, Austria
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Benchmarked feature universality across Google Gemma LLMs (2B vs 9B) using SVCCA and paired RSA
                    </li>
                    <li>
                      Found strongest representational similarity in middle layers, offering key evidence of cross-scale feature alignment
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Experience and Research */}
            <Card className="border border-border bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Experience and Research</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Software Engineering Intern */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Software Engineering Intern</h3>
                    <span className="text-sm text-muted-foreground">May 2025 – Aug. 2025</span>
                  </div>
                  <p className="text-muted-foreground">SkyBitz AMETEK, Herndon, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Spearheaded a LLM text-to-SQL and document-based Q&amp;A system to streamline IoT data access for customers
                    </li>
                    <li>
                      Built LLM pipeline on AWS (Q, Athena, S3, QuickSight) to enable interactive analytics and insights for fleets
                    </li>
                  </ul>
                </div>

                {/* Computational Physics Researcher */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Computational Physics Researcher</h3>
                    <span className="text-sm text-muted-foreground">Mar. 2025 – Present</span>
                  </div>
                  <p className="text-muted-foreground">University of Virginia, Charlottesville, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Model particle collisions for the SpinQuest experiment to help study how sea quarks contribute to proton spin
                    </li>
                    <li>Run simulations on Rivanna HPC to support momentum reconstruction from detector data</li>
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
                      Filter symbolic math datasets (e.g., GSM8K, ARC) by question type and extract target entities using spaCy
                    </li>
                    <li>Design adversarial prompt injections to test LLM reasoning accuracy and robustness across benchmarks</li>
                  </ul>
                </div>

                {/* Data Science Intern — The Force for Health */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Data Science Intern</h3>
                    <span className="text-sm text-muted-foreground">Dec. 2024 – Apr. 2025</span>
                  </div>
                  <p className="text-muted-foreground">The Force for Health Network, Remote</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Improved SEO across 30+ pages using Yoast, and collaborated with engineers to resolve 10+ critical bugs on site
                    </li>
                  </ul>
                </div>

                {/* Information Technology Laboratory Intern — NIST */}
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
                      Drafted documentation for mobile government-issued PIV cards aligning with digital format and NIST standards
                    </li>
                    <li>
                      Defined 150+ unique data elements each with 6 distinct attributes, organized by different authentication mechanisms, encryption actions, and signature actions
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills */}
<Card className="border border-border bg-card/70 backdrop-blur-md">
  <CardHeader>
    <CardTitle className="text-xl">Technical Skills</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div>
        <h3 className="font-semibold">Languages/Frameworks</h3>
        <ul className="mt-2 list-inside list-disc text-sm space-y-1">
          <li>Java</li>
          <li>Python</li>
          <li>C</li>
          <li>SQL</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Next.js</li>
          <li>Flask</li>
          <li>Electron</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Libraries</h3>
        <ul className="mt-2 list-inside list-disc text-sm space-y-1">
          <li>pandas</li>
          <li>NumPy</li>
          <li>Matplotlib</li>
          <li>PyTorch</li>
          <li>Transformers</li>
          <li>scikit-learn</li>
          <li>LangChain</li>
          <li>LangGraph</li>
          <li>Hugging Face</li>
          <li>SAELens</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Cloud/Databases</h3>
        <ul className="mt-2 list-inside list-disc text-sm space-y-1">
          <li>AWS (EC2, S3, RDS/Aurora, Athena, QuickSight, Amazon Q Business, IAM)</li>
          <li>pgAdmin</li>
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