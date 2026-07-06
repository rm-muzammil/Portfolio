'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import styles from './Contact.module.css'

export function Contact() {
  const ref = useReveal()
  const [copied, setCopied] = useState(false)

  const email = 'rmmuzamilofficial@gmail.com'

  const copy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div ref={ref} className="reveal">
        <p className="section-eyebrow">contact</p>

        <div className={styles.inner}>
          <h2 className={styles.heading}>
            Let&apos;s build something<br />
            <span style={{ color: 'var(--green)' }}>together.</span>
          </h2>

          <p className={styles.sub}>
            I&apos;m currently open to freelance projects and full-time opportunities.
           Whether you have a project, an opportunity, or just want to talk tech — I&apos;m all ears.
          </p>

          {/* Email */}
          <div className={styles.emailRow}>
            <a href={`mailto:${email}`} className={styles.emailLink}>{email}</a>
            <button
              onClick={copy}
              className={styles.copyBtn}
              aria-label="Copy email address"
            >
              {copied ? 'copied!' : 'copy'}
            </button>
          </div>

          {/* Social */}
          <div className={styles.socials}>
            {[
              { label: 'GitHub',   href: 'https://github.com/rm-muzammil' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/rm-muzammil-65b953276' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {s.label} ↗
              </a>
            ))}
          </div>

          {/* Status card */}
          <div className={styles.statusCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', letterSpacing: '0.06em' }}>
                available for work · freelance & full-time
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>
              Available for remote work · Full-time · Freelance
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}