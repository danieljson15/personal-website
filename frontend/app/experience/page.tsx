import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type RoleProps = {
  title: string
  org: string
  dates: string
  summary?: string
  bullets?: string[]
  tags?: string[]
}

/** One role: who/where/when, a few short bullets, and the key tech as chips. */
function Role({ title, org, dates, summary, bullets, tags }: RoleProps) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-1 sm:flex-row">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{dates}</span>
      </div>
      <p className="text-muted-foreground">{org}</p>
      {summary && <p className="mt-2 text-sm">{summary}</p>}
      {bullets && (
        <ul className="mt-2 list-inside list-disc text-sm space-y-1">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {tags && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

const abstracts = {
  lrec: 'Large language models (LLMs) have the potential to significantly expand access to quality education through applications such as mathematics tutoring. However, a key challenge is that student writing often contains redundancies, and prior research has shown that LLMs can be sensitive to such irrelevant information. This raises a critical research question: How consistent are LLMs when faced with extraneous comparative statements? To address this, we propose a systematic framework for evaluating LLM consistency. Our approach involves a hybrid strategy that integrates template-based and model-based methods to generate comparative statements (e.g., “One of the apples was tastier than average”) and insert them into mathematical reasoning problems. The merit of our approach lies in its systematic and automated nature, enabling rigorous assessment across various models and datasets. Conducting experiments on the GSM8K, AQuA, and Hendrycks MATH benchmarks with a suite of open-source LLMs, we highlight two key results. First, LLM accuracy can drop by over 30% when presented with these statements. Furthermore, we uncover a trade-off between the diversity of the generated statements and the magnitude of the performance drop, where less diverse and more repetitive perturbations lead to greater accuracy degradation.',
  acl: "We investigate feature universality in Gemma-2 language models (Gemma-2-2B and Gemma-2-9B), asking whether models with a four-fold difference in scale still converge on comparable internal concepts. Using the Sparse Autoencoder (SAE) dictionary-learning pipeline, we utilize SAEs on each model's residual-stream activations, align the resulting monosemantic features via activation correlation, and compare the matched feature spaces with SVCCA and RSA. Middle layers yield the strongest overlap, while early and late layers show far less similarity. Preliminary experiments extend the analysis from single tokens to multi-token subspaces, showing that semantically similar subspaces interact similarly with language models. These results strengthen the case that large language models carve the world into broadly similar, interpretable features despite size differences, reinforcing universality as a foundation for cross-model interpretability.",
}

const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'C', 'Bash'],
  },
  {
    group: 'Software & Web',
    items: [
      'React',
      'Next.js',
      'Node.js',
      'Electron',
      'Flask',
      'FastAPI',
      'REST APIs',
      'Git',
      'GitHub Actions',
      'Vercel',
    ],
  },
  {
    group: 'ML & NLP',
    items: [
      'PyTorch',
      'Transformers',
      'Hugging Face',
      'lm-evaluation-harness',
      'Sparse autoencoders',
      'SAELens',
      'spaCy',
      'LangChain',
      'LangGraph',
      'scikit-learn',
      'pandas',
      'NumPy',
      'Matplotlib',
    ],
  },
  {
    group: 'LLMs & Retrieval',
    items: [
      'Snowflake Cortex',
      'Groq',
      'Voyage AI',
      'pgvector',
      'ChromaDB',
      'RAG',
      'Function calling',
    ],
  },
  {
    group: 'Databases & Analytics',
    items: [
      'PostgreSQL',
      'Supabase',
      'Snowflake',
      'dbt',
      'MySQL',
      'SQLite',
      'Tableau',
      'Amazon QuickSight',
    ],
  },
  {
    group: 'Cloud & Automation',
    items: [
      'AWS (S3, IAM, EC2, Amazon Q Business)',
      'Azure (Document Intelligence, Functions, Blob Storage)',
      'Power Automate',
      'Dataverse',
      'NetSuite APIs',
      'Docker',
      'Linux',
      'SLURM',
    ],
  },
]

export default function ResumePage() {
  return (
    <div className="content-page relative min-h-screen w-full">
      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="page-title p-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span>Experience</span>
              </h1>
              <p className="mt-2 text-muted-foreground md:text-lg ">
                <span>
                  My educational background, working/research experience, and
                  skills.
                </span>
              </p>
            </div>
            <div className=""></div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 ">
            {/* Education */}
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">University of Virginia</h3>
                    <span className="text-sm text-muted-foreground">
                      Aug. 2024 – May 2028
                    </span>
                  </div>
                  <p className="text-muted-foreground">Charlottesville, VA</p>
                  <p className="mt-2 text-sm">
                    B.A. Computer Science, B.S. Data Science • GPA: 4.0 •
                    Dean&apos;s List
                  </p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    Relevant Coursework{' '}
                    <span className="opacity-70">(select a category)</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <details className="coursework">
                      <summary>Computer Science</summary>
                      <div className="coursework-content">
                        <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                          <li>Introduction to Programming</li>
                          <li>Data Structures &amp; Algorithms I &amp; II</li>
                          <li>Discrete Mathematics and Theory</li>
                          <li>Computer Systems and Organization</li>
                          <li>Software Development Essentials</li>
                          <li>Human-Computer Interaction</li>
                          <li>Special Topics: Cracking the Coding Interview</li>
                        </ul>
                      </div>
                    </details>

                    <details className="coursework">
                      <summary>Data Science</summary>
                      <div className="coursework-content">
                        <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                          <li>Foundations of Data Science</li>
                          <li>Systems I: Introduction to Computing</li>
                          <li>Design I: Communicating with Data</li>
                          <li>Value I: Ethics &amp; Policy in Data Science</li>
                          <li>Analytics I: Foundations of Machine Learning</li>
                          <li>Data Systems (Data Engineering)</li>
                          <li>Machine Learning</li>
                          <li>Neural Nets &amp; Deep Learning</li>
                          <li>Computational Probability</li>
                          <li>Mathematics for Data Science</li>
                        </ul>
                      </div>
                    </details>

                    <details className="coursework">
                      <summary>Math &amp; Statistics</summary>
                      <div className="coursework-content">
                        <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
                          <li>Calculus I, II &amp; III</li>
                          <li>Elementary Linear Algebra</li>
                          <li>Introduction to Statistics</li>
                        </ul>
                      </div>
                    </details>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Capital One Tech Summit 2026 (workshops and hackathon)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Industry */}
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle className="text-xl">Industry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Role
                  title="AI & Automation Intern"
                  org="Care Hospice, Charlottesville, VA"
                  dates="Apr. 2026 – Aug. 2026"
                  bullets={[
                    "Built and deployed two Snowflake Cortex AI agents (census/operations and sales/referral) on semantic views spanning 20 tables, giving executives a natural-language alternative to static Tableau dashboards",
                    "Validated agent answers against existing Tableau dashboards and added row-level security to restrict patient-level data",
                    "Built dbt and Jinja/SQL deployment tooling for repeatable releases across dev, test, and prod; colleagues reused it to ship more agents, including compliance and CAHPS survey agents",
                    "Built a Power Automate accounts payable pipeline for an inbox of 300–500 documents a day, using Azure Document Intelligence and duplicate detection, integrated with NetSuite; saves about 5 hours of manual work weekly",
                  ]}
                  tags={[
                    'Snowflake Cortex',
                    'dbt',
                    'Power Automate',
                    'Azure',
                    'NetSuite',
                  ]}
                />
                <Role
                  title="Software Engineer Intern"
                  org="SkyBitz | AMETEK, Herndon, VA"
                  dates="May 2025 – Aug. 2025"
                  bullets={[
                    "Designed a semantic layer and join map across 20+ asset, sensor, GPS, and trip tables to ground LLM text-to-SQL over fleet and IoT data",
                    "Configured Amazon QuickSight natural-language querying with IAM access controls, reaching 90%+ accuracy on real questions from executives, Q&A, and customer support",
                    "Prototyped OCR and retrieval-augmented generation for contract question answering with Amazon Q Business and S3",
                    "Documented failure modes such as invalid columns, ambiguous joins, and slow queries; leadership hired AWS contractors to scale both prototypes",
                  ]}
                  tags={['AWS', 'QuickSight', 'Amazon Q Business', 'SQL']}
                />
                <Role
                  title="Data Science Intern"
                  org="The Force for Health Network, Remote"
                  dates="Dec. 2024 – Apr. 2025"
                  bullets={[
                    "Improved SEO sitewide and worked with engineers to fix a batch of critical bugs",
                  ]}
                />
                <Role
                  title="Data Science Intern"
                  org="National Institute of Standards and Technology, Gaithersburg, MD"
                  dates="May 2023 – Aug. 2023"
                  bullets={[
                    "Documented 150+ Personal Identity Verification (PIV) data elements in a structured data dictionary",
                    "Drafted documentation for a mobile version of government-issued PIV cards, aligning the digital format with NIST standards",
                  ]}
                />
              </CardContent>
            </Card>

            {/* Research */}
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle className="text-xl">Research</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Role
                  title="Natural Language Processing Researcher"
                  org="University of Virginia, advised by Aidan San"
                  dates="Feb. 2025 – Present"
                  bullets={[
                    "Built a framework that inserts irrelevant comparative statements into math word problems, using spaCy for entity extraction and RoBERTa and Gemma-2 to generate comparators",
                    "Filtered GSM8K, AQuA, and Hendrycks MATH down to 5,769 concrete word problems using LLM-based classification",
                    "Evaluated 14 open-source LLMs on UVA's SLURM cluster, finding 20–23% average relative accuracy drops, with larger drops for less diverse statements",
                    "Now analyzing layer-level representation shifts across Gemma, Llama, Pythia, and Qwen in a separate project",
                  ]}
                  tags={['spaCy', 'Gemma-2', 'lm-evaluation-harness', 'SLURM']}
                />
                <Role
                  title="Machine Learning Researcher"
                  org="Algoverse Research, Remote"
                  dates="Nov. 2024 – Jul. 2025"
                  bullets={[
                    "Built a sparse autoencoder (SAE) pipeline comparing residual-stream representations in Gemma-2 2B and 9B",
                    "Aligned features by activation correlation and compared layers with SVCCA and RSA, finding the strongest alignment in the middle layers and far less in early and late ones",
                    "First-authored the paper and presented it as a poster at ACL SRW 2025 in Vienna",
                  ]}
                  tags={['PyTorch', 'Sparse autoencoders', 'SVCCA', 'RSA']}
                />
              </CardContent>
            </Card>

            {/* Publications */}
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle className="text-xl">Publications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">
                      Consistency of LLMs to Comparative Statements in
                      Mathematical Reasoning Tasks
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      May 2026
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    LREC 2026 Main Conference • Second Author • Palma, Spain
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Investigated LLM consistency to comparative statements in
                      mathematical reasoning through adversarial prompt
                      injection
                    </li>
                    <li>
                      Applied RSA and SVCCA to localize where the insertions
                      changed model behavior
                    </li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <a
                      href="https://aclanthology.org/2026.lrec-1.351/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      Paper
                    </a>{' '}
                    ·{' '}
                    <a
                      href="https://doi.org/10.63317/5c2k786wu6jm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      DOI
                    </a>
                  </p>
                  <details className="coursework mt-3">
                    <summary>Abstract</summary>
                    <p className="pt-3 pb-1 text-sm leading-relaxed text-muted-foreground">
                      {abstracts.lrec}
                    </p>
                  </details>
                </div>

                <div>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row">
                    <h3 className="font-semibold">
                      Semantic Convergence: Investigating Shared Representations
                      Across Scaled LLMs
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      July 2025
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    ACL Student Research Workshop • First Author • Vienna,
                    Austria
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm space-y-1">
                    <li>
                      Compared Google Gemma-2 2B and 9B using sparse
                      autoencoders, SVCCA, and RSA
                    </li>
                    <li>
                      Found the strongest representational similarity in the
                      middle layers, evidence of cross-scale feature alignment
                    </li>
                  </ul>
                  <p className="mt-2 text-sm">
                    <a
                      href="https://arxiv.org/abs/2507.22918"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      Paper
                    </a>{' '}
                    ·{' '}
                    <a
                      href="https://doi.org/10.48448/3zj7-2j23"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      DOI
                    </a>
                  </p>
                  <details className="coursework mt-3">
                    <summary>Abstract</summary>
                    <p className="pt-3 pb-1 text-sm leading-relaxed text-muted-foreground">
                      {abstracts.acl}
                    </p>
                  </details>
                </div>
              </CardContent>
            </Card>

            {/* Teaching & Leadership */}
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle className="text-xl">Teaching & Leadership</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Role
                  title="Teaching Assistant, Introduction to Computer Science (CS 1112)"
                  org="University of Virginia, Charlottesville, VA"
                  dates="Jan. 2026 – May 2026"
                  bullets={[
                    "Led coding walkthroughs and in-class programming activities for sections of 80+ students",
                    "Gave one-on-one debugging support in labs, guiding students through runtime errors and logic bugs",
                    "Reviewed and graded Python submissions for correctness, runtime behavior, and code quality",
                  ]}
                />
                <Role
                  title="Professional Development Committee Member"
                  org="Undergraduate Data Science Council, University of Virginia"
                  dates="Sept. 2025 – Present"
                  bullets={[
                    "Organized professional-development programming, including fireside chats with Appian and resume workshops",
                    "Created resume templates and coordinated with Career Services and student groups on outreach and registration",
                  ]}
                />
                <Role
                  title="Sports Chair"
                  org="Korean Student Association, University of Virginia"
                  dates="Oct. 2024 – Present"
                  bullets={[
                    "Led esports events drawing 50–60 participants, handling recruitment, communications, and logistics",
                    "Organized intramural sports and Field Day to engage members beyond cultural programming",
                  ]}
                />
                <Role
                  title="Member"
                  org="Kappa Theta Pi, University of Virginia"
                  dates=""
                  summary="Professional technology fraternity."
                />
              </CardContent>
            </Card>

            {/* Technical Skills */}
            <Card className="border border-border bg-card portfolio-card">
              <CardHeader>
                <CardTitle className="text-xl">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {skills.map((skill) => (
                  <div key={skill.group}>
                    <h3 className="text-sm font-semibold">{skill.group}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {skill.items.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
