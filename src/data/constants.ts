import type { Project, NavLink, SocialLink } from '../types'

// Contact email used by the contact form (target recipient)
export const CONTACT_EMAIL = 'avialleguerin@gmail.com'

// EmailJS configuration (fill these with your EmailJS credentials)
export const EMAILJS_PUBLIC_KEY = 'TDAxP9tnbeob6kwBI' // e.g. 'your_public_key'
export const EMAILJS_SERVICE_ID = 'service_kwxbuek' // e.g. 'service_xxx'
export const EMAILJS_TEMPLATE_ID = 'template_garo0xm' // e.g. 'template_xxx'

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
    description: 'Portfolio web developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and a dashboard with advanced statistics.',
    tools: ['React', 'TypeScript', 'Vite', 'TailwindCSS']
  },
  {
    image: '/project2.png',
    title: 'PORTFOLIO',
    description: 'Portfolio web developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and a dashboard with advanced statistics.',
    tools: ['Next.js', 'Framer Motion', 'SCSS']
  },
  {
    image: '/project3.png',
    title: 'FINANCE TRACKER',
    description: 'Web app for personal finance management developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and an advanced statistics dashboard.',
    tools: ['React', 'Node.js', 'Express', 'MongoDB']
  }
]
