interface LogoProps {
  onClick?: () => void
}

const Logo = ({ onClick }: LogoProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick()
    } else {
      window.location.reload()
    }
  }

  return (
    <div 
      className="absolute top-8 left-8 z-50 opacity-70 hover:opacity-100 cursor-pointer transition-opacity duration-300 pointer-events-auto"
      onClick={handleClick}
    >
      <img 
        src="/logo.png" 
        alt="AMAN Logo" 
        className="h-[70px] w-auto object-contain sm:h-[90px]" 
      />
    </div>
  )
}

export default Logo
