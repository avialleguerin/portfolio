import type { Project, NavLink, SocialLink } from '../types'

// Contact email used by the contact form (target recipient)
export const CONTACT_EMAIL = 'avialleguerin@gmail.com'

// EmailJS configuration (fill these with your EmailJS credentials)
export const EMAILJS_PUBLIC_KEY = '' // e.g. 'your_public_key'
export const EMAILJS_SERVICE_ID = '' // e.g. 'service_xxx'
export const EMAILJS_TEMPLATE_ID = '' // e.g. 'template_xxx'

export const NAV_LINKS: NavLink[] = [
  { href: '#projects', label: 'PROJECTS' },
  { href: '#contact', label: 'CONTACT' }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://github.com/avialleguerin',
    icon: 'fab fa-github',
    label: 'GitHub'
  },
  {
    url: 'https://www.linkedin.com/in/avg38/',
    icon: 'fab fa-linkedin-in',
    label: 'LinkedIn'
  },
  {
    url: '/CV%20-%20Amandine%20VIALLE-GUERIN.pdf',
    icon: 'fas fa-file-alt',
    label: 'Download CV',
    download: true
  }
]

export const PROJECTS: Project[] = [
  {
    image: '/project1.png',
    title: 'PORTFOLIO',
    description: 'Portfolio web développé en totale autonomie. Inclut un système de gestion de transactions, budgets, objectifs d\'épargne, catégorisation automatique et tableau de bord avec statistiques avancées.'
  },
  {
    image: '/project2.png',
    title: 'PORTFOLIO',
    description: 'Portfolio web développé en totale autonomie. Inclut un système de gestion de transactions, budgets, objectifs d\'épargne, catégorisation automatique et tableau de bord avec statistiques avancées.'
  },
  {
    image: '/project3.png',
    title: 'FINANCE TRACKER',
    description: 'Application web de gestion financière personnelle développée en totale autonomie. Inclut un système de gestion de transactions, budgets, objectifs d\'épargne, catégorisation automatique et tableau de bord avec statistiques avancées.'
  }
]
