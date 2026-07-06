'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import styles from './Skills.module.css'
import skillsData from '@/data/skillsData'

interface Skill {
  name:      string
  category?: string
  level?:    number
}

const CATEGORY_ORDER = ['Frontend', 'Backend & APIs', 'Databases & ORM', 'DevOps & Cloud', 'Tools']

const ACCENT_MAP: Record<string, string> = {
  'Frontend':        'var(--green)',
  'Backend & APIs':  'var(--indigo)',
  'Databases & ORM': 'var(--orange)',
  'DevOps & Cloud':  'var(--orange)',
  'Tools':           'var(--text3)',
}

export function Skills() {
  const ref     = useReveal()
  const barsRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = barsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
    const items = (skillsData as Skill[]).filter(s => (s.category ?? 'Tools') === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div ref={ref} className="reveal">
        <p className="section-eyebrow">skills</p>
        <h2 className={styles.heading}>What I work with</h2>

        <div ref={barsRef} className={styles.grid}>
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className={styles.group}>
              <h3 className={styles.groupTitle} style={{ color: ACCENT_MAP[cat] ?? 'var(--text2)' }}>
                {cat}
              </h3>
              <div className={styles.items}>
                {items.map((skill, idx) => (
                  <div key={skill.name} className={styles.skillRow}>
                    <div className={styles.skillMeta}>
                      <span className={styles.skillName}>{skill.name}</span>
                      {skill.level && (
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      )}
                    </div>
                    {skill.level && (
                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{
                            width: animated ? `${skill.level}%` : '0%',
                            background: ACCENT_MAP[cat] ?? 'var(--green)',
                            transitionDelay: `${idx * 60}ms`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cloud}>
          {(skillsData as Skill[])
            .filter(s => !s.level)
            .map(s => (
              <span key={s.name} className="tag" style={{ fontSize: 12, padding: '5px 12px' }}>
                {s.name}
              </span>
            ))}
        </div>
      </div>
    </section>
  )
}