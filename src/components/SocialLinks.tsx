import { SOCIAL_LINKS } from '../data/constants'

const SocialLinks = () => {
  return (
    <div className="absolute bottom-[70px] left-[70px] flex gap-6 z-[100]">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white text-xl transition-all duration-300 no-underline hover:-translate-y-1 cursor-pointer"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
