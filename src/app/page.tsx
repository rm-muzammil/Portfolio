import { Navbar }   from '@/components/Navbar'
import { Hero }     from '@/sections/Hero'
import { About }    from '@/sections/About'
import { Projects } from '@/sections/Projects'
import { Skills }   from '@/sections/Skills'
import { Contact }  from '@/sections/Contact'
import { Footer }   from '@/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero is full-bleed — outside page-content so bg image isn't clipped */}
      <div style={{ position: 'relative' }}>
        <div className="page-content">
          <Hero />
        </div>
      </div>

      {/* Rest of sections inside the centered container */}
      <main className="page-content">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}