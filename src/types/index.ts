export interface Project {
  // Primary image kept for backward compatibility
  image: string
  // Optional gallery images; if provided, UI will use these instead of single image
  images?: string[]
  title: string
  summary: string
  description: string
  tools?: string[]
  // Optional link to the project (GitHub, live demo, etc.)
  link?: string
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
