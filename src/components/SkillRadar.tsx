'use client'

import { useEffect, useState } from 'react'
import styles from './SkillRadar.module.css'

interface RadarSkill {
  label: string
  value: number   // 0–100
  color: string
}

const SKILLS: RadarSkill[] = [
  { label: 'Frontend',   value: 88, color: '#6ee7b7' },
  { label: 'Backend',    value: 75, color: '#818cf8' },
  { label: 'Databases',  value: 72, color: '#fb923c' },
  { label: 'AI / RAG',   value: 65, color: '#6ee7b7' },
  { label: 'DevOps',     value: 25, color: '#fb923c' },
  { label: 'Tools',      value: 80, color: '#818cf8' },
]

const SIZE    = 260
const CX      = SIZE / 2
const CY      = SIZE / 2
const RADIUS  = 95
const LEVELS  = 4

function polarToCart(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  }
}

function skillsToPath(skills: RadarSkill[], animated: boolean) {
  return skills
    .map((s, i) => {
      const angle = (360 / skills.length) * i
      const r     = animated ? (s.value / 100) * RADIUS : 0
      const { x, y } = polarToCart(angle, r)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ') + 'Z'
}

interface Props {
  compact?: boolean
}

export function SkillRadar({ compact = false }: Props) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  const n      = SKILLS.length
  const size   = compact ? 200 : SIZE
  const radius = compact ? 72 : RADIUS
  const cx     = size / 2
  const cy     = size / 2

  function pt(angle: number, r: number) {
    const rad = (angle - 90) * (Math.PI / 180)
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function toPath(anim: boolean) {
    return SKILLS.map((s, i) => {
      const angle = (360 / n) * i
      const r     = anim ? (s.value / 100) * radius : 0
      const { x, y } = pt(angle, r)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    }).join(' ') + 'Z'
  }

  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ''}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label="Skill radar chart"
        role="img"
      >
        {/* Grid levels */}
        {Array.from({ length: LEVELS }).map((_, lvl) => {
          const r = (radius / LEVELS) * (lvl + 1)
          const points = SKILLS.map((_, i) => {
            const { x, y } = pt((360 / n) * i, r)
            return `${x.toFixed(2)},${y.toFixed(2)}`
          }).join(' ')
          return (
            <polygon
              key={lvl}
              points={points}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          )
        })}

        {/* Axis lines */}
        {SKILLS.map((_, i) => {
          const { x, y } = pt((360 / n) * i, radius)
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={x}  y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          )
        })}

        {/* Filled area */}
        <path
          d={toPath(animated)}
          fill="rgba(110,231,183,0.12)"
          stroke="#6ee7b7"
          strokeWidth={1.5}
          strokeLinejoin="round"
          style={{ transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)' }}
        />

        {/* Skill dots */}
        {SKILLS.map((s, i) => {
          const angle   = (360 / n) * i
          const r       = animated ? (s.value / 100) * radius : 0
          const { x, y } = pt(angle, r)
          return (
            <circle
              key={i}
              cx={x} cy={y} r={3}
              fill={s.color}
              style={{ transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms` }}
            />
          )
        })}

        {/* Labels */}
        {SKILLS.map((s, i) => {
          const angle       = (360 / n) * i
          const labelRadius = radius + (compact ? 18 : 22)
          const { x, y }    = pt(angle, labelRadius)
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={compact ? 9 : 10}
              fontFamily="var(--font-mono)"
              fill="rgba(255,255,255,0.5)"
              letterSpacing="0.04em"
            >
              {s.label}
            </text>
          )
        })}
      </svg>

      {/* Legend */}
      {!compact && (
        <div className={styles.legend}>
          {SKILLS.map(s => (
            <div key={s.label} className={styles.legendItem}>
              <div className={styles.legendBar}>
                <div
                  className={styles.legendFill}
                  style={{
                    width: animated ? `${s.value}%` : '0%',
                    background: s.color,
                    transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </div>
              <div className={styles.legendMeta}>
                <span className={styles.legendLabel}>{s.label}</span>
                <span className={styles.legendValue}>{s.value}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}