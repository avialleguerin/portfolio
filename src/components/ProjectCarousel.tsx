import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/constants'
import type { Project } from '../types'

interface ProjectCarouselProps {
  onViewProject?: (project: Project) => void
}

const ProjectCarousel = ({ onViewProject }: ProjectCarouselProps) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(1)
  const [isRotating, setIsRotating] = useState(false)
  const [animationClass, setAnimationClass] = useState<{
    left?: string
    center?: string
    right?: string
    content?: string
  }>({})
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  // Refs to prevent overlapping/double animations
  const mainTimerRef = useRef<number | null>(null)
  const finalizeTimerRef = useRef<number | null>(null)
  const animTokenRef = useRef(0)
  const pendingFadeRef = useRef<'left' | 'right' | null>(null)

  const clearTimers = () => {
    if (mainTimerRef.current) window.clearTimeout(mainTimerRef.current)
    if (finalizeTimerRef.current) window.clearTimeout(finalizeTimerRef.current)
    mainTimerRef.current = null
    finalizeTimerRef.current = null
  }

  useEffect(() => {
    return () => clearTimers()
  }, [])

  const getProjectAtIndex = (offset: number): Project => {
    const index = (currentProjectIndex + offset + PROJECTS.length) % PROJECTS.length
    return PROJECTS[index]
  }

  const preloadImage = (src: string) => {
    if (!src || preloadedImages.has(src)) return
    
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(src))
        resolve()
      }
      // Handle image loading errors
      const errorHandler: EventListener = () => {
        img.removeEventListener('error', errorHandler)
        resolve()
      }
      img.addEventListener('error', errorHandler)
      img.src = src
    })
  }

  const leftProject = getProjectAtIndex(-1)
  const centerProject = getProjectAtIndex(0)
  const rightProject = getProjectAtIndex(1)

  const rotateLeft = async () => {
    if (isRotating) return
    
    // Nettoyer les timers existants
    clearTimers()
    
    // Désactiver les interactions pendant l'animation
    setIsRotating(true)
    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    // Calculer les index nécessaires
    const len = PROJECTS.length
    const cur = currentProjectIndex
    const incomingRight = (cur + 2) % len
    
    // Précharger l'image suivante
    await preloadImage(PROJECTS[incomingRight].image)

    // Incrémenter le token pour invalider les callbacks en attente
    const token = ++animTokenRef.current
    
    // Forcer un reflow pour s'assurer que l'état initial est enregistré
    void document.body.offsetHeight
    
    // Définir les classes d'animation initiales
    setAnimationClass({
      content: 'opacity-0',
      left: 'fade-out-left',
      center: 'slide-to-left',
      right: 'slide-to-center-left'
    })

    // Démarrer l'animation principale après un court délai
    mainTimerRef.current = window.setTimeout(() => {
      if (animTokenRef.current !== token) return
      
      requestAnimationFrame(() => {
        // Mettre à jour l'index du projet actuel
        pendingFadeRef.current = 'right'
        setCurrentProjectIndex((prev) => (prev + 1) % PROJECTS.length)
        
        // Réinitialiser les classes d'animation pour la transition
        setAnimationClass(prev => ({
          ...prev, 
          left: '', 
          center: '',
          right: 'opacity-0'
        }))
      })
    }, 500) // Réduit légèrement le délai pour une transition plus fluide
  }

  const rotateRight = async () => {
    if (isRotating) return
    
    // Nettoyer les timers existants
    clearTimers()
    
    // Désactiver les interactions pendant l'animation
    setIsRotating(true)
    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    // Calculer les index nécessaires
    const len = PROJECTS.length
    const cur = currentProjectIndex
    const incomingLeft = (cur - 2 + len) % len
    
    // Précharger l'image précédente
    await preloadImage(PROJECTS[incomingLeft].image)

    const token = ++animTokenRef.current
    
    // Forcer un reflow pour s'assurer que l'état initial est enregistré
    void document.body.offsetHeight
    
    // Définir les classes d'animation initiales
    setAnimationClass({
      content: 'opacity-0',
      left: 'slide-to-center-right',
      center: 'slide-to-right',
      right: 'fade-out-right'
    })

    // Démarrer l'animation principale après un court délai
    mainTimerRef.current = window.setTimeout(() => {
      if (animTokenRef.current !== token) return
      
      requestAnimationFrame(() => {
        // Mettre à jour l'index du projet actuel
        pendingFadeRef.current = 'left'
        setCurrentProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
        
        // Réinitialiser les classes d'animation pour la transition
        setAnimationClass(prev => ({
          ...prev, 
          center: '', 
          right: '',
          left: 'opacity-0'
        }))
      })
    }, 500) // Réduit légèrement le délai pour une transition plus fluide
  }

  // Gérer l'effet de fondu après le changement d'index
  useLayoutEffect(() => {
    const side = pendingFadeRef.current
    if (!side) return
    
    const token = animTokenRef.current
    const containerSelector = side === 'right' ? '.project-bg-right' : '.project-bg-left'
    const imgEl = document.querySelector(`${containerSelector} img`) as HTMLImageElement | null
    
    // Forcer un reflow pour s'assurer que l'état initial est appliqué
    void document.body.offsetHeight

    const startFade = () => {
      if (animTokenRef.current !== token) return
      
      // Attendre la prochaine frame pour s'assurer que le DOM est mis à jour
      requestAnimationFrame(() => {
        // Démarrer l'animation de fondu
        setAnimationClass(prev => ({
          ...prev,
          [side]: `fade-in-${side}`,
          content: 'fade-in-content'
        }))
        
        // Nettoyer après la fin de l'animation
        finalizeTimerRef.current = window.setTimeout(() => {
          if (animTokenRef.current !== token) return
          
          const clickBlocker = document.querySelector('.click-blocker')
          if (clickBlocker) clickBlocker.classList.remove('active')
          
          // Réinitialiser les classes d'animation
          setAnimationClass(prev => ({
            ...prev,
            [side]: '',
            content: ''
          }))
          
          // Réinitialiser l'état de rotation
          setIsRotating(false)
          pendingFadeRef.current = null
          
          setIsRotating(false)
          pendingFadeRef.current = null
        }, 600) // Match this with your CSS animation duration
      })
    }

    // If image is already loaded or doesn't exist, start fade immediately
    if (!imgEl || (imgEl.complete && imgEl.naturalHeight !== 0)) {
      startFade()
    } else if (imgEl) {
      // Otherwise wait for the image to load
      const onLoad = () => {
        if (imgEl) {
          imgEl.removeEventListener('load', onLoad)
          imgEl.removeEventListener('error', onError)
        }
        startFade()
      }
      
      const onError = () => {
        if (imgEl) {
          imgEl.removeEventListener('load', onLoad)
          imgEl.removeEventListener('error', onError)
        }
        startFade() // Still continue even if image fails to load
      }
      
      // Use standard event listeners for better browser compatibility
      imgEl.addEventListener('load', onLoad)
      imgEl.addEventListener('error', onError)
      
      return () => {
        if (imgEl) {
          imgEl.removeEventListener('load', onLoad)
          imgEl.removeEventListener('error', onError)
        }
      }
    }
  }, [currentProjectIndex])

  return (
    <>
      {/* Projects Background */}
      <div className="m-auto flex items-start sm:items-center justify-center px-4 sm:px-10 md:px-20 z-[1] relative h-[calc(100vh-140px)] sm:h-auto sm:items-end pt-10 sm:pt-0 sm:-top-16 md:-top-20">
        {/* Left Project */}
        <div 
          className={`project-bg-left rounded-2xl flex-1 h-[30vh] sm:h-[40vh] md:h-[50vh] w-[30vh] sm:w-[40vh] md:w-[50vh] max-w-[30vh] sm:max-w-[40vh] md:max-w-[50vh] overflow-hidden relative transition-all duration-500 ease-in-out aspect-square
                      blur-[1px] brightness-[0.6] scale-[0.8] origin-[center_bottom] mt-0 z-[2]
                      hover:blur-0 hover:brightness-[0.7] cursor-pointer
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      ${animationClass.left || ''}`}
          onClick={rotateRight}
        >
          <img src={leftProject.image} alt={leftProject.title} className="w-full h-full object-cover block" />
        </div>
        
        {/* Center Project */}
        <div 
          className={`project-bg-center rounded-2xl flex-[0_0_30vh] sm:flex-[0_0_40vh] md:flex-[0_0_50vh] h-[30vh] sm:h-[40vh] md:h-[50vh] w-[30vh] sm:w-[40vh] md:w-[50vh] max-w-[30vh] sm:max-w-[40vh] md:max-w-[50vh] min-w-[30vh] sm:min-w-[40vh] md:min-w-[50vh] aspect-square overflow-hidden relative z-[3] -mx-8 sm:-mx-12 md:-mx-20
                      shadow-[0_10px_30px_rgba(0,0,0,0.4),0_5px_15px_rgba(0,0,0,0.2)] sm:shadow-[0_15px_45px_rgba(0,0,0,0.5),0_8px_25px_rgba(0,0,0,0.3)] md:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform duration-300
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      cursor-pointer ${animationClass.center || ''}`}
          onClick={() => onViewProject?.(centerProject)}
        >
          <img src={centerProject.image} alt={centerProject.title} className="w-full h-full object-cover block" />
        </div>
        
        {/* Right Project */}
        <div 
          className={`project-bg-right rounded-2xl flex-1 h-[30vh] sm:h-[40vh] md:h-[50vh] w-[30vh] sm:w-[40vh] md:w-[50vh] max-w-[30vh] sm:max-w-[40vh] md:max-w-[50vh] overflow-hidden relative transition-all duration-500 ease-in-out aspect-square
                      blur-[1px] brightness-[0.6] scale-[0.8] origin-[center_bottom] mt-0 z-[2]
                      hover:blur-0 hover:brightness-[0.7] cursor-pointer
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      ${animationClass.right || ''}`}
          onClick={rotateLeft}
        >
          <img src={rightProject.image} alt={rightProject.title} className="w-full h-full object-cover block" />
        </div>
      </div>

      {/* Main Project Content - Positionnement adaptatif */}
      <div className="absolute top-[55%] sm:top-[65%] left-1/2 -translate-x-1/2 text-center z-10 w-full max-w-4xl px-4 sm:px-10">
        <div className={`transition-opacity duration-500 ${animationClass.content || ''}`}>
          <h1 className="font-lemon text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-black tracking-[2px] sm:tracking-[3px] md:tracking-[4px] text-white mb-6 sm:mb-8 [text-shadow:0_10px_30px_rgba(0,0,0,0.8)] leading-[1.1] pointer-events-none">
            {centerProject.title}
          </h1>
          
          <p className="font-antario font-bold text-lg text-[#c9c9c9e6] leading-[1.6] mb-10 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] pointer-events-none">
            {centerProject.summary}
          </p>
          
          <button
            onClick={() => onViewProject?.(centerProject)}
            className="font-lagu font-medium py-[14px] px-[32px] text-xs tracking-[3px] text-white/80 bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase hover:text-white hover:bg-[#2a2a2a] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-lg"
          >
            VIEW PROJECT
          </button>
        </div>
      </div>

      {/* Click Blocker */}
      <div className="click-blocker fixed inset-0 bg-transparent z-[9999] pointer-events-none opacity-0"></div>
      
      <style>{`
        .click-blocker.active {
          pointer-events: auto;
        }
        .fade-in-content {
          animation: fadeIn 500ms ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default ProjectCarousel
