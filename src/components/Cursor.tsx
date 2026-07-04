'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }

    const expand = () => el.classList.add('expand')
    const shrink = () => el.classList.remove('expand')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(node => {
      node.addEventListener('mouseenter', expand)
      node.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />
}