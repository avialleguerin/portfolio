import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import type { Project } from '../types';

const Projects = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Ft_transcendence',
      description: 'Plateforme de jeu Pong en temps réel avec chat, tournois et système d\'amis. Projet final de l\'École 42 utilisant NestJS et React.',
      image: '/api/placeholder/600/400',
      technologies: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Docker'],
      githubUrl: 'https://github.com/avialleguerin/Transcendence',
      liveUrl: 'https://ft-transcendence-demo.com',
      featured: true
    },
    {
      id: '2',
      title: 'Minishell',
      description: 'Recréation d\'un shell Unix avec gestion des pipes, redirections, variables d\'environnement et signaux.',
      image: '/api/placeholder/600/400',
      technologies: ['C', 'Unix', 'Bash', 'Make'],
      githubUrl: 'https://github.com/avialleguerin/minishell',
      featured: true
    },
    {
      id: '3',
      title: 'Webserv',
      description: 'Serveur HTTP conforme RFC 7230 capable de servir du contenu statique et d\'exécuter du CGI.',
      image: '/api/placeholder/600/400',
      technologies: ['C++', 'HTTP', 'CGI', 'Nginx Config'],
      githubUrl: 'https://github.com/avialleguerin/WebServ',
      featured: true
    },
    {
      id: '4',
      title: 'Cub3D',
      description: 'Moteur de rendu 3D inspiré de Wolfenstein 3D utilisant le raycasting et la bibliothèque MLX.',
      image: '/api/placeholder/600/400',
      technologies: ['C', 'MLX', 'Raycasting', 'Mathematics'],
      githubUrl: 'https://github.com/justeozan/cub3D',
      featured: false
    },
    {
      id: '5',
      title: 'Push_swap',
      description: 'Algorithme de tri optimisé utilisant deux piles avec un nombre minimal d\'opérations.',
      image: '/api/placeholder/600/400',
      technologies: ['C', 'Algorithms', 'Data Structures'],
      githubUrl: 'https://github.com/avialleguerin/push_swap',
      featured: false
    },
    {
      id: '6',
      title: 'Portfolio Personnel',
      description: 'Site portfolio responsive avec animations, mode sombre et design moderne.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      githubUrl: 'https://github.com/avialleguerin/portfolio',
      liveUrl: 'https://votre-portfolio.com',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover ${
        featured ? 'lg:col-span-2' : ''
      }`}
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      <div className={`grid ${featured ? 'lg:grid-cols-2' : ''} gap-6`}>
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700">
          <div className={`${featured ? 'h-64' : 'h-48'} flex items-center justify-center`}>
            <div className="text-gray-400 text-lg font-medium">{project.title}</div>
          </div>
          {featured && (
            <div className="absolute top-4 left-4">
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star size={14} fill="currentColor" />
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
                Code
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Une sélection de mes projets les plus significatifs, de l'École 42 aux projets personnels
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </motion.div>

        {/* Other Projects */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Autres projets
          </h3>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Intéressé par mes autres projets ?
          </p>
          <motion.a
            href="https://github.com/avialleguerin?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            Voir tout sur GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
