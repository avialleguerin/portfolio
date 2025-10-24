import { useEffect, useState } from 'react'
import HomeSection from './components/HomeSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

function App() {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    // Force scroll to top on load
    window.scrollTo(0, 0)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (e.deltaY > 0 && scrollPosition < windowHeight * 0.5) {
        e.preventDefault()
        goToSection(1)
      } else if (e.deltaY < 0 && scrollPosition >= windowHeight * 0.5) {
        const projectsSection = document.getElementById('projects')
        const projectsTop = projectsSection ? projectsSection.offsetTop : windowHeight
        if (scrollPosition <= projectsTop + 50) {
          e.preventDefault()
          goToSection(0)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isScrolling])

  const goToSection = (sectionIndex: number) => {
    if (isScrolling) return
    setIsScrolling(true)

    if (sectionIndex === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (sectionIndex === 1) {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (sectionIndex === 2) {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setTimeout(() => setIsScrolling(false), 800)
  }

  return (
    <div className="font-lemon bg-[#191b1f] text-white min-h-screen w-full overflow-x-hidden overflow-y-scroll relative">
      {/* Video Overlay */}
      <div className="fixed inset-0 bg-black/70 pointer-events-none z-0"></div>
      
      <HomeSection 
        onScrollToProjects={() => goToSection(1)} 
        onScrollToContact={() => goToSection(2)}
      />
      <ProjectsSection onScrollToContact={() => goToSection(2)} />
      <ContactSection />
    </div>
  )
}

export default App
