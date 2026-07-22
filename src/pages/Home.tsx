import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Highlights from '@/sections/Highlights'
import Curriculum from '@/sections/Curriculum'
import Projects from '@/sections/Projects'
import FAQ from '@/sections/FAQ'
import Footer from '@/sections/Footer'
import SectionDivider from '@/components/decor/SectionDivider'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <SectionDivider />
        <Curriculum />
        <SectionDivider />
        <Projects />
        <SectionDivider flip />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
