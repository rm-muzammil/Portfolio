'use client'

import { useReveal } from '@/hooks/useReveal'
import Image from 'next/image'
import styles from './Projects.module.css'

// Matches your existing /src/data/projectsData.js shape
// { title, description, image, tags, github, live }
import projectsData from '@/data/projectsData'

export function Projects() {
  const ref = useReveal()
  const featured = projectsData[0]
  const rest     = projectsData.slice(1)

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div ref={ref} className="reveal">
        <p className="section-eyebrow">selected work</p>
        <h2 className={styles.heading}>Things I've built</h2>

        {/* Featured */}
        {featured && (
          <div className={styles.featured}>
            <div className={styles.featuredImg}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              <div className={styles.imgOverlay} />
            </div>
            <div className={styles.featuredInfo}>
              <span className={`tag tag-green`} style={{ marginBottom: 12, display: 'inline-block' }}>
                featured project
              </span>
              <h3 className={styles.projTitle}>{featured.title}</h3>
              <p className={styles.projDesc}>{featured.description}</p>
              <div className={styles.tagRow}>
                {featured.tags?.map((t: string) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className={styles.projLinks}>
                {featured.github && (
                  <a href={featured.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                    github ↗
                  </a>
                )}
                {featured.live && (
                  <a href={featured.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtnPrimary}>
                    live demo ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className={styles.grid}>
          {rest.map((p: typeof projectsData[0], i: number) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardImg}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.imgOverlay} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.tagRow} style={{ marginTop: 'auto', paddingTop: 10 }}>
                  {p.tags?.slice(0, 3).map((t: string) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className={styles.projLinks} style={{ marginTop: 12 }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                      github ↗
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                      live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}