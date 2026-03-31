import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../axiosRoute';
import DarkModeToggle from "../../utills/DarkModeToggle";
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '../../context/SiteConfigContext';

const ClientNavbar = ({ showResumeModal, setShowResumeModal }) => {
  const { navItems, loading, siteTitle } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [availableResumes, setAvailableResumes] = useState([]);

  // ✅ Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get('/resume/all');
        const active = res?.data?.filter(r => r.isActive) || [];
        setAvailableResumes(active);
      } catch (err) {
        console.error("Resume fetch error:", err);
      }
    };

    fetchResumes();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ SORT + FILTER NAV ITEMS (CORE FIX)
  const sortedNav = useMemo(() => {
    return (navItems || [])
      .filter(item => item.isVisible !== false)
      .sort((a, b) => a.order - b.order);
  }, [navItems]);

  // Resume logic
  const handleResumeClick = (e) => {
    e.preventDefault();
    if (availableResumes.length > 0) {
      setShowResumeModal(true);
    } else {
      // Direct open fallback if no resumes in DB
      window.open("https://drive.google.com/file/d/1YnR_-enuhcues5uVdk60DRCulFpScj1z/view?usp=sharing", '_blank');
    }
  };

  const downloadResume = (url) => {
    window.open(url, '_blank');
    setShowResumeModal(false);
  };

  const navClass = scrolled
    ? "bg-gray-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2"
    : "bg-black/10 backdrop-blur-[2px] py-3";

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${navClass}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 no-underline">
            <span className="w-10 h-10 rounded-lg bg-teal-400 flex items-center justify-center text-sm text-black">
              [{siteTitle?.substring(0, 2).toUpperCase() || 'BS'}]
            </span>
            {siteTitle || "Portfolio"}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!loading && sortedNav.map((item) => {
              const isActive = location.pathname === item.path;

              return item.isExternal ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-2 rounded-lg text-sm font-medium no-underline
                  ${isActive
                    ? "text-purple-400 bg-white/10"
                    : "text-white/90 hover:text-purple-300 hover:bg-white/5"}`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium no-underline
                  ${isActive
                    ? "text-purple-400 bg-white/10"
                    : "text-white/90 hover:text-purple-300 hover:bg-white/5"}`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Resume Button */}
            <button
              onClick={handleResumeClick}
              className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white text-sm font-medium"
            >
              Hire Me
            </button>

            <DarkModeToggle />
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-gray-900/95 border-t border-white/10"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {!loading && sortedNav.map((item) => (

                  item.isExternal ? (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-300 hover:text-purple-400 text-lg"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-300 hover:text-purple-400 text-lg"
                    >
                      {item.label}
                    </Link>
                  )
                ))}

                <button
                  onClick={(e) => { setIsOpen(false); handleResumeClick(e); }}
                  className="text-white text-lg text-left"
                >
                  Hire Me
                </button>

                <DarkModeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-2xl font-black mb-6 text-center">Resume Preview</h3>

              <div className="space-y-4">
                {availableResumes.length > 0 ? (
                  availableResumes.map((resume) => (
                    <div key={resume._id} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-teal-400 font-bold mb-3 text-center uppercase tracking-widest text-xs">
                        {resume.role} Role
                      </p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => window.open(resume.viewUrl, '_blank')}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Resume
                        </button>
                        
                        <button
                          onClick={() => window.open(resume.downloadUrl, '_blank')}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-xl transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Resume
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-400 text-center text-sm mb-4">Click to view/download default resume</p>
                         <button
                          onClick={() => window.open("https://drive.google.com/file/d/1YnR_-enuhcues5uVdk60DRCulFpScj1z/view?usp=sharing", '_blank')}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-xl transition-all"
                        >
                          View Default CV
                        </button>
                    </div>
                )}
              </div>

              <button
                onClick={() => setShowResumeModal(false)}
                className="w-full mt-6 text-gray-500 hover:text-white transition-colors py-2 text-sm font-bold uppercase tracking-widest"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientNavbar;