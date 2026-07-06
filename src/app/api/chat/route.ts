/**
 * POST /api/chat
 * Body: { question: string }
 * Returns: streamed text response
 *
 * Pipeline:
 * 1. Embed the user's question with Gemini
 * 2. Search pgvector for top-5 similar chunks
 * 3. Build context string from results
 * 4. Stream Gemini answer grounded in that context
 */

import { NextRequest, NextResponse } from 'next/server'
import { embedText, generateAnswer } from '@/lib/gemini'
import { searchChunks }              from '@/lib/supabase'

const SYSTEM_PROMPT = `You are the AI assistant for RM Muzammil's developer portfolio.
You answer questions about Muzammil's skills, projects, experience, and background.
You are helpful, honest, and concise. You speak in first person on behalf of Muzammil.
You never make up information — only answer from what is provided in the context.
If asked something not covered, say: "I don't have that information — feel free to email rmmuzammil.dev@gmail.com"`

// Simple in-memory rate limit: max 20 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now  = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (entry.count >= 20) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests — please wait a moment.' },
      { status: 429 }
    )
  }

  let question: string
  try {
    const body = await req.json()
    question   = (body.question ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!question || question.length < 2) {
    return NextResponse.json({ error: 'Question is too short.' }, { status: 400 })
  }
  if (question.length > 500) {
    return NextResponse.json({ error: 'Question is too long.' }, { status: 400 })
  }

  try {
    // Step 1 — embed the question
    const queryEmbedding = await embedText(question)

    // Step 2 — retrieve top matching chunks from pgvector
    const chunks = await searchChunks(queryEmbedding, 5, 0.45)

    if (chunks.length === 0) {
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(
              "I couldn't find relevant information for that question. Try asking about my projects, skills, or background — or email me at rmmuzammil.dev@gmail.com"
            )
          )
          controller.close()
        },
      })
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    // Step 3 — build context string
    const context = chunks
      .map(c => `[Source: ${c.source}]\n${c.content}`)
      .join('\n\n---\n\n')

    // Step 4 — stream Gemini answer
    const stream = await generateAnswer(SYSTEM_PROMPT, question, context)

    return new Response(stream, {
      headers: {
        'Content-Type':  'text/plain; charset=utf-8',
        'X-Sources':     [...new Set(chunks.map(c => c.source))].join(','),
      },
    })

  } catch (err: unknown) {
  const message =
    err instanceof Error ? err.message : "Unknown error";

  return Response.json({ error: message }, { status: 500 });
}
}