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
    <div className="logo" onClick={handleClick}>
      <img src="/logo.png" alt="AMAN Logo" className="logo-image" />
    </div>
  )
}

export default Logo
