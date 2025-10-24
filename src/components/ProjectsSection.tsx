import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'
import ProjectCarousel from './ProjectCarousel'

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section">
      <Logo />
      <Navigation />
      <SocialLinks />
      <ScrollIndicator className="scroll-indicator-projects" />
      <ProjectCarousel />
    </section>
  )
}

export default ProjectsSection
