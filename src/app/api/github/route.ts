import { NextResponse }    from 'next/server'
import { getGitHubStats } from '@/lib/github'

export const revalidate = 3600

export async function GET() {
  try {
    const stats = await getGitHubStats()
    return NextResponse.json(stats)
  } catch (err: any) {
    console.error('[github]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}