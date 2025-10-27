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
    setIsRotating(true)

    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    // Compute upcoming indexes and preload incoming asset to avoid flash
    const len = PROJECTS.length
    const cur = currentProjectIndex
    const incomingRight = (cur + 2) % len
    
    // Wait for the next image to be fully loaded before starting animation
    await preloadImage(PROJECTS[incomingRight].image)

    // increment token to invalidate any pending callbacks
    const token = ++animTokenRef.current
    
    // Force reflow to ensure the browser registers the initial state
    void document.body.offsetHeight
    
    // Fade out content first
    setAnimationClass({
      content: 'opacity-0',
      left: 'fade-out-left',
      center: 'slide-to-left',
      right: 'slide-to-center-left'
    })

    mainTimerRef.current = window.setTimeout(() => {
      if (animTokenRef.current !== token) return
      
      // Update the state in a single batch
      requestAnimationFrame(() => {
        // Moving carousel to the left: right project becomes center => increment index
        pendingFadeRef.current = 'right'
        setCurrentProjectIndex((prev) => (prev + 1) % PROJECTS.length)
        
        // Clear only the classes that just finished
        setAnimationClass(prev => ({
          ...prev, 
          left: '', 
          center: '',
          // Force opacity-0 to prevent flash before fade-in
          right: 'opacity-0'
        }))
      })
    }, 600)
  }

  const rotateRight = async () => {
    if (isRotating) return
    setIsRotating(true)

    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    // Compute upcoming indexes and preload incoming asset
    const len = PROJECTS.length
    const cur = currentProjectIndex
    const incomingLeft = (cur - 2 + len) % len
    
    // Wait for the next image to be fully loaded before starting animation
    await preloadImage(PROJECTS[incomingLeft].image)

    const token = ++animTokenRef.current
    
    // Force reflow to ensure the browser registers the initial state
    void document.body.offsetHeight
    
    // Fade out content first
    setAnimationClass({
      content: 'opacity-0',
      left: 'slide-to-center-right',
      center: 'slide-to-right',
      right: 'fade-out-right'
    })

    mainTimerRef.current = window.setTimeout(() => {
      if (animTokenRef.current !== token) return
      
      // Update the state in a single batch
      requestAnimationFrame(() => {
        // Moving carousel to the right: left project becomes center => decrement index
        pendingFadeRef.current = 'left'
        setCurrentProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
        
        // Clear only finished ones
        setAnimationClass(prev => ({
          ...prev, 
          center: '', 
          right: '',
          // Force opacity-0 to prevent flash before fade-in
          left: 'opacity-0'
        }))
      })
    }, 600)
  }

  // Ensure fade-in is in place right after index change and only after image is decoded
  useLayoutEffect(() => {
    const side = pendingFadeRef.current
    if (!side) return
    
    const token = animTokenRef.current
    const containerSelector = side === 'right' ? '.project-bg-right' : '.project-bg-left'
    const imgEl = document.querySelector(`${containerSelector} img`) as HTMLImageElement | null
    
    // Force a reflow to ensure the initial state is applied
    void document.body.offsetHeight

    const startFade = () => {
      if (animTokenRef.current !== token) return
      
      // Wait for the next frame to ensure the DOM has updated
      requestAnimationFrame(() => {
        // Start fade-in animation
        setAnimationClass(prev => ({
          ...prev,
          [side]: `fade-in-${side}`,
          content: 'fade-in-content'
        }))
        
        // Set timeout to clean up after animation completes
        finalizeTimerRef.current = window.setTimeout(() => {
          if (animTokenRef.current !== token) return
          
          const clickBlocker = document.querySelector('.click-blocker')
          if (clickBlocker) clickBlocker.classList.remove('active')
          
          // Reset all animation classes in one go
          setAnimationClass(prev => ({
            ...prev,
            [side]: '',
            content: ''
          }))
          
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
      <div className="m-auto flex items-end justify-center px-20 z-[1] relative -top-20">
        {/* Left Project */}
        <div 
          className={`project-bg-left rounded-2xl flex-1 h-[50vh] w-[50vh] max-w-[50vh] overflow-hidden relative transition-[filter] duration-500 ease-in-out aspect-square
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
          className={`project-bg-center rounded-2xl flex-[0_0_50vh] h-[50vh] w-[50vh] max-w-[50vh] min-w-[50vh] aspect-square overflow-hidden relative z-[3] -mx-20
                      shadow-[0_20px_60px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform duration-300
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      cursor-pointer ${animationClass.center || ''}`}
          onClick={() => onViewProject?.(centerProject)}
        >
          <img src={centerProject.image} alt={centerProject.title} className="w-full h-full object-cover block" />
        </div>
        
        {/* Right Project */}
        <div 
          className={`project-bg-right rounded-2xl flex-1 h-[50vh] w-[50vh] max-w-[50vh] overflow-hidden relative transition-[filter] duration-500 ease-in-out aspect-square
                      blur-[1px] brightness-[0.6] scale-[0.8] origin-[center_bottom] mt-0 z-[2]
                      hover:blur-0 hover:brightness-[0.7] cursor-pointer
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      ${animationClass.right || ''}`}
          onClick={rotateLeft}
        >
          <img src={rightProject.image} alt={rightProject.title} className="w-full h-full object-cover block" />
        </div>
      </div>

      {/* Main Project Content - Tout en dessous de l'image */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center z-10 w-full max-w-4xl px-10">
        <div className={`transition-opacity duration-500 ${animationClass.content || ''}`}>
          <h1 className="font-lemon text-[70px] font-black tracking-[4px] text-white mb-8 [text-shadow:0_10px_30px_rgba(0,0,0,0.8)] leading-[1.1] pointer-events-none">
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
