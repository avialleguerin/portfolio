import type { Project, NavLink, SocialLink } from '../types'

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
