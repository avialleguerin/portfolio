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
    images: ['/project1-1.png', '/project1-2.png', '/project1-3.png', '/project1-4.png'],
    title: 'LABUAN BAJO EXPLORER',
    summary: 'Travel and tour booking website for boat trips in Indonesia.',
    description: 'During my trip to Indonesia, I met an amazing local guide in Labuan Bajo who took us on an unforgettable adventure aboard his fishing boat, exploring the multiple islands around Komodo National Park. Inspired by his passion and authenticity, I decided to help him share his story with the world by creating a dedicated website. The platform highlights his unique boat tours and multi-day island trips through a modern design.',
    tools: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
    link: 'https://labuan-bajo-explorer.alwaysdata.net'
  },
  {
    image: '/project2.png',
    images: ['/project2-1.png', '/project2-2.png', '/project2-3.png'],
    title: 'FINANCE TRACKER',
    summary: 'Full-stack personal finance management web application.',
    description: 'I developed a personal finance web app using TypeScript. It lets users add, edit, and delete their transactions, import data from CSV files, and attach images to each entry. The app helps manage budgets and savings goals, and it automatically sorts transactions by keywords. The project includes setup tools, database scripts, and file storage for uploaded images.',
    tools: [ 'React', 'TypeScript', 'Vite', 'TailwindCSS', 'Express', 'Prisma', 'SQLite', 'Recharts', 'Zustand', 'PapaParse' ],
    link: 'https://github.com/avialleguerin/finance-tracker'
  },
  {
    image: '/project3.png',
    images: ['/project3-1.png', '/project3-2.png', '/project3-3.png'],
    title: 'CRM',
    summary: 'SaaS platform to extract, organize, and manage business listings from geographic sources.',
    description: 'Development of a powerful prospecting tool designed to collect and manage business contacts from any sector within a chosen region. Built collaboratively with friends, the project is still in progress, with the goal of turning it into a commercial product. It lets users gather large lists of contacts quickly, track progress in real time, organize leads by status, and add notes — all with secure login and data storage.',
    tools: ['Nuxt', 'Vue.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
  },
  {
    image: '/project4.png',
    images: ['/project4-1.png', '/project4-2.png', '/project4-3.png', '/project4-4.png'],
    title: 'THIS PORTFOLIO',
    summary: 'Portfolio built with React and TypeScript, showcasing personal projects with a modern and responsive interface.',
    description: 'As you can see, this portfolio highlights my frontend skills through a clean, modern design and smooth interactions. It features an interactive project gallery, a clear presentation of my projects, and a functional contact form - all fully responsive and optimized for performance.',
    tools: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
    link: 'https://github.com/avialleguerin/portfolio'
  },
   // {
  //   image: '/project2.png',
  //   images: ['/project2-1.png', '/project2-2.png', '/project2-3.png'],
  //   title: 'SPORT MOBILE APP',
  //   summary: 'Mobile app to stay motivated with friends and track sports activities.',
  //   description: 'Complete development of a mobile application dedicated to managing sports activities. The tool allows users to track activities, share them with friends, and visualize them on a map.',
  //   tools: ['Nuxt 4', 'TypeScript', 'TailwindCSS', 'Supabase (auth, storage, db)', 'Pinia', 'Nuxt UI', 'Lucide (icônes)', 'ofetch/$fetch', 'Turf.js', 'reka-ui'],
  // },
]
