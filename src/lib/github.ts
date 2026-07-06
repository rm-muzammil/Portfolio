const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const USERNAME     = 'rm-muzammil'

const headers: Record<string, string> = {
  'Accept': 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN ? { 'Authorization': `Bearer ${GITHUB_TOKEN}` } : {}),
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  archived: boolean
  size: number
}

export interface GitHubStats {
  username:     string
  avatarUrl:    string
  publicRepos:  number
  followers:    number
  totalStars:   number
  topLanguages: { name: string; percentage: number; color: string }[]
  recentRepos:  { name: string; description: string | null; url: string; stars: number; language: string | null; updatedAt: string }[]
  contributions: number  // total commits across all repos (approx)
}

const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178c6',
  JavaScript:  '#f1e05a',
  Python:      '#3572A5',
  CSS:         '#563d7c',
  HTML:        '#e34c26',
  Shell:       '#89e051',
  MDX:         '#fcb32c',
  Other:       '#8b8b8b',
}

export async function getGitHubStats(): Promise<GitHubStats> {
  // 1 — user profile
  const userRes  = await fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } })
  const user     = await userRes.json()

  // 2 — repos
  const reposRes = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 3600 } }
  )
  const repos: GitHubRepo[] = await reposRes.json()

  if (!Array.isArray(repos)) {
    throw new Error('GitHub API error — check token')
  }

  // 3 — aggregate language bytes across all repos
  const langBytes: Record<string, number> = {}
  await Promise.all(
    repos.slice(0, 10).map(async (repo) => {
      try {
        const res  = await fetch(repo.language?.toLowerCase() ?? '', { headers, next: { revalidate: 3600 } })
        const data = await res.json()
        Object.entries(data).forEach(([lang, bytes]) => {
          langBytes[lang] = (langBytes[lang] ?? 0) + (bytes as number)
        })
      } catch { /* skip */ }
    })
  )

  const totalBytes   = Object.values(langBytes).reduce((a, b) => a + b, 0)
  const topLanguages = Object.entries(langBytes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
      color: LANG_COLORS[name] ?? LANG_COLORS.Other,
    }))

  // 4 — total stars
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)

  // 5 — recent repos (exclude forks)
  const recentRepos = repos
    .filter(r => !r.fork)
    .slice(0, 4)
    .map(r => ({
      name:        r.name,
      description: r.description,
      url:         r.html_url,
      stars:       r.stargazers_count,
      language:    r.language,
      updatedAt:   r.updated_at,
    }))

  return {
    username:    USERNAME,
    avatarUrl:   user.avatar_url,
    publicRepos: user.public_repos,
    followers:   user.followers,
    totalStars,
    topLanguages,
    recentRepos,
    contributions: repos.reduce((sum, r) => sum + (r.size ?? 0), 0), // size as proxy
  }
}