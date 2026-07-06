'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

const roles = [
  'Full Stack Developer',
  'AI Integration Engineer',
  'Next.js Specialist',
  'Node.js Builder',
]

export function Hero() {
  const [roleIdx, setRoleIdx]     = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const target = roles[roleIdx]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < target.length) {
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 58)
    } else if (!deleting && displayed.length === target.length) {
      t = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
    } else {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.layout}>

        {/* ── LEFT — text content ── */}
        <div className={styles.left}>

          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDash} aria-hidden="true" />
            Full Stack Developer · AI Integration · Open to Work
          </p>

          <h1 className={styles.name}>RM Muzammil</h1>

          <div className={styles.roleRow}>
            <span className={styles.roleTyped} aria-live="polite">{displayed}</span>
            <span className={styles.caret} aria-hidden="true" />
          </div>

          <p className={styles.pitch}>
            I build production-grade web applications and integrate AI into real
            products — not demos. Clean code, fast performance, shipped to production.
          </p>

          <div className={styles.chips}>
            <span className={styles.chipLive}>
              <span className={styles.liveDot} aria-hidden="true" />
              Open to work
            </span>
            <span className={styles.chip}>Next.js · TypeScript</span>
            <span className={styles.chip}>AI Integration</span>
          </div>

          <div className={styles.ctas}>
            <a href="#projects" className={styles.btnPrimary}>View my work</a>
            <a href="#contact"  className={styles.btnGhost}>Get in touch</a>
            <a
              href="https://github.com/rm-muzammil"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnGhost}
            >
              GitHub ↗
            </a>
          </div>


        </div>

        {/* ── RIGHT — blended background photo ── */}
        <div className={styles.bgPhoto} aria-hidden="true">
          <Image
            src="/rm-muzammil.png"
            alt=""
            fill
            priority
            sizes="60vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div className={styles.bgFadeLeft} />
          <div className={styles.bgFadeBottom} />
          <div className={styles.bgFadeTop} />
        </div>

      </div>

      {/* scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  )
}