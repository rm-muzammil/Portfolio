/**
 * projectsData.js
 * Fields used by Projects.tsx:
 *   image       — path under /public
 *   title       — project name
 *   description — 1–2 sentence summary
 *   tags        — tech stack array (shown as pills)
 *   github      — repo URL (optional)
 *   live        — live demo URL (optional)
 */

const projectsData = [
  {
    image: "/projects-screenshort/ai_resume_builder.png",
    title: "AI Resume Builder",
    description:
      "Full-stack SaaS with JWT auth, AI-generated summaries via OpenAI, multi-resume dashboard, and server-side PDF export optimised for Vercel Edge.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "Puppeteer"],
    github: "https://github.com/rm-muzammil/ai-resume-builder",
    live:   "https://ai-resume-builder-theta-one.vercel.app/",
  },
  {
    image: "/projects-screenshort/banking-web-app.png",
    title: "NextBank",
    description:
      "Secure banking app with JWT auth, role-based access, real-time transaction management, and a clean admin dashboard.",
    tags: ["Next.js", "NextAuth", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/rm-muzamil/Banking-Web-App",
    live:   "https://banking-web-app-tau.vercel.app/",
  },
  {
    image: "/projects-screenshort/eco-mart.png",
    title: "EcoMart",
    description:
      "Sustainable e-commerce platform with product listings, cart, user auth, and an admin dashboard for inventory management.",
    tags: ["React", "Redux", "Express", "MongoDB", "Cloudinary"],
    github: "https://github.com/rm-muzammil/EcoMart",
    live:   "https://eco-mart-pied-eight.vercel.app/",
  },
  {
    image: "/projects-screenshort/threads-up.png",
    title: "Threads Up",
    description:
      "Responsive online clothing store with category browsing, search & filter, cart, and a smooth checkout flow.",
    tags: ["Next.js", "Tailwind CSS", "Shadcn UI"],
    github: "https://github.com/rm-muzammil/ThreadsUp",
    live:   "https://threads-up.vercel.app/",
  },
  {
    image: "/projects-screenshort/project-1(e-commerce).png",
    title: "E-Commerce Web App",
    description:
      "Full-stack e-commerce platform with product listings, order management, admin dashboard, and JWT role-based access control.",
    tags: ["React", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/rm-muzammil/fullStack-eCommerce",
    live:   null,
  },
]

export default projectsData