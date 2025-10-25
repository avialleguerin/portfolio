import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Project } from '../types'

interface ProjectDetailProps {
  project: Project
  onBack?: () => void
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
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
    <div className="relative w-full min-h-screen flex items-center justify-center py-24">
      {/* Content layout inspired by the provided design */}
      <div
        className={`relative w-full max-w-7xl mx-auto px-8 ${
          isLightboxOpen ? 'pointer-events-none select-none' : ''
        }`}
        aria-hidden={isLightboxOpen}
        {...(isLightboxOpen ? { inert: '' as unknown as boolean } : {})}
      >
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-32 items-center justify-items-center">
          
          {/* Left side: Gallery with main image and thumbnails */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            {/* Main project image (clickable to open lightbox) */}
            <div className="relative z-10">
              <div className="aspect-[4/3] bg-black/20 border border-white/10 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)] transform rotate-2 hover:scale-[1.02] transition-transform duration-300">
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  className="w-full h-full block cursor-zoom-in"
                  aria-label="Open image in full screen"
                >
                  <img src={images[0]} alt={project.title} className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Decorative stacked images - always show first 3 images */}
            <button 
              type="button"
              onClick={() => openLightbox(1 % images.length)}
              className="absolute -top-36 -left-32 w-72 h-52 border border-white/10 rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] transform -rotate-12 z-20 hover:scale-[1.02] transition-transform duration-300"
              aria-label="Open image in full screen"
            >
              <img src={images[1 % images.length]} alt="" className="w-full h-full object-cover" />
            </button>
            
            <button 
              type="button"
              onClick={() => openLightbox(2 % images.length)}
              className="absolute -bottom-36 -right-32 w-72 h-52 rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] transform rotate-6 z-20 hover:scale-[1.02] transition-transform duration-300"
              aria-label="Open image in full screen"
            >
              <img src={images[2 % images.length]} alt="" className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Right side: Content structured like the reference */}
          <div className="space-y-8">
            {/* Header section */}
            <div>
              <div className="text-xs font-lagu tracking-[4px] text-white/60 uppercase mb-4">— About Project</div>
              <h1 className="font-lemon text-4xl lg:text-5xl text-white leading-tight tracking-[2px] mb-6">
                {project.title}
              </h1>
              <p className="font-antario text-lg text-[#c9c9c9e6] leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* All tools list */}
            {(project.tools || []) && (
              <div className="pt-4">
                <div className="text-xs font-lagu tracking-[3px] text-white/60 uppercase mb-3">STACK</div>
                <div className="flex flex-wrap gap-2">
                  {(project.tools || []).map((tool) => (
                    <span key={tool} className="text-xs tracking-wider uppercase bg-white/5 text-white/70 border border-white/10 rounded-full px-3 py-1">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back button */}
            {onBack && (
              <div className="pt-6">
                <button
                  onClick={onBack}
                  className="font-lagu font-medium py-[14px] px-[32px] text-xs tracking-[3px] text-white/80 bg-[#1a1a1a] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase hover:text-white hover:bg-[#2a2a2a] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-lg"
                >
                  ← Back to Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Lightbox modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} images viewer`}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onClick={closeLightbox}
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
