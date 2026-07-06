import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!      // service key — server only, never expose
)

// ── Semantic search ────────────────────────────────────────────────────────
export async function searchChunks(
  embedding: number[],
  matchCount = 5,
  threshold  = 0.5
): Promise<{ source: string; content: string; similarity: number }[]> {
  const { data, error } = await supabase.rpc('match_chunks', {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count:     matchCount,
  })

  if (error) throw new Error(`Supabase search error: ${error.message}`)
  return data ?? []
}

// ── Insert chunks (used by embed script) ──────────────────────────────────
export async function insertChunks(
  chunks: { source: string; content: string; embedding: number[] }[]
) {
  const { error } = await supabase
    .from('knowledge_chunks')
    .insert(chunks)

  if (error) throw new Error(`Supabase insert error: ${error.message}`)
}