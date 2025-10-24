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
    <nav className="absolute top-[70px] right-[70px] flex gap-10 z-[100]">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="font-lagu font-medium text-white/70 hover:text-white no-underline text-sm tracking-[3px] transition-all duration-300 relative cursor-pointer
                     after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300
                     hover:after:w-full"
          onClick={(e) => handleClick(e, link.href)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default Navigation
