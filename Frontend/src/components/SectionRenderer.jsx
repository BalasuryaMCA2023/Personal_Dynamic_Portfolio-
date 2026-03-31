import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load actual section components
const Hero = lazy(() => import('../pages/users/homepage')); // Or a separate Hero component
const About = lazy(() => import('../pages/users/about'));
const Skills = lazy(() => import('../pages/users/skills'));
const Projects = lazy(() => import('../pages/users/projects'));
const Experience = lazy(() => import('../pages/users/experience'));
const Education = lazy(() => import('../pages/users/EducationAndCertificationPage'));
const Services = lazy(() => import('./Services'));
const BlogList = lazy(() => import('../pages/users/BlogList'));
const Contact = lazy(() => import('../pages/users/contact'));

const LoadingFallback = () => (
  <div className="py-20 flex justify-center">
    <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const SectionRenderer = ({ section }) => {
  const { type, title, content } = section;

  const renderComponent = () => {
    switch (type) {
      case 'hero':
        // Hero is usually handled at the top, but can be dynamic
        return null; 
      case 'about':
        return <About title={title} />;
      case 'skills':
        return <Skills title={title} />;
      case 'projects':
        return <Projects title={title} />;
      case 'experience':
        return <Experience title={title} />;
      case 'education':
        return <Education title={title} />;
      case 'services':
        return <Services title={title} />;
      case 'blogs':
        return <BlogList title={title} />;
      case 'contact':
        return <Contact title={title} />;
      case 'stats':
        // Placeholder for stats component if it exists
        return <div className="py-20 text-center text-gray-500">Stats Section: {title}</div>;
      default:
        return (
          <div className="py-20 text-center text-gray-400">
            Section Type "{type}" not yet implemented.
          </div>
        );
    }
  };

  const component = renderComponent();
  if (!component) return null;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id={type}
        className="section-wrapper"
      >
        {component}
      </motion.section>
    </Suspense>
  );
};

export default SectionRenderer;
