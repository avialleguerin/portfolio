import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Project } from '../types'

interface ProjectDetailProps {
  project: Project
  currentProjectIndex: number
  totalProjects: number
  isActive?: boolean
  onBack?: () => void
  onNavigateProject?: (direction: 'prev' | 'next') => void
}

const ProjectDetail = ({ project, currentProjectIndex, totalProjects, isActive = false, onBack, onNavigateProject }: ProjectDetailProps) => {
  // Build the image array: use project.images if provided, else fallback to single image
  const images = useMemo(() => (project.images && project.images.length > 0 ? project.images : [project.image]), [project.images, project.image])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  // Button to focus when the modal opens
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const backBtnRef = useRef<HTMLButtonElement | null>(null)

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setIsLightboxOpen(false), [])

  const showPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const showNext = useCallback(() => setCurrentIndex((i) => (i + 1) % images.length), [images.length])

  // Keyboard navigation and scroll handling when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    
    const onScroll = () => {
      // Close lightbox on any scroll
      closeLightbox()
    }
    
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isLightboxOpen, closeLightbox, showPrev, showNext])

  // Prevent background scroll and interactions while modal is open and manage initial focus
  useEffect(() => {
    if (isLightboxOpen) {
      const prevOverflow = document.body.style.overflow
      const prevPointerEvents = document.body.style.pointerEvents
      
      // Block all interactions and scroll on the entire page
      document.body.style.overflow = 'hidden'
      document.body.style.pointerEvents = 'none'
      
      // Add a class to help with global blocking if needed
      document.body.classList.add('modal-open')
      
      // focus close button next tick
      const id = window.setTimeout(() => {
        // Focus the primary action inside the modal
        (backBtnRef.current ?? closeBtnRef.current)?.focus()
      }, 0)
      
      return () => {
        document.body.style.overflow = prevOverflow
        document.body.style.pointerEvents = prevPointerEvents
        document.body.classList.remove('modal-open')
        window.clearTimeout(id)
      }
    }
  }, [isLightboxOpen])

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
      
      {/* Content layout */}
      <div
        className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isLightboxOpen ? 'pointer-events-none select-none' : ''
        }`}
        aria-hidden={isLightboxOpen}
        {...(isLightboxOpen ? { inert: '' as unknown as boolean } : {})}
      >
        {/* Back button */}
        {onBack && (
          <div className="pt-4 sm:pt-6">
            <button
              ref={backBtnRef}
              onClick={onBack}
              className="font-lagu md:hidden font-medium py-3 mb-4 px-6 sm:px-8 text-xs text-white/80 hover:text-white cursor-pointer uppercase sm:w-auto text-left"
            >
              ← Back to projects
            </button>
          </div>
        )}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-32 items-center justify-items-center">
          
          {/* Left side: Gallery with main image and thumbnails */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0">
            {/* Main project image (clickable to open lightbox) */}
            <div className="relative z-10">
              <div className="aspect-[4/3] bg-black/20 border border-white/10 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] sm:shadow-[0_25px_80px_rgba(0,0,0,0.6)] transform rotate-0 sm:rotate-1 hover:scale-[1.02] transition-transform duration-300">
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  className="w-full h-full block cursor-zoom-in"
                  aria-label="Ouvrir l'image en plein écran"
                >
                  <img 
                    src={images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </button>
              </div>
            </div>

            {/* Decorative stacked images - only show on larger screens */}
            {images.length > 1 && (
              <>
                <button 
                  type="button"
                  onClick={() => openLightbox(1 % images.length)}
                  className="hidden sm:block absolute -top-20 sm:-top-28 md:-top-32 -left-16 sm:-left-20 md:-left-24 w-40 sm:w-56 md:w-64 h-28 sm:h-40 md:h-48 border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform -rotate-6 sm:-rotate-12 z-20 hover:scale-[1.02] transition-transform duration-300"
                  aria-label="Voir l'image suivante"
                >
                  <img 
                    src={images[1 % images.length]} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </button>
                
                {images.length > 2 && (
                  <button 
                    type="button"
                    onClick={() => openLightbox(2 % images.length)}
                    className="hidden sm:block absolute -bottom-20 sm:-bottom-28 md:-bottom-32 -right-16 sm:-right-20 md:-right-24 w-40 sm:w-56 md:w-64 h-28 sm:h-40 md:h-48 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform rotate-3 sm:rotate-6 z-20 hover:scale-[1.02] transition-transform duration-300"
                    aria-label="Voir l'image précédente"
                  >
                    <img 
                      src={images[2 % images.length]} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Right side: Content */}
          <div className="space-y-6 sm:space-y-8 w-full px-4 sm:px-6 lg:px-0">
            {/* Header section */}
            <div>
              <div className="text-[10px] xs:text-xs font-lagu tracking-[3px] sm:tracking-[4px] text-white/60 uppercase mb-3 sm:mb-4">
                — About project
              </div>
              <h1 className="font-lemon text-xl xs:text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-[1px] sm:tracking-[2px] mb-4 sm:mb-6">
                {project.title}
              </h1>
              <p className="font-antario text-base sm:text-lg text-[#c9c9c9e6] leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* All tools list */}
            {(project.tools || []).length > 0 && (
              <div className="pt-2 sm:pt-4">
                <div className="text-[10px] xs:text-xs font-lagu tracking-[2px] sm:tracking-[3px] text-white/60 uppercase mb-2 sm:mb-3">
                  STACK
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(project.tools || []).map((tool) => (
                    <span 
                      key={tool} 
                      className="text-[10px] xs:text-xs tracking-wider uppercase bg-white/5 text-white/70 border border-white/10 rounded-full px-2.5 xs:px-3 py-1 sm:py-1.5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back button */}
            {onBack && (
              <div className="hidden md:block pt-4 sm:pt-6">
                <button
                  ref={backBtnRef}
                  onClick={onBack}
                  className="font-lagu font-medium py-3 sm:py-[14px] px-6 sm:px-8 text-xs tracking-[2px] sm:tracking-[3px] text-white/80 bg-[#1a1a1a] border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] sm:shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase hover:text-white hover:bg-[#2a2a2a] hover:border-white/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] rounded-lg w-full sm:w-auto text-center"
                >
                  ← Back to projects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Fixed Navigation Dots with Arrows - Only show when project detail is active and visible */}
      {onNavigateProject && totalProjects > 1 && project && isActive && (
        <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center z-10 px-4">
          <div className="flex items-center space-x-4 sm:space-x-6 bg-[#1a1a1a] p-2 rounded-full border border-white/10 md:border-none md:rounded-none md:p-0 md:shadow-none md:bg-transparent">
            {/* Left Arrow */}
            <button
              onClick={() => onNavigateProject('prev')}
              className="text-white/70 hover:text-white transition-colors duration-200 p-1"
              aria-label="Projet précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2 sm:space-x-3">
              {Array.from({ length: totalProjects }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const direction = index > currentProjectIndex ? 'next' : 'prev';
                    let clicks = Math.abs(index - currentProjectIndex);
                    // Animate through each project
                    const animate = () => {
                      if (clicks > 0) {
                        onNavigateProject(direction);
                        clicks--;
                        requestAnimationFrame(() => {
                          setTimeout(animate, 150); // Small delay between animations
                        });
                      }
                    };
                    animate();
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-200 ${
                    index === currentProjectIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50 w-3'
                  }`}
                  aria-label={`Aller au projet ${index + 1}`}
                  aria-current={index === currentProjectIndex ? 'step' : undefined}
                />
              ))}
            </div>
            
            {/* Right Arrow */}
            <button
              onClick={() => onNavigateProject('next')}
              className="text-white/70 hover:text-white transition-colors duration-200 p-1"
              aria-label="Projet suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Lightbox modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} images viewer`}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onClick={(e) => {
            // Ne fermer la lightbox que si le clic est sur l'arrière-plan
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
          ref={modalRef}
          onKeyDown={(e) => {
            if (e.key !== 'Tab') return
            const container = modalRef.current
            if (!container) return
            const focusable = Array.from(
              container.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
              )
            ).filter((el) => !el.hasAttribute('disabled'))
            if (focusable.length === 0) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (e.shiftKey) {
              if (document.activeElement === first) {
                e.preventDefault()
                last.focus()
              }
            } else {
              if (document.activeElement === last) {
                e.preventDefault()
                first.focus()
              }
            }
          }}
        >
          {/* Close cross removed as requested */}

          {/* Prev/Next buttons moved next to the central image */}

          <div className="w-full max-w-5xl">
            <div className="relative aspect-[16/10] bg-black/20 rounded-xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
              <img src={images[currentIndex]} alt="" className="w-full h-full object-contain rounded-xl" />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails strip inside lightbox */}
            {images.length > 1 && (
              <div className="mt-6 flex justify-center gap-3 overflow-x-auto pb-2 max-w-full">
                <div className="flex gap-3">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border ${
                        i === currentIndex ? 'border-white/80' : 'border-white/20 hover:border-white/50'
                      } transition-all duration-200`}
                      aria-label={`Show image ${i + 1}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      {i === currentIndex && (
                        <span className="absolute inset-0 ring-2 ring-white/90 rounded-lg pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Back to project page button inside lightbox */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={closeLightbox}
                ref={backBtnRef}
                className="font-lagu font-medium py-[12px] px-[28px] text-xs tracking-[3px] text-white/80 bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase hover:text-white hover:bg-[#2a2a2a] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                ← Back to project page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
