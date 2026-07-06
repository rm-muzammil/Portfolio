import type { Metadata } from 'next'
import './globals.css'
import LenisWrapper        from '@/components/LenisWrapper'
import { Cursor }          from '@/components/Cursor'
import { RagChat }         from '@/components/RagChat'
import { SocialSidebar }   from '@/components/SocialSidebar'

export const metadata: Metadata = {
  title: 'RM Muzammil — Full Stack Developer',
  description:
    'Full Stack Developer specializing in Next.js, TypeScript, and Node.js. ' +
    'Building modern web applications.',
  keywords: ['Full Stack Developer', 'Next.js', 'TypeScript', 'React', 'AI Engineer'],
  authors: [{ name: 'RM Muzammil' }],
  openGraph: {
    title: 'RM Muzammil — Full Stack Developer',
    description: 'Building production-grade web applications and AI-integrated products.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="orb orb-1"     aria-hidden="true" />
        <div className="orb orb-2"     aria-hidden="true" />
        <LenisWrapper>
          {children}
        </LenisWrapper>
        <SocialSidebar />
        <RagChat />
      </body>
    </html>
  )
}