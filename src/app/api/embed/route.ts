/**
 * POST /api/embed
 * Seeds the Supabase pgvector table with embeddings from /knowledge/*.md
 * Protected by a secret key — call once, then disable or delete.
 *
 * Call with:
 *   curl -X POST http://localhost:3000/api/embed \
 *     -H "x-embed-secret: your_secret_here"
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join }     from 'path'
import { embedText }    from '@/lib/gemini'
import { insertChunks } from '@/lib/supabase'
import { chunkText }    from '@/lib/chunker'
import { supabase }     from '@/lib/supabase'

const FILES = [
  'about.md',
  'projects.md',
  'skills.md',
  'experience.md',
  'contact.md',
]

export async function POST(req: NextRequest) {
  // Guard — require secret header so random people can't re-seed
  const secret = req.headers.get('x-embed-secret')
  if (secret !== process.env.EMBED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Clear existing chunks so re-seeding is idempotent
    await supabase.from('knowledge_chunks').delete().neq('id', 0)

    let totalChunks = 0

    for (const file of FILES) {
      const filePath = join(process.cwd(), 'knowledge', file)
      const text     = await readFile(filePath, 'utf-8')
      const chunks   = chunkText(text)

      console.log(`[embed] ${file} → ${chunks.length} chunks`)

      // Embed in batches of 5 to avoid rate limits
      for (let i = 0; i < chunks.length; i += 5) {
        const batch  = chunks.slice(i, i + 5)
        const embeds = await Promise.all(batch.map(embedText))

        await insertChunks(
          batch.map((content, j) => ({
            source:    file,
            content,
            embedding: embeds[j],
          }))
        )

        // Small delay between batches
        await new Promise(r => setTimeout(r, 300))
      }

      totalChunks += chunks.length
    }

    return NextResponse.json({
      ok:     true,
      files:  FILES.length,
      chunks: totalChunks,
    })

  } catch (err: any) {
    console.error('[embed] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}