interface ScrollIndicatorProps {
  onClick?: () => void
  className?: string
}

const ScrollIndicator = ({ onClick, className = '' }: ScrollIndicatorProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <div 
      className={`absolute bottom-[70px] right-[70px] flex flex-col items-center gap-5 z-[100] cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {(() => {
        const isProjects = className.includes('projects')
        const isContact = className.includes('contact')
        // Show top line for projects and contact. For contact, we are moving the line above with inverted gradient
        if (isProjects || isContact) {
          return <div className="w-[1px] h-[35px] bg-gradient-to-t from-white/50 to-transparent"></div>
        }
        return null
      })()}
      <span className="font-lagu font-medium [writing-mode:vertical-rl] text-[13px] tracking-[4px] text-white/50">SCROLL</span>
      {(() => {
        const isContact = className.includes('contact')
        // For contact page, remove the bottom line
        if (isContact) return null
        return <div className="w-[1px] h-[35px] bg-gradient-to-b from-white/50 to-transparent"></div>
      })()}
    </div>
  )
}

export default ScrollIndicator
