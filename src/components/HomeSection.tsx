import { useEffect, useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'

interface HomeSectionProps {
  onScrollToProjects: () => void
  onScrollToContact: () => void
  className?: string
  onLogoClick?: () => void
}

const HomeSection = ({ onScrollToProjects, onScrollToContact, className, onLogoClick }: HomeSectionProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const phrases = [
    "42 STUDENT\nBUILDING THE FUTURE",
    "FUTURE FOUNDER\nDESIGNING IMPACT",
    "WEB CREATOR\nSHAPING IDEAS"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // After fade out, change the phrase and fade in
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setIsVisible(true)
      }, 500) // Half second for fade out
      
    }, 3000) // Change phrase every 3 seconds
    
    return () => clearInterval(interval)
  }, [phrases.length])
  return (
    <section 
      id="home" 
      className={`min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden ${className || ''}`}
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>
      
      <Logo onClick={onLogoClick} />
      <div className="hidden sm:block">
        <Navigation onProjectsClick={onScrollToProjects} onContactClick={onScrollToContact} />
      </div>

      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="font-lagu font-medium w-[50%] text-right text-sm tracking-[8px] text-white/60 mb-5">I AM</div>
        <h1 className="font-lemon text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-black tracking-[6px] sm:tracking-[8px] lg:tracking-[12px] text-white mb-6 sm:mb-8 [text-shadow:0_10px_30px_rgba(0,0,0,0.9)] leading-[1.1] break-words">
          AMANDINE
        </h1>
        <div className="font-lagu font-light w-full text-left absolute right-0 text-sm tracking-[8px] text-white/80 leading-[1.8] [text-shadow:0_5px_20px_rgba(0,0,0,0.8)] min-h-[4.5rem]">
          <div 
            className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ position: 'absolute', right: 0, width: '50%' }}
          >
            {phrases[currentPhraseIndex].split('\n').map((line, i) => (
              <p key={i} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </main>

      <div className="hidden sm:block">
        <SocialLinks />
      </div>
      <ScrollIndicator onClick={onScrollToProjects} />
    </section>
  )
}

export default HomeSection
