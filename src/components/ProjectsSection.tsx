import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'
import ProjectCarousel from './ProjectCarousel'

const ProjectsSection = () => {
  return (
    <section 
      id="projects" 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>
      
      <Logo />
      <Navigation />
      <SocialLinks />
      <ScrollIndicator className="scroll-indicator-projects" />
      <ProjectCarousel />
    </section>
  )
}

export default ProjectsSection
