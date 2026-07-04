/**
 * skillsData.js
 * Updated for the redesign — added `category` and `level` (0–100).
 * Skills without `level` render as tag pills instead of bar charts.
 * Add Docker/AWS/CI-CD levels as you actually learn them.
 */

const skillsData = [
  // ── Frontend ──────────────────────────────────────────
  { name: 'Next.js',        category: 'Frontend',        level: 90 },
  { name: 'React',          category: 'Frontend',        level: 88 },
  { name: 'TypeScript',     category: 'Frontend',        level: 80 },
  { name: 'Tailwind CSS',   category: 'Frontend',        level: 82 },
  { name: 'Framer Motion',  category: 'Frontend',        level: 65 },

  // ── Backend & APIs ────────────────────────────────────
  { name: 'Node.js',        category: 'Backend & APIs',  level: 78 },
  { name: 'Express',        category: 'Backend & APIs',  level: 75 },
  { name: 'REST APIs',      category: 'Backend & APIs',  level: 82 },
  { name: 'NextAuth.js',    category: 'Backend & APIs',  level: 72 },

  // ── Databases & ORM ───────────────────────────────────
  { name: 'PostgreSQL',     category: 'Databases & ORM', level: 70 },
  { name: 'MongoDB',        category: 'Databases & ORM', level: 75 },
  { name: 'Prisma',         category: 'Databases & ORM', level: 70 },

  // ── DevOps & Cloud (honest — work in progress) ────────
  { name: 'Docker',         category: 'DevOps & Cloud',  level: 18 },
  { name: 'AWS',            category: 'DevOps & Cloud',  level: 12 },
  { name: 'GitHub Actions', category: 'DevOps & Cloud',  level: 30 },
  { name: 'Vercel',         category: 'DevOps & Cloud',  level: 80 },

  // ── Tools (no level → renders as tag cloud) ───────────
  { name: 'Git',            category: 'Tools' },
  { name: 'Figma',          category: 'Tools' },
  { name: 'VS Code',        category: 'Tools' },
  { name: 'Postman',        category: 'Tools' },
  { name: 'Claude API',     category: 'Tools' },
]

export default skillsData