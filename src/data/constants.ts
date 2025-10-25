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
    images: ['/project1-1.png', '/project1-2.png', '/project1-3.png', '/project1-4.png', '/project1-5.png', '/project1-6.png', '/project1-7.png', 'project1-8.png'],
    title: 'FINANCE TRACKER',
    summary: 'Full-stack personal finance management web application — transaction management, budgets, savings objectives, automatic categorization, CSV import, and advanced analytics dashboard.',
    description: 'I developed a personal finance web app using TypeScript. It lets users add, edit, and delete their transactions, import data from CSV files, and attach images to each entry. The app helps manage budgets and savings goals, and it automatically sorts transactions by keywords. It also shows clear statistics with charts and summaries. Data is visualized with Recharts, while Zustand manages the app’s state. The project includes setup tools, database scripts, and file storage for uploaded images.',
    tools: [ 'React', 'TypeScript', 'Vite', 'TailwindCSS', 'Express', 'Prisma', 'SQLite', 'Recharts', 'Zustand', 'PapaParse' ]
  },
  {
    image: '/project2.png',
    images: ['/project2-1.png', '/project2-2.png', '/project2-3.png'],
    title: 'TROUVE ENTREPRISE',
    summary: 'Plateforme SaaS pour extraire, organiser et gérer des fiches d’entreprises (adresses, téléphones, sites, etc.) depuis des sources géographiques. Comprend un moteur d’extractions, historique d’imports, gestion des statuts et prise de notes collaborative.',
    description: 'Développement complet d’une application web dédiée à la recherche et à la gestion de prospects locaux. L’outil permet d’extraire en masse des lieux (export TSV), de les stocker et trier, d’afficher l’avancement des extractions en temps réel, de gérer des statuts (contacté, à contacter…), et d’ajouter des notes utilisateur par lieu. Intégration complète avec Supabase pour l’authentification, le stockage (fichiers TSV, avatars), et la base de données. Interface d’administration et pages marketing (landing, pricing). Gestion des profils utilisateurs, réinitialisation de mot de passe, et import/export pour workflows commerciaux.',
    tools: ['Nuxt 4', 'TypeScript', 'TailwindCSS', 'Supabase (auth, storage, db)', 'Pinia', 'Nuxt UI', 'Lucide (icônes)', 'ofetch/$fetch', 'Turf.js', 'reka-ui'] 
  },
  {
    image: '/project3.png',
    images: ['/project3-1.png', '/project3-2.png', '/project3-3.png'],
    title: 'SPORT MOBILE APP',
    summary: 'Portfolio web developed in total autonomy. Includes a transaction management system, budgets, savings objectives, automatic categorization and an advanced statistics dashboard.',
    description: 'Fully autonomous development of a complete web portfolio application. The platform features a robust transaction management system, dynamic budgeting tools, customizable savings goals, and automated expense categorization. It also includes an interactive dashboard providing detailed analytics and advanced financial statistics for comprehensive tracking and decision-making.',
    tools: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    image: '/project4.png',
    images: ['/project4-1.png', '/project4-2.png', '/project4-3.png', '/project4-4.png'],
    title: 'PORTFOLIO',
    summary: 'Portfolio built with React and TypeScript, showcasing personal projects with a modern and responsive interface. Includes an interactive gallery, smooth animations, and adaptive design.',
    description: 'Development of a modern and elegant personal portfolio highlighting my frontend development skills. The website offers a smooth user experience with gentle transitions and a clean design. Features include an interactive project gallery, a detailed about section, and a functional contact form. The site is fully responsive and performance-optimized.',
    tools: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Vite']
  }
]
