import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const EMBED_MODEL = 'gemini-embedding-001'  // 768 dims — matches pgvector schema
const GEN_MODEL   = 'gemini-2.5-flash'

// ── Embed ──────────────────────────────────────────────────────────────────
export async function embedText(text: string): Promise<number[]> {
  const model  = genAI.getGenerativeModel({ model: EMBED_MODEL })
  const result = await model.embedContent(text)
  return result.embedding.values
}

// ── Generate streamed answer ───────────────────────────────────────────────
export async function generateAnswer(
  systemPrompt: string,
  userQuestion: string,
  context: string
): Promise<ReadableStream<Uint8Array>> {
  const model = genAI.getGenerativeModel({
    model: GEN_MODEL,
    systemInstruction: systemPrompt,
  })

  const prompt = `CONTEXT FROM KNOWLEDGE BASE:
${context}

USER QUESTION: ${userQuestion}

Answer based only on the context above. Be concise, honest, and specific.
If the answer is not in the context, say so plainly.`

  const result  = await model.generateContentStream(prompt)
  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(encoder.encode(text))
        }
      } finally {
        controller.close()
      }
    },
  })
}