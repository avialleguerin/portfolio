import { SOCIAL_LINKS } from '../data/constants'

const SocialLinks = () => {
  return (
    <div className="absolute bottom-[70px] left-[70px] flex flex-col gap-6 z-[100]">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target={link.download ? undefined : "_blank"}
          rel={link.download ? undefined : "noopener noreferrer"}
          download={link.download ? true : undefined}
          className="group flex items-center text-white/50 hover:text-white text-xl transition-all duration-300 no-underline hover:translate-x-1 cursor-pointer"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
          <span className="ml-3 overflow-hidden">
            <span className="block font-barlow text-sm tracking-[2px] uppercase text-white/70 opacity-0 -translate-x-2 transition-all duration-300 ease-out whitespace-nowrap group-hover:opacity-100 group-hover:translate-x-0">
              {link.label}
            </span>
          </span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
