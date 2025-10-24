export interface Project {
  image: string
  title: string
  description: string
}

export interface NavLink {
  href: string
  label: string
}

export interface SocialLink {
  url: string
  icon: string
  label: string
  download?: boolean
}
