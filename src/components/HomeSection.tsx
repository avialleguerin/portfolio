import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'

interface HomeSectionProps {
  onScrollToProjects: () => void
}

const HomeSection = ({ onScrollToProjects }: HomeSectionProps) => {
  return (
    <section 
      id="home" 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>
      
      <Logo />
      <Navigation onProjectsClick={onScrollToProjects} />

      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="font-lagu font-medium text-sm tracking-[8px] text-white/60 mb-5">I AM</div>
        <h1 className="font-lemon text-[120px] font-black tracking-[12px] text-white mb-8 [text-shadow:0_15px_40px_rgba(0,0,0,0.9)] leading-[1.1]">
          AMANDINE
        </h1>
        <p className="font-lagu font-light text-2xl tracking-[8px] text-white/80 leading-[1.8] [text-shadow:0_5px_20px_rgba(0,0,0,0.8)]">
          A JUNIOR<br />WEB DESIGNER
        </p>
      </main>

      <SocialLinks />
      <ScrollIndicator onClick={onScrollToProjects} />
    </section>
  )
}

export default HomeSection
