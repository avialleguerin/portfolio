import { useEffect, useState } from 'react'
import HomeSection from './components/HomeSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

function App() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0) // 0: home, 1: projects, 2: contact
  let touchStartY = 0

  useEffect(() => {
    // Force scroll to top on load
    window.scrollTo(0, 0)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Always prevent default to avoid partial scrolling between sections
      e.preventDefault()
      if (isScrolling) return
      if (e.deltaY > 0) {
        // Scroll down
        if (currentIndex < 2) goToSection(currentIndex + 1)
      } else if (e.deltaY < 0) {
        // Scroll up
        if (currentIndex > 0) goToSection(currentIndex - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return
      const downKeys = ['ArrowDown', 'PageDown', 'Space']
      const upKeys = ['ArrowUp', 'PageUp']
      if (downKeys.includes(e.key)) {
        e.preventDefault()
        if (currentIndex < 2) goToSection(currentIndex + 1)
      } else if (upKeys.includes(e.key)) {
        e.preventDefault()
        if (currentIndex > 0) goToSection(currentIndex - 1)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      // prevent default to avoid native scroll between sections
      e.preventDefault()
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return
      const endY = e.changedTouches[0].clientY
      const diff = endY - touchStartY
      const threshold = 40 // minimal swipe distance
      if (Math.abs(diff) < threshold) return
      if (diff < 0) {
        // swipe up -> go down
        if (currentIndex < 2) goToSection(currentIndex + 1)
      } else {
        // swipe down -> go up
        if (currentIndex > 0) goToSection(currentIndex - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel as any)
      window.removeEventListener('keydown', handleKeyDown as any)
      window.removeEventListener('touchstart', onTouchStart as any)
      window.removeEventListener('touchmove', onTouchMove as any)
      window.removeEventListener('touchend', onTouchEnd as any)
    }
  }, [isScrolling, currentIndex])

  const goToSection = (sectionIndex: number) => {
    if (isScrolling) return
    setIsScrolling(true)
    setCurrentIndex(sectionIndex)

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
    // after the smooth scroll likely finishes
    setTimeout(() => setIsScrolling(false), 900)
  }

  return (
    <div className="font-lemon bg-[#191b1f] text-white min-h-screen w-full overflow-x-hidden overflow-y-hidden relative">
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
