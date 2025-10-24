import { useEffect, useState } from 'react'
import HomeSection from './components/HomeSection'
import ProjectsSection from './components/ProjectsSection'
import './App.css'

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
    }
    setTimeout(() => setIsScrolling(false), 800)
  }

  return (
    <>
      <div className="video-overlay"></div>
      <HomeSection onScrollToProjects={() => goToSection(1)} />
      <ProjectsSection />
    </>
  )
}

export default App
