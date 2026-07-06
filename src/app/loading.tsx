'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [text, setText] = useState('')

  useEffect(() => {
    const texts = ['Loading...', 'Almost there...', 'Just a moment...']
    let i = 0
    setText(texts[0])
    const interval = setInterval(() => {
      i = (i + 1) % texts.length
      setText(texts[i])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text3)',
      letterSpacing: '0.1em',
    }}>
      {text}
    </div>
  )
}