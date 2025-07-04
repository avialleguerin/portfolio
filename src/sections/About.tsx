import { motion } from 'framer-motion';
import { Code, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Code Propre",
      description: "Passionné par l'écriture de code maintenable et bien structuré"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Expérience en travail d'équipe et méthodologies agiles"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Toujours à la recherche de nouvelles technologies et solutions"
    },
    {
      icon: Target,
      title: "Résultats",
      description: "Focus sur la livraison de projets de qualité dans les délais"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            À propos de <span className="gradient-text">moi</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Développeuse passionnée formée à l'École 42, avec une approche pratique du développement logiciel
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Mon parcours
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Diplômée de l'École 42, j'ai développé une solide expertise en programmation 
                à travers une pédagogie innovante basée sur l'apprentissage par projet et 
                l'entraide entre pairs.
              </p>
              
              <p>
                Cette formation unique m'a permis d'acquérir une autonomie remarquable, 
                une capacité d'adaptation rapide aux nouvelles technologies, et une 
                approche pragmatique de la résolution de problèmes.
              </p>
              
              <p>
                Passionné par le développement full-stack, j'aime créer des applications 
                complètes, de la conception de l'interface utilisateur à l'architecture 
                backend, en passant par l'optimisation des performances et la sécurité.
              </p>
            </div>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2+</div>
                <div className="text-sm text-gray-500">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-500">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-500">Technologies maîtrisées</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Highlights */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl card-hover"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <highlight.icon className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
