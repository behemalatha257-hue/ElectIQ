import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>🗳️</span>
              <span className={styles.logoText}>Elect<span className={styles.logoAccent}>IQ</span></span>
            </div>
            <p className={styles.tagline}>
              AI-powered civic education for every citizen.
              Know your vote. Shape your future.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>🤖 Gemini AI</span>
              <span className={styles.badge}>☁️ Cloud Run</span>
              <span className={styles.badge}>🔒 Secure</span>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <div className={styles.groupTitle}>Learn</div>
              <a href="#timeline">Election Timeline</a>
              <a href="#flashcards">Flashcards</a>
              <a href="#innovations">Innovations</a>
              <a href="#ai-chat">AI Guide</a>
            </div>
            <div className={styles.linkGroup}>
              <div className={styles.groupTitle}>Resources</div>
              <a href="https://vote.gov" target="_blank" rel="noreferrer">vote.gov (USA)</a>
              <a href="https://www.eac.gov" target="_blank" rel="noreferrer">Election Assistance</a>
              <a href="https://www.ifes.org" target="_blank" rel="noreferrer">IFES Global</a>
              <a href="https://www.idea.int" target="_blank" rel="noreferrer">IDEA International</a>
            </div>
            <div className={styles.linkGroup}>
              <div className={styles.groupTitle}>Tech Stack</div>
              <span>Next.js 16</span>
              <span>Google Gemini API</span>
              <span>Cloud Run (GCP)</span>
              <span>Firebase</span>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} ElectIQ. Built for civic education. Not affiliated with any government body.
          </p>
          <p className={styles.disclaimer}>
            ⚠️ Always verify election information with your official local election authority.
          </p>
        </div>
      </div>
    </footer>
  );
}
