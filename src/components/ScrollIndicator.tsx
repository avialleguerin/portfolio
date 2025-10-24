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
      className={`scroll-indicator ${className}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <span>SCROLL</span>
      <div className="scroll-line"></div>
    </div>
  )
}

export default ScrollIndicator
