export interface Project {
  // Primary image kept for backward compatibility
  image: string
  // Optional gallery images; if provided, UI will use these instead of single image
  images?: string[]
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
