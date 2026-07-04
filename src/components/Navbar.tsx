'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { label: 'about',   href: '#about'    },
  { label: 'work',    href: '#projects' },
  { label: 'skills',  href: '#skills'   },
  { label: 'contact', href: '#contact'  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // close menu on link click
  const close = () => setOpen(false)

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled || open ? 'rgba(9,9,11,0.95)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        borderBottom: scrolled || open ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <nav style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 2rem',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" onClick={close} style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 17,
              color: 'var(--text)',
              letterSpacing: '-0.03em',
            }}>
              RM<span style={{ color: 'var(--green)' }}>.</span>Muzammil
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }} className="nav-desktop">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.1em',
                color: 'var(--text2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Available badge — hidden on very small screens */}
            <div className="nav-badge" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 12px',
              border: '1px solid var(--border)',
              borderRadius: 20,
              background: 'var(--surface)',
            }}>
              <span className="live-dot" />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text2)',
                letterSpacing: '0.06em',
              }}>
                available
              </span>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              style={{
                display: 'none',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '6px 10px',
                cursor: 'pointer',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                lineHeight: 1,
              }}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>

        </nav>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: 'rgba(9,9,11,0.98)',
            borderTop: '1px solid var(--border)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Responsive styles injected globally */}
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .nav-badge { display: none !important; }
        }
      `}</style>
    </>
  )
}