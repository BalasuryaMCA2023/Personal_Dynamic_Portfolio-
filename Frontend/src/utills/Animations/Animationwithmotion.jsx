/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";


const Animation = ({ children }) => {

  
    // animationVariants.js
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  
  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
