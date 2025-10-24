import { SOCIAL_LINKS } from '../data/constants'

const SocialLinks = () => {
  return (
    <div className="social-links">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
