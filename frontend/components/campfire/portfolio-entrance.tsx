import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'

/** The home route's content. The campfire scene itself is a permanent backdrop
 * (see SceneLayer, mounted once in the root layout) — this is just the intro
 * copy, floating over it exactly like the original full-bleed hero did. */
export function PortfolioEntrance() {
  return (
    <section className="ruins-landing" aria-labelledby="landing-heading">
      <div className="landing-shade" aria-hidden="true" />
      <div className="landing-copy">
        <p className="landing-role">SOFTWARE ENGINEER · APPLIED AI</p>
        <h1 id="landing-heading">
          Daniel Son<span>.</span>
        </h1>
        <p className="landing-description">
          AI and analytics systems over real company data, plus research on
          where LLMs&nbsp;break.
          <br />
          Computer Science & Data Science at UVA. Published at ACL SRW and LREC.
        </p>
        <div className="landing-links">
          <Link href="/projects" className="landing-primary">
            View my work <ArrowUpRight size={17} />
          </Link>
          <Link href="/experience" className="landing-secondary">
            My experience <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="landing-socials">
          <a
            href="https://github.com/danieljson15"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-son15/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a href="mailto:danieljson15@gmail.com">
            Say hello <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="landing-bottom">
        <span>Seeking Summer 2027 SWE / ML internships</span>
      </div>
    </section>
  )
}
