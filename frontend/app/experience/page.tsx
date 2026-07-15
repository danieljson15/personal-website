import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
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
                <TypingEffect text="Experience" speed={50} hideCursorAfter={500} />
              </h1>
              <p
                className="mt-2 text-muted-foreground md:text-lg opacity-0 animate-fade-in"
                style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              >
                <TypingEffect
                  text="My educational background, working/research experience, and skills."
                  speed={35}
                  delay={600}
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
                    Bachelor of Science in Data Science, Bachelor of Arts in Computer Science • GPA: 4.0 • Dean's List
                  </p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    Relevant Coursework <span className="opacity-70">(hover a category)</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <span className="cursor-default rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium hover:bg-accent">
                          Computer Science
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                          <li>Introduction to Programming</li>
                          <li>Data Structures &amp; Algorithms I &amp; II</li>
                          <li>Discrete Mathematics and Theory</li>
                          <li>Computer Systems and Organization</li>
                          <li>Software Development Essentials</li>
                          <li>Special Topics: Cracking the Coding Interview</li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>

                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <span className="cursor-default rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium hover:bg-accent">
                          Data Science
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                          <li>Foundations of Data Science</li>
                          <li>Systems I: Introduction to Computing</li>
                          <li>Design I: Communicating with Data</li>
                          <li>Value I: Ethics &amp; Policy in Data Science</li>
                          <li>Analytics I: Foundations of Machine Learning</li>
                          <li>Computational Probability</li>
                          <li>Mathematics for Data Science</li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>

                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <span className="cursor-default rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium hover:bg-accent">
                          Math &amp; Statistics
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                          <li>Calculus I, II &amp; III</li>
                          <li>Elementary Linear Algebra</li>
                          <li>Introduction to Statistics</li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <ul className="mt-3 list-inside list-disc text-sm space-y-1">
                    <li>
                      <span className="font-medium">Activities:</span> Undergraduate Data Science Council (Professional
                      Development Chair), Korean Student Association, BAI Institute, Kappa Theta Pi
                    </li>
                    <li>
                      <span className="font-medium">Programs:</span> Capital One Tech Summit 2026
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
                    ACL Student Research Workshop • First Author • Vienna, Austria
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

                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">
                      Consistency of LLMs to Comparative Statements in Mathematical Reasoning Tasks
                    </h3>
                    <span className="text-sm text-muted-foreground">May 2026</span>
                  </div>
                  <p className="text-muted-foreground">LREC 2026 Main Conference  • Second Author • Palma, Spain</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Investigated LLM consistency to comparative statements in mathematical reasoning through
                      adversarial prompt-injection attacks
                    </li>
                    <li>
                      Applied representational similarity analysis (RSA/SVCCA) to localize where adversarial
                      insertions altered model behavior
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
                {/* AI & Automation Intern — Care Hospice */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">AI & Automation Intern</h3>
                    <span className="text-sm text-muted-foreground">May 2026 – Present</span>
                  </div>
                  <p className="text-muted-foreground">Care Hospice, Charlottesville, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Built an invoice automation pipeline that pulls data with Azure's document AI, checks it
                      against our vendor database for duplicates, and routes everything through a
                      confidence-scored review step
                    </li>
                    <li>
                      Helped stand up two natural-language analytics agents on Snowflake Cortex so non-technical
                      staff can ask plain-English questions about admissions, referrals, and conversion rates
                      instead of waiting on a custom report
                    </li>
                    <li>
                      Compared agent output against our production dashboards and found a few real discrepancies
                      worth fixing, including a manual-document bottleneck that changed how we filter intake now
                    </li>
                  </ul>
                </div>

                {/* Teaching Assistant, CS 1112 */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Teaching Assistant, CS 1112</h3>
                    <span className="text-sm text-muted-foreground">Jan. 2026 – Present</span>
                  </div>
                  <p className="text-muted-foreground">University of Virginia, Charlottesville, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Hold office hours and lead weekly lab sections for CS 1112. Help students debug their code,
                      get comfortable with Python and their dev environment, and build good coding habits
                    </li>
                  </ul>
                </div>

                {/* Software Engineering Intern */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Software Engineering Intern</h3>
                    <span className="text-sm text-muted-foreground">May 2025 – Aug. 2025</span>
                  </div>
                  <p className="text-muted-foreground">SkyBitz | AMETEK, Herndon, VA</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Prototyped a text-to-SQL and document Q&amp;A tool on AWS so non-engineers could ask questions
                      about fleet and IoT data directly, instead of filing a request and waiting on an engineer
                    </li>
                    <li>
                      Mapped out a semantic layer across our asset, sensor, and GPS data tables, so metrics and
                      time definitions came from one shared source instead of getting re-derived per query
                    </li>
                    <li>
                      Tracked the LLM's recurring failure modes (bad columns, ambiguous joins, slow queries) to make
                      debugging faster for whoever picked it up next
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
                      Designed adversarial prompt-injection attacks across thousands of math reasoning problems
                      (GSM8K, AQuA, Hendrycks MATH) to see how much an LLM's accuracy actually degrades under
                      pressure
                    </li>
                    <li>
                      Used representational similarity analysis to trace where in the model those attacks took
                      hold, layer by layer. That work became a co-authored paper at LREC 2026
                    </li>
                    <li>
                      Built the Python pipelines behind it all: filtering datasets, extracting entities, and keeping
                      clean-vs-attacked runs reproducible
                    </li>
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
                    <li>Improved SEO sitewide and worked with engineers to squash a batch of critical bugs</li>
                  </ul>
                </div>

                {/* Machine Learning Researcher — Algoverse */}
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">Machine Learning Researcher</h3>
                    <span className="text-sm text-muted-foreground">Nov. 2024 – Jul. 2025</span>
                  </div>
                  <p className="text-muted-foreground">Algoverse Research, Remote</p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Built a pipeline comparing how Gemma-2's 2B and 9B versions represent information internally,
                      layer by layer, using SVCCA and RSA
                    </li>
                    <li>
                      Found the two models align most closely in their middle layers, one small piece of evidence
                      for how LLM interpretability holds up across scale. Published as first author at ACL 2025
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
                      Drafted documentation for a mobile version of government-issued PIV cards, aligning the
                      digital format with NIST standards
                    </li>
                    <li>
                      Defined a large set of data elements, each with several attributes, covering authentication,
                      encryption, and signature actions
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
          <li>spaCy</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Cloud/Data Platforms</h3>
        <ul className="mt-2 list-inside list-disc text-sm space-y-1">
          <li>AWS (EC2, S3, IAM, QuickSight, Amazon Q Business)</li>
          <li>Snowflake / Snowflake Cortex</li>
          <li>NetSuite</li>
          <li>Dataverse</li>
          <li>Power Automate</li>
          <li>Azure AI Document Intelligence</li>
          <li>PostgreSQL</li>
          <li>Git</li>
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