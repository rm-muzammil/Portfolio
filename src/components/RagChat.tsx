'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import styles from './RagChat.module.css'

interface Message {
  role:    'user' | 'assistant'
  content: string
  sources?: string[]
}

const SUGGESTED = [
  'What is your strongest project?',
  'What tech stack do you use?',
  'Are you available for work?',
  'Tell me about your AI experience.',
]

export function RagChat() {
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [open, setOpen]           = useState(false)
  const bottomRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  async function send(question: string) {
    if (!question.trim() || loading) return

    const userMsg: Message = { role: 'user', content: question }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Placeholder for streaming assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ question }),
      })

      if (!res.ok) {
        const err = await res.json()
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: err.error ?? 'Something went wrong.' },
        ])
        return
      }

      // Stream the response
      const sources = res.headers.get('X-Sources')?.split(',').filter(Boolean) ?? []
      const reader  = res.body!.getReader()
      const decoder = new TextDecoder()
      let   full    = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        // Update the last message with streamed content
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: full, sources },
        ])
      }

    } catch {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Network error — please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI chat' : 'Open AI portfolio chat'}
      >
        {open ? (
          <span className={styles.triggerIcon}>✕</span>
        ) : (
          <>
            <span className={styles.triggerDot} />
            <span className={styles.triggerText}>Ask me anything</span>
          </>
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="AI Portfolio Chat">

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.headerDot} />
              <div>
                <p className={styles.headerTitle}>AI Portfolio</p>
                <p className={styles.headerSub}>Powered by Gemini + RAG</p>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>Ask me anything about Muzammil</p>
                <p className={styles.emptySub}>Projects, skills, experience, availability — I know it all.</p>
                <div className={styles.suggestions}>
                  {SUGGESTED.map(q => (
                    <button
                      key={q}
                      className={styles.suggestion}
                      onClick={() => send(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.userMsg : styles.assistantMsg}>
                {m.role === 'assistant' && (
                  <span className={styles.assistantLabel}>AI</span>
                )}
                <div className={styles.bubble}>
                  {m.content || (
                    <span className={styles.typing}>
                      <span /><span /><span />
                    </span>
                  )}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className={styles.sources}>
                    {m.sources.map(s => (
                      <span key={s} className={styles.sourceTag}>
                        {s.replace('.md', '')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about projects, skills, availability..."
              disabled={loading}
              maxLength={500}
              aria-label="Your question"
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              {loading ? '...' : '↑'}
            </button>
          </form>

        </div>
      )}
    </>
  )
}