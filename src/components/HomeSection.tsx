import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'

interface HomeSectionProps {
  onScrollToProjects: () => void
}

const HomeSection = ({ onScrollToProjects }: HomeSectionProps) => {
  return (
    <section id="home" className="home-section">
      <Logo />
      <Navigation onProjectsClick={onScrollToProjects} />

      <main className="main-content">
        <div className="intro-text">I AM</div>
        <h1 className="main-title">AMANDINE</h1>
        <p className="subtitle">
          A JUNIOR<br />WEB DESIGNER
        </p>
      </main>

      <SocialLinks />
      <ScrollIndicator onClick={onScrollToProjects} />
    </section>
  )
}

export default HomeSection
