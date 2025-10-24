export interface Project {
  image: string
  title: string
  description: string
  tools?: string[]
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
