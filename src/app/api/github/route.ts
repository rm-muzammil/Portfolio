import { NextResponse } from 'next/server'
import { getGitHubStats } from '@/lib/github'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  try {
    const stats = await getGitHubStats()
    return NextResponse.json(stats)
  } catch (err) {
    console.error('[github]', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}