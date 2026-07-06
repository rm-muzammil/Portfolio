'use client'

import { useEffect, useState } from 'react'
import { useReveal }           from '@/hooks/useReveal'
import type { GitHubStats }    from '@/lib/github'
import styles                  from './GitHubStats.module.css'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30)  return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export function GitHubStats() {
  const ref = useReveal()
  const [stats, setStats]   = useState<GitHubStats | null>(null)
  const [error, setError]   = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(d => { setStats(d); setLoaded(true) })
      .catch(() => { setError(true); setLoaded(true) })
  }, [])

  if (!loaded) return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonBar} style={{ width: '40%' }} />
      <div className={styles.skeletonBar} style={{ width: '100%', height: 120 }} />
    </div>
  )

  if (error || !stats || ('error' in (stats as object))) return null

  return (
    <div ref={ref} className="reveal">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.ghIcon}>⌥</span>
            <div>
              <p className={styles.headerTitle}>GitHub Activity</p>
              <a
                href={`https://github.com/${stats.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.headerSub}
              >
                @{stats.username} &#8599;
              </a>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.headerStat}>
              <span className={styles.statNum}>{stats.publicRepos}</span>
              <span className={styles.statLbl}>repos</span>
            </div>
            <div className={styles.headerStat}>
              <span className={styles.statNum}>{stats.totalStars}</span>
              <span className={styles.statLbl}>stars</span>
            </div>
            <div className={styles.headerStat}>
              <span className={styles.statNum}>{stats.followers}</span>
              <span className={styles.statLbl}>followers</span>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.langSection}>
            <p className={styles.sectionLabel}>top languages</p>
            <div className={styles.langBar}>
              {stats.topLanguages.map(l => (
                <div
                  key={l.name}
                  className={styles.langSegment}
                  style={{ width: `${l.percentage}%`, background: l.color }}
                  title={`${l.name} ${l.percentage}%`}
                />
              ))}
            </div>
            <div className={styles.langLegend}>
              {stats.topLanguages.map(l => (
                <div key={l.name} className={styles.langItem}>
                  <span className={styles.langDot} style={{ background: l.color }} />
                  <span className={styles.langName}>{l.name}</span>
                  <span className={styles.langPct}>{l.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.repoSection}>
            <p className={styles.sectionLabel}>recent repos</p>
            <div className={styles.repoGrid}>
              {stats.recentRepos.map(r => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoCard}
                >
                  <div className={styles.repoTop}>
                    <span className={styles.repoName}>{r.name}</span>
                    <span className={styles.repoArrow}>&#8599;</span>
                  </div>
                  {r.description && (
                    <p className={styles.repoDesc}>{r.description}</p>
                  )}
                  <div className={styles.repoMeta}>
                    {r.language && (
                      <span className={styles.repoLang}>{r.language}</span>
                    )}
                    <span className={styles.repoTime}>{timeAgo(r.updatedAt)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}