import { TypingEffect } from "@/components/typing-effect"
import styles from "./capybara.module.css"

const capybara = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⠶⠶⠶⠶⠶⠶⣶⣤⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣦⡀
⠀⠀⠀⠀⠀⠀⠀⣠⣴⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣦⣄
⠀⠀⠀⠀⠀⢀⣾⠟⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡏⠻⣷⡀
⠀⠀⠀⠀⠀⣾⡏⠀⢸⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡇⠀⢹⣷
⠀⠀⠀⠀⠀⣿⣇⠀⠀⠻⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⠟⠀⠀⣸⣿
⠀⠀⠀⠀⠀⠘⢿⣦⣤⣤⣬⣿⣿⣶⣶⣶⣶⣶⣶⣶⣶⣿⣿⣥⣤⣤⣴⡿⠃
⠀⠀⠀⠀⠀⠀⣠⣿⠟⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⣿⣄
⠀⠀⠀⠀⠀⣰⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣆
⠀⠀⠀⠀⢠⣿⠃⠀⠀⠀⠀⠀⣠⣤⡀⠀⠀⠀⠀⢀⣤⣄⠀⠀⠀⠀⠀⠘⣿⡄
⠀⠀⠀⠀⣾⡏⠀⠀⠀⠀⠀⢰⣿⣿⣿⡄⠀⠀⢠⣿⣿⣿⡆⠀⠀⠀⠀⠀⢹⣷
⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⠃⠀⠀⠘⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⣿⡇
⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⣿⡇
⠀⠀⠀⠸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠇
⠀⠀⠀⠀⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠛⠛⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⣼⡿
⠀⠀⠀⠀⠘⣿⣆⠀⠀⠀⠀⠀⠀⢰⡿⠀⠀⠀⠀⠈⢿⡆⠀⠀⠀⠀⠀⣰⣿⠃
⠀⠀⠀⠀⠀⠘⢿⣦⠀⠀⠀⠀⠀⣿⡇⠀⢀⣤⡀⠀⢸⣿⠀⠀⠀⠀⣴⡿⠃
⠀⠀⠀⠀⠀⠀⠈⣿⣧⠀⠀⠀⠀⢿⡇⠀⠸⠿⠇⠀⢸⡿⠀⠀⠀⣼⣿
⠀⠀⠀⠀⠀⠀⠀⠸⣿⣆⠀⠀⠀⠘⢿⣄⠀⠀⠀⣠⡿⠃⠀⠀⣰⣿⠇
⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣦⣄⠀⠀⠀⠙⠻⠶⠟⠋⠀⠀⣀⣴⡿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣶⣤⣄⣀⣀⣀⣠⣤⣶⣿⠿⠋
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠟⠛⠉
`

export default function CapybaraPage() {
  return (
    <div className={styles.page}>

      <div className={styles.content}>
        <header className={`${styles.header} text-container`}>
          <p className={styles.kicker}>A SMALL CORNER OF THE INTERNET</p>
          <h1>
            <TypingEffect text="Capybara" speed={55} hideCursorAfter={500} />
          </h1>
          <p className={styles.subtitle}>Quietly keeping an eye on things.</p>
        </header>

        <section className={styles.frame} aria-label="Animated capybara text art">
          <div className={styles.frameTop} aria-hidden="true">
            <span>CAPYBARA.ASC</span>
            <span>01 / 01</span>
          </div>

          <div className={styles.artStage}>
            <div className={styles.halo} aria-hidden="true" />
            <div className={styles.artwork}>
              <div className={styles.floatingMark} aria-hidden="true">○</div>
              <pre aria-hidden="true">{capybara}</pre>
            </div>
            <span className="sr-only">
              A large, friendly capybara face drawn with detailed Unicode text characters.
            </span>
          </div>

          <div className={styles.frameBottom}>
            <span><i aria-hidden="true" /> STATUS: CHILLING</span>
            <span>please do not disturb</span>
          </div>
        </section>

        <p className={styles.note}>No agenda. No deadlines. Just capybara.</p>
      </div>
    </div>
  )
}
