/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const ExperienceCard = ({ experience }) => {
  const { title, location, type, company, duration, description } = experience;

  return (
    <motion.div
      className="rounded-2xl shadow-md p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{company} — {location}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">{type} | {duration}</p>
      <p className="text-sm text-gray-700 dark:text-gray-200">{description}</p>
    </motion.div>
  );
};

export default ExperienceCard;
