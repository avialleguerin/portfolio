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
    images: ['/project1-1.png', '/project1-2.png', '/project1-3.png'],
    title: 'FINANCE TRACKER',
    summary: 'Full-stack personal finance management web application.',
    description: 'I developed a personal finance web app using TypeScript. It lets users add, edit, and delete their transactions, import data from CSV files, and attach images to each entry. The app helps manage budgets and savings goals, and it automatically sorts transactions by keywords. The project includes setup tools, database scripts, and file storage for uploaded images.',
    tools: [ 'React', 'TypeScript', 'Vite', 'TailwindCSS', 'Express', 'Prisma', 'SQLite', 'Recharts', 'Zustand', 'PapaParse' ]
  },
  {
    image: '/project2.png',
    images: ['/project2-1.png', '/project2-2.png', '/project2-3.png'],
    title: 'TRIBOS',
    summary: 'Mobile app to stay motivated with friends and track sports activities.',
    description: 'Complete development of a mobile application dedicated to managing sports activities. The tool allows users to track activities, share them with friends, and visualize them on a map.',
    tools: ['Nuxt 4', 'TypeScript', 'TailwindCSS', 'Supabase (auth, storage, db)', 'Pinia', 'Nuxt UI', 'Lucide (icônes)', 'ofetch/$fetch', 'Turf.js', 'reka-ui'] 
  },
  {
    image: '/project3.png',
    images: ['/project3-1.png', '/project3-2.png', '/project3-3.png'],
    title: 'FIND COMPANY',
    summary: 'SaaS platform to extract, organize, and manage business listings from geographic sources.',
    description: 'Development of a web app for finding and managing local business leads. Includes bulk location extraction (TSV export), real-time progress tracking, status management, user notes, and Supabase integration for authentication and storage.',
    tools: ['Nuxt 4', 'TypeScript', 'TailwindCSS', 'Supabase (auth, storage, db)', 'Pinia', 'Nuxt UI', 'Lucide (icônes)', 'ofetch/$fetch', 'Turf.js', 'reka-ui']
  },
  {
    image: '/project4.png',
    images: ['/project4-1.png', '/project4-2.png', '/project4-3.png', '/project4-4.png'],
    title: 'PORTFOLIO',
    summary: 'Portfolio built with React and TypeScript, showcasing personal projects with a modern and responsive interface.',
    description: 'Development of a modern and elegant personal portfolio highlighting my frontend development skills. The website offers a smooth user experience with gentle transitions and a clean design. Features include an interactive project gallery, a detailed about section, and a functional contact form. The site is fully responsive and performance-optimized.',
    tools: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Vite']
  },
  {
    image: '/project5.png',
    images: ['/project5-1.png', '/project5-2.png', '/project5-3.png', '/project5-4.png'],
    title: 'LABUAN BAJO EXPLORER',
    summary: 'Travel and tour booking website for boat trips in Indonesia.',
    description: 'I developed a travel website for a local boat tour operator in Labuan Bajo, Indonesia. The site showcases various trip packages to explore the beautiful islands around Komodo National Park. The website features responsive design with modern UI, interactive hero sections, tour comparison cards, and location mapping.',
    tools: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS']
  }
]
