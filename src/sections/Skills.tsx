import { motion } from 'framer-motion';
import { Code, Database, Server, Settings, Zap, Globe } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Globe,
      color: 'blue',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Next.js', level: 80 }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'green',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'NestJS', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'C/C++', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'RESTful APIs', level: 88 }
      ]
    },
    {
      title: 'Base de données',
      icon: Database,
      color: 'purple',
      skills: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'Redis', level: 70 },
        { name: 'SQL', level: 85 },
        { name: 'Prisma', level: 75 }
      ]
    },
    {
      title: 'DevOps & Outils',
      icon: Settings,
      color: 'orange',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'Git', level: 95 },
        { name: 'Linux', level: 90 },
        { name: 'Nginx', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'AWS', level: 60 }
      ]
    }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800'
      }
    };
    return colors[color as keyof typeof colors][type];
  };

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

  const SkillBar = ({ skill, color }: { skill: { name: string; level: number }; color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full ${getColorClasses(color, 'bg').replace('dark:bg-', 'dark:bg-').replace('/30', '')}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Écriture de code maintenable et bien documenté'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimisation et bonnes pratiques de développement'
    },
    {
      icon: Settings,
      title: 'Polyvalence',
      description: 'Adaptation rapide aux nouvelles technologies'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">Compétences</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies et outils que j'utilise pour créer des solutions innovantes
          </p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 ${getColorClasses(category.color, 'border')} card-hover`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 ${getColorClasses(category.color, 'bg')} rounded-lg flex items-center justify-center mb-4`}>
                <category.icon className={getColorClasses(category.color, 'text')} size={24} />
              </div>
              
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
                {category.title}
              </h3>
              
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} color={category.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="text-center p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* École 42 mention */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text">
            Formation École 42
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            La pédagogie unique de l'École 42 m'a permis de développer une expertise 
            technique solide, une capacité d'apprentissage autonome exceptionnelle, 
            et un esprit collaboratif à travers des projets en peer-to-peer.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
