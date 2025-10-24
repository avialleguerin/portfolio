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
      <div className="projects-background">
        <div 
          className={`project-bg project-bg-left ${animationClass.left || ''}`}
          onClick={rotateLeft}
          style={{ cursor: 'pointer' }}
        >
          <img src={leftProject.image} alt={leftProject.title} />
        </div>
        <div className={`project-bg project-bg-center ${animationClass.center || ''}`}>
          <img src={centerProject.image} alt={centerProject.title} />
        </div>
        <div 
          className={`project-bg project-bg-right ${animationClass.right || ''}`}
          onClick={rotateRight}
          style={{ cursor: 'pointer' }}
        >
          <img src={rightProject.image} alt={rightProject.title} />
        </div>
      </div>

      <div className="project-main-content">
        <h1 className="project-main-title">{centerProject.title}</h1>
        <p className="project-description">{centerProject.description}</p>
        <button className="view-project-btn">VIEW PROJECT</button>
      </div>

      <div className="click-blocker"></div>
    </>
  )
}

export default ProjectCarousel
