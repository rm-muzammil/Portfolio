# Projects

## 1. AI Resume Builder
**Type:** Full-stack SaaS, AI-integrated
**Status:** Live in production
**Live URL:** https://ai-resume-builder-theta-one.vercel.app/
**GitHub:** https://github.com/rm-muzammil/ai-resume-builder

### What it does
A full-stack AI-powered resume builder SaaS. Users can create, edit, manage, and export professional resumes. The AI generates professional summaries based on user input.

### Key technical decisions
- JWT authentication — secure, stateless, no third-party auth dependency
- Server-side PDF export using Puppeteer Core + @sparticuz/chromium-min, optimized specifically for Vercel's serverless environment (cold start constraints, binary size limits)
- Multi-resume dashboard — users can manage multiple resumes from one account
- AI summaries via OpenAI API — prompt-engineered for professional resume language
- PostgreSQL + Prisma ORM for type-safe database access
- Deployed on Vercel with Edge optimization

### Tech stack
Next.js 16, TypeScript, React, Tailwind CSS, Prisma ORM, PostgreSQL, JWT, Puppeteer Core, @sparticuz/chromium-min, OpenAI API, Vercel

### Challenges solved
- Puppeteer on Vercel requires a specific chromium binary — used @sparticuz/chromium-min to fit within serverless size limits
- PDF generation needed to be server-side only (no client-side libraries) for consistent output
- Multi-resume management required careful relational schema design

---

## 2. NextBank — Modern Banking Web Application
**Type:** Full-stack web app
**Status:** Live in production
**Live URL:** https://banking-web-app-tau.vercel.app/
**GitHub:** https://github.com/rm-muzamil/Banking-Web-App

### What it does
A secure banking web application with role-based access control. Admins can manage users and perform transfers. Customers can check balances, view transaction history, and send funds securely.

### Key technical decisions
- NextAuth for authentication with JWT sessions
- Role-based access — admin vs customer routes protected at middleware level
- Real-time transaction management
- MongoDB for flexible document storage of transaction records
- Clean banking UI designed for clarity and trust

### Tech stack
Next.js, NextAuth, Tailwind CSS, MongoDB

---

## 3. EcoMart — Sustainable E-Commerce Platform
**Type:** Full-stack e-commerce
**Status:** Live in production
**Live URL:** https://eco-mart-pied-eight.vercel.app/
**GitHub:** https://github.com/rm-muzammil/EcoMart

### What it does
A modern e-commerce platform focused on sustainability. Full product listing, cart, user authentication, and admin dashboard for inventory management.

### Key technical decisions
- Redux for global cart state management
- Cloudinary for optimized image storage and delivery
- Express backend with MongoDB
- Admin dashboard for inventory and order management

### Tech stack
React, Redux, Cloudinary, Express, MongoDB

---

## 4. Threads Up — Online Clothing Store
**Type:** Frontend e-commerce
**Status:** Live in production
**Live URL:** https://threads-up.vercel.app/
**GitHub:** https://github.com/rm-muzammil/ThreadsUp

### What it does
A fully responsive online clothing store with category browsing, search and filter, shopping cart, and checkout flow.

### Tech stack
Next.js, Tailwind CSS, Shadcn UI

---

## 5. Full-Stack E-Commerce Web App
**Type:** Full-stack e-commerce
**Status:** Built, GitHub only (no live URL)
**GitHub:** https://github.com/rm-muzammil/fullStack-eCommerce

### What it does
Complete e-commerce platform with user authentication, product listings, shopping cart, order management, and admin dashboard. JWT-based auth with role-based access control.

### Tech stack
React, Node.js, Express, Tailwind CSS, MongoDB, JWT