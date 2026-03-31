import React from 'react';
import { useLocation } from 'react-router-dom';
import SocialLinks from '../../pages/users/SocialMedia';

const FloatingSocialMedia = () => {
  const location = useLocation();

  // Do not show on contact page
  if (location.pathname === '/contact' || location.pathname === '/contact/') {
    return null;
  }

  return (
    <>
      {/* Mobile View - Horizontal Bottom Bar */}
      <div className="md:hidden fixed z-40 
        bottom-0 left-0 w-full p-2 bg-gray-900/90 backdrop-blur-md border-t border-white/10 
        overflow-x-auto scrollbar-hide
        transition-all duration-300">
        <div className="flex justify-start sm:justify-center items-center gap-2 min-w-max px-4 h-14">
          <SocialLinks layout="horizontal" />
        </div>
      </div>

      {/* Desktop View - Vertical Line View on Right */}
      <div className="hidden md:flex fixed z-40 bottom-0 right-8 flex-col items-center gap-6 transition-all duration-300">
        <SocialLinks layout="vertical" />
        {/* The Line */}
        <div className="w-[2px] h-24 bg-gradient-to-t from-transparent to-teal-500 rounded-full"></div>
      </div>
    </>
  );
};

export default FloatingSocialMedia;
