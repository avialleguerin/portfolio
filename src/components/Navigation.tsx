import { NAV_LINKS } from '../data/constants'

interface NavigationProps {
  onProjectsClick?: () => void
}

const Navigation = ({ onProjectsClick }: NavigationProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#projects' && onProjectsClick) {
      e.preventDefault()
      onProjectsClick()
    }
  }

  return (
    <nav className="navbar">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="nav-link"
          onClick={(e) => handleClick(e, link.href)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default Navigation
