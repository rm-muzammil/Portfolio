/**
 * Splits text into overlapping chunks for embedding.
 * Overlap ensures context is not lost at chunk boundaries.
 */
export function chunkText(
  text: string,
  chunkSize  = 400,   // chars per chunk
  overlap    = 80     // chars of overlap between chunks
): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = start + chunkSize
    chunks.push(text.slice(start, end).trim())
    start += chunkSize - overlap
  }

  return chunks.filter(c => c.length > 40) // drop tiny trailing chunks
}