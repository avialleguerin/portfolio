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
      className="absolute top-[50px] left-[50px] z-[10000] opacity-70 hover:opacity-100 cursor-pointer transition-opacity duration-300 pointer-events-auto"
      onClick={handleClick}
    >
      <img src="/logo.png" alt="AMAN Logo" className="h-[90px] w-auto object-contain" />
    </div>
  )
}

export default Logo
