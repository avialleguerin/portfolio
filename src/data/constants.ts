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
    images: ['/project1.png', '/project2.png', '/project3.png'],
    title: 'PORTFOLIO',
    summary: 'Portfolio web developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and a dashboard with advanced statistics.',
    description: 'Fully autonomous development of a complete web portfolio application. The platform features a robust transaction management system, dynamic budgeting tools, customizable savings goals, and automated expense categorization. It also includes an interactive dashboard providing detailed analytics and advanced financial statistics for comprehensive tracking and decision-making.',
    tools: ['React', 'TypeScript', 'Vite', 'TailwindCSS']
  },
  {
    image: '/project2.png',
    images: ['/project2.png', '/project1.png', '/project3.png', '/project2.png'],
    title: 'PORTFOLIO',
    summary: 'Portfolio web developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and a dashboard with advanced statistics.',
    description: 'Fully autonomous development of a complete web portfolio application. The platform features a robust transaction management system, dynamic budgeting tools, customizable savings goals, and automated expense categorization. It also includes an interactive dashboard providing detailed analytics and advanced financial statistics for comprehensive tracking and decision-making.',
    tools: ['Next.js', 'Framer Motion', 'SCSS']
  },
  {
    image: '/project3.png',
    images: ['/project3.png', '/project2.png', '/project1.png'],
    title: 'FINANCE TRACKER',
    summary: 'Web app for personal finance management developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and an advanced statistics dashboard.',
    description: 'Fully autonomous development of a complete web application for personal finance management. The platform allows users to track and manage their transactions, define budgets, and set savings goals with precision. It also features automatic expense categorization, real-time data visualization, and an advanced analytics dashboard offering detailed financial insights and performance metrics.',
    tools: ['React', 'Node.js', 'Express', 'MongoDB']
  }
]
