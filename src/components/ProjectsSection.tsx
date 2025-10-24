import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'
import ProjectCarousel from './ProjectCarousel'
import ProjectDetail from './ProjectDetail'
import { useState } from 'react'
import type { Project } from '../types'

interface ProjectsSectionProps {
  onScrollToContact?: () => void
  className?: string
  onLogoClick?: () => void
}

const ProjectsSection = ({ onScrollToContact, className, onLogoClick }: ProjectsSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section 
      id="projects" 
      className={`min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden ${className || ''}`}
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>
      
      <Logo onClick={selectedProject ? () => setSelectedProject(null) : onLogoClick} />
      <Navigation onContactClick={onScrollToContact} />
      <SocialLinks />
      <ScrollIndicator className="scroll-indicator-projects" onClick={onScrollToContact} />

      {/* Crossfade containers */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${selectedProject ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <ProjectCarousel onViewProject={(project) => setSelectedProject(project)} />
      </div>

      <div className={`absolute inset-0 transition-opacity duration-500 ${selectedProject ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
