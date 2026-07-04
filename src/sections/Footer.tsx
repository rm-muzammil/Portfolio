import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          RM<span style={{ color: 'var(--green)' }}>.</span>Muzammil
        </span>
        <span className={styles.note}>
          Built with Next.js · TypeScript · CSS Modules
        </span>
        <span className={styles.copy}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}