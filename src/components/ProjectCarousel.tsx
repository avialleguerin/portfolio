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
  }>({})

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
    if (!src) return
    const img = new Image()
    img.src = src
  }

  const leftProject = getProjectAtIndex(-1)
  const centerProject = getProjectAtIndex(0)
  const rightProject = getProjectAtIndex(1)

  const nextFrame = (cb: () => void) => requestAnimationFrame(() => requestAnimationFrame(cb))

  const rotateLeft = () => {
    if (isRotating) return
    setIsRotating(true)

    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    // Compute upcoming indexes and preload incoming asset to avoid flash
    const len = PROJECTS.length
    const cur = currentProjectIndex
    const incomingRight = (cur + 2) % len
    preloadImage(PROJECTS[incomingRight].image)

    // increment token to invalidate any pending callbacks
    const token = ++animTokenRef.current
    setAnimationClass({
      left: 'fade-out-left',
      center: 'slide-to-left',
      right: 'slide-to-center-left'
    })

    mainTimerRef.current = window.setTimeout(() => {
      if (animTokenRef.current !== token) return
      // Moving carousel to the left: right project becomes center => increment index
      pendingFadeRef.current = 'right'
      setCurrentProjectIndex((prev) => (prev + 1) % PROJECTS.length)
      // Clear only the classes that just finished
      setAnimationClass((prev) => ({ ...prev, left: '', center: '' }))
      // Fade-in is handled in useLayoutEffect synced with index change
    }, 600)
  }

  const rotateRight = () => {
    if (isRotating) return
    setIsRotating(true)

    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    // Compute upcoming indexes and preload incoming asset
    const len = PROJECTS.length
    const cur = currentProjectIndex
    const incomingLeft = (cur - 2 + len) % len
    preloadImage(PROJECTS[incomingLeft].image)

    const token = ++animTokenRef.current
    setAnimationClass({
      left: 'slide-to-center-right',
      center: 'slide-to-right',
      right: 'fade-out-right'
    })

    mainTimerRef.current = window.setTimeout(() => {
      if (animTokenRef.current !== token) return
      // Moving carousel to the right: left project becomes center => decrement index
      pendingFadeRef.current = 'left'
      setCurrentProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
      // Clear only finished ones
      setAnimationClass((prev) => ({ ...prev, center: '', right: '' }))
      // Fade-in is handled in useLayoutEffect synced with index change
    }, 600)
  }

  // Ensure fade-in is in place right after index change and only after image is decoded
  useLayoutEffect(() => {
    const side = pendingFadeRef.current
    if (!side) return
    const token = animTokenRef.current
    const containerSelector = side === 'right' ? '.project-bg-right' : '.project-bg-left'
    const imgEl = document.querySelector(`${containerSelector} img`) as HTMLImageElement | null

    const startFade = () => {
      if (animTokenRef.current !== token) return
      // Start from opacity-0 then next frame trigger fade-in to avoid flash
      setAnimationClass((prev) => ({ ...prev, [side]: 'opacity-0' }))
      nextFrame(() => {
        if (animTokenRef.current !== token) return
        setAnimationClass((prev) => ({ ...prev, [side]: `opacity-0 fade-in-${side}` }))
        finalizeTimerRef.current = window.setTimeout(() => {
          if (animTokenRef.current !== token) return
          const clickBlocker = document.querySelector('.click-blocker')
          if (clickBlocker) clickBlocker.classList.remove('active')
          setIsRotating(false)
          setAnimationClass((prev) => ({ ...prev, [side]: '' }))
          pendingFadeRef.current = null
        }, 600)
      })
    }

    if (imgEl && imgEl.complete) {
      startFade()
    } else if (imgEl) {
      const onLoad = () => {
        imgEl.removeEventListener('load', onLoad)
        startFade()
      }
      imgEl.addEventListener('load', onLoad)
      return () => imgEl.removeEventListener('load', onLoad)
    } else {
      // Fallback if no element found
      startFade()
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
        <div className={`project-bg-center rounded-2xl flex-[0_0_50vh] h-[50vh] w-[50vh] max-w-[50vh] min-w-[50vh] aspect-square overflow-hidden relative z-[3] -mx-20
                        shadow-[0_20px_60px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform duration-300
                        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                        ${animationClass.center || ''}`}>
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

      {/* Click Blocker */}
      <div className="click-blocker fixed inset-0 bg-transparent z-[9999] pointer-events-none opacity-0"></div>
      
      <style>{`
        .click-blocker.active {
          pointer-events: auto;
        }
      `}</style>
    </>
  )
}

export default ProjectCarousel
