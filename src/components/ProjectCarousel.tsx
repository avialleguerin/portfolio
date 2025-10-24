import { useState } from 'react'
import { PROJECTS } from '../data/constants'
import type { Project } from '../types'

const ProjectCarousel = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(1)
  const [isRotating, setIsRotating] = useState(false)
  const [animationClass, setAnimationClass] = useState<{
    left?: string
    center?: string
    right?: string
  }>({})

  const getProjectAtIndex = (offset: number): Project => {
    const index = (currentProjectIndex + offset + PROJECTS.length) % PROJECTS.length
    return PROJECTS[index]
  }

  const leftProject = getProjectAtIndex(-1)
  const centerProject = getProjectAtIndex(0)
  const rightProject = getProjectAtIndex(1)

  const rotateLeft = () => {
    if (isRotating) return
    setIsRotating(true)

    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    setAnimationClass({
      left: 'fade-out-left',
      center: 'slide-to-right',
      right: 'slide-to-center-left'
    })

    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
      setAnimationClass({})
      
      setTimeout(() => {
        setAnimationClass({ left: 'fade-in-left' })
        setTimeout(() => {
          if (clickBlocker) clickBlocker.classList.remove('active')
          setIsRotating(false)
          setAnimationClass({})
        }, 600)
      }, 50)
    }, 600)
  }

  const rotateRight = () => {
    if (isRotating) return
    setIsRotating(true)

    const clickBlocker = document.querySelector('.click-blocker')
    if (clickBlocker) clickBlocker.classList.add('active')

    setAnimationClass({
      left: 'slide-to-center-right',
      center: 'slide-to-left',
      right: 'fade-out-right'
    })

    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % PROJECTS.length)
      setAnimationClass({})
      
      setTimeout(() => {
        setAnimationClass({ right: 'fade-in-right' })
        setTimeout(() => {
          if (clickBlocker) clickBlocker.classList.remove('active')
          setIsRotating(false)
          setAnimationClass({})
        }, 600)
      }, 50)
    }, 600)
  }

  return (
    <>
      {/* Projects Background */}
      <div className="m-auto flex items-end justify-center px-20 z-[1] relative -top-20">
        {/* Left Project */}
        <div 
          className={`flex-1 h-[50vh] w-[50vh] max-w-[50vh] overflow-hidden relative transition-all duration-500 ease-in-out aspect-square
                      blur-[1px] brightness-[0.6] scale-[0.8] origin-[center_bottom] mt-0 z-[2]
                      hover:blur-0 hover:brightness-[0.7] cursor-pointer
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      ${animationClass.left || ''}`}
          onClick={rotateLeft}
        >
          <img src={leftProject.image} alt={leftProject.title} className="w-full h-full object-cover block" />
        </div>
        
        {/* Center Project */}
        <div className={`flex-[0_0_50vh] h-[50vh] w-[50vh] max-w-[50vh] min-w-[50vh] aspect-square overflow-hidden relative z-[3] -mx-20
                        shadow-[0_20px_60px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform duration-300
                        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                        ${animationClass.center || ''}`}>
          <img src={centerProject.image} alt={centerProject.title} className="w-full h-full object-cover block" />
        </div>
        
        {/* Right Project */}
        <div 
          className={`flex-1 h-[50vh] w-[50vh] max-w-[50vh] overflow-hidden relative transition-all duration-500 ease-in-out aspect-square
                      blur-[1px] brightness-[0.6] scale-[0.8] origin-[center_bottom] mt-0 z-[2]
                      hover:blur-0 hover:brightness-[0.7] cursor-pointer
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-[#222] before:z-10
                      ${animationClass.right || ''}`}
          onClick={rotateRight}
        >
          <img src={rightProject.image} alt={rightProject.title} className="w-full h-full object-cover block" />
        </div>
      </div>

      {/* Main Project Content - Tout en dessous de l'image */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center z-10 w-full max-w-4xl px-10">
        <h1 className="font-lemon text-[70px] font-black tracking-[4px] text-white mb-8 [text-shadow:0_10px_30px_rgba(0,0,0,0.8)] leading-[1.1] pointer-events-none">
          {centerProject.title}
        </h1>
        
        <p className="font-barlow text-lg font-normal text-[#c9c9c9e6] leading-[1.6] mb-10 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] pointer-events-none">
          {centerProject.description}
        </p>
        
        <button className="font-lagu font-medium py-[15px] px-[50px] text-sm tracking-[3px] text-white/80 bg-[#222] border-none
                          shadow-[5px_8px_20px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase pointer-events-auto
                          hover:text-white hover:bg-[#333] hover:shadow-[6px_10px_25px_rgba(0,0,0,0.5)]">
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
