import type { Metadata } from 'next'
import './globals.css'
import LenisWrapper from '@/components/LenisWrapper'
import { Cursor } from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'RM Muzammil — Full Stack Developer',
  description:
    'Full Stack Developer specializing in Next.js, TypeScript, and Node.js. ' +
    'Building modern web applications. Available for Germany 2028.',
  keywords: ['Full Stack Developer', 'Next.js', 'TypeScript', 'React', 'Germany', 'Pakistan'],
  authors: [{ name: 'RM Muzammil', url: 'https://portfolio-1leo.vercel.app' }],
  openGraph: {
    title: 'RM Muzammil — Full Stack Developer',
    description: 'Building modern, production-grade web applications. Targeting Germany 2028.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  )
}