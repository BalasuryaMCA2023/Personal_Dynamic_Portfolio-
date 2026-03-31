/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <motion.div data-aos="fade-up"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl shadow-lg p-4 bg-white dark:bg-gray-800 hover:shadow-2xl transition"
    >
      {project.featured === 'true' && (
        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
          Featured
        </span>
      )}

      <img src={project.image} alt={project.title} className="rounded-lg w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {project.techStack.map((tech, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs font-medium">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex justify-between text-sm">
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
          <Github size={16} /> GitHub
        </a>
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400">
          <ExternalLink size={16} /> Live
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
