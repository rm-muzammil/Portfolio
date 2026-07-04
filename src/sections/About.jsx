'use client'

import { useReveal } from '@/hooks/useReveal'
import styles from './About.module.css'

const stats = [
  { value: '5+',  label: 'projects shipped' },
  { value: '3+',  label: 'years building'   },
  { value: '10+', label: 'technologies'     },
]

const languages = [
  { lang: 'Urdu',    level: 'Native',  tag: 'green'  },
  { lang: 'English', level: 'Fluent',  tag: 'indigo' },
  { lang: 'German',  level: 'Learning',tag: 'orange' },
]

const currently = [
  'Docker & containerisation',
  'AWS (S3, EC2, Lambda)',
  'GitHub Actions CI/CD',
  'German language (A1 → B1)',
]

export function About() {
  const ref = useReveal()

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div ref={ref} className="reveal">
        <p className="section-eyebrow">about</p>

        <div className={styles.grid}>

          {/* ── Left col ── */}
          <div className={styles.left}>
            <h2 className={styles.heading}>
              I build full-stack products<br />
              <span style={{ color: 'var(--green)' }}>that ship to production.</span>
            </h2>

            <p className={styles.para}>
              I'm Muzammil — a software engineering student who has been shipping
              full-stack web applications since 2022. My stack is{' '}
              <strong>Next.js, TypeScript, Node.js, and PostgreSQL</strong>, with
              a growing focus on AI integration and cloud infrastructure.
            </p>

            <p className={styles.para}>
              I care about clean code, fast performance, and products that feel
              effortless to use. Currently expanding into DevOps and AI-augmented
              development to work on larger, more complex systems.
            </p>

            {/* Currently learning */}
            <div className={styles.learningBox}>
              <p className={styles.learningLabel}>currently learning</p>
              <div className={styles.learningGrid}>
                {currently.map(item => (
                  <div key={item} className={styles.learningItem}>
                    <span className={styles.learningDot} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={styles.langRow}>
              {languages.map(l => (
                <div key={l.lang} className={styles.langPill}>
                  <span className={`tag tag-${l.tag}`} style={{ marginBottom: 4, display: 'block' }}>
                    {l.level}
                  </span>
                  <span className={styles.langName}>{l.lang}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right col ── */}
          <div className={styles.right}>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {stats.map(s => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className={styles.timelineCard}>
              <p className={styles.timelineTitle}>journey</p>
              {[
                { year: '2026 →', text: 'Docker · AWS · CI/CD · deeper AI engineering' },
                { year: '2025',   text: 'Shipped AI Resume Builder — first AI-integrated SaaS' },
                { year: '2024',   text: 'Built EcoMart, ThreadsUp, e-commerce — learned the full stack' },
                { year: '2024',   text: 'Started BSSE — built first full-stack app (NextBank)' },
              ].map((t, i) => (
                <div key={i} className={styles.tRow}>
                  <span className={styles.tYear}>{t.year}</span>
                  <span className={styles.tText}>{t.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}