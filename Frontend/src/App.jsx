import React, { useEffect, useState, Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import useAosInit from './utills/Animations/Aos'
import 'aos/dist/aos.css';

import { motion, AnimatePresence } from 'framer-motion';

// Layout components (Keep static as they are part of the shell)
import Navbar from './components/Layouts/navbar';
import Footer from './components/Layouts/footer';
import FloatingSocialMedia from './components/Layouts/FloatingSocialMedia';
import ScrollToTop from './utills/ScrollToTop';
import ThemeLayout from "./components/Layouts/Theme Layout";
import VisibilityGuard from './components/VisibilityGuard';

// Lazy load pages and heavy components
const ErrorPage = lazy(() => import('./components/ErrorPage'));
const Services = lazy(() => import('./components/Services'));
const Homepage = lazy(() => import('./pages/users/homepage'));
const About = lazy(() => import('./pages/users/about'));
const Projects = lazy(() => import('./pages/users/projects'));
const Experience = lazy(() => import('./pages/users/experience'));
const Skills = lazy(() => import('./pages/users/skills'));
const Contact = lazy(() => import('./pages/users/contact'));
const CertificationAndEducationCard = lazy(() => import('./pages/users/EducationAndCertificationPage'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'));
const ResumeViewer = lazy(() => import('./pages/users/resume-viewer'));
const BlogList = lazy(() => import('./pages/users/BlogList'));
const BlogDetail = lazy(() => import('./pages/users/BlogDetail'));
const CustomPage = lazy(() => import('./pages/users/CustomPage'));
import 'react-icons/fa';

import axios from './axiosRoute';
import { useSiteConfig } from './context/SiteConfigContext';

function App() {
  useAosInit();
  const { maintenanceMode, loading: configLoading } = useSiteConfig();
  const [showResumeModal, setShowResumeModal] = useState(false);

  const location = useLocation();


  // Visitor Tracking Logic
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        let sessionId = localStorage.getItem('visitorSessionId');
        if (!sessionId) {
          sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitorSessionId', sessionId);
        }
        await axios.post('/visitors/track', { sessionId });
      } catch (error) {
        console.error("Analytics Error:", error);
      }
    };
    trackVisitor();
  }, []);

  if (configLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Maintenance Check: If ON and NOT on login page AND NOT logged in -> Show Maintenance

  // 1. Check for token in URL (Bypass mechanism)
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get('token');

  if (urlToken) {
    localStorage.setItem('token', urlToken);
    // Remove token from URL for cleaner look
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const token = localStorage.getItem('token');

  // 2. If Maintenance is ON and no valid token -> Show Maintenance Page
  if (maintenanceMode && !token) {
    return <MaintenancePage />;
  }

  return (

    <>

      <ThemeLayout>


        <ScrollToTop />

        <ToastContainer position="top-right" limit={2} newestOnTop autoClose={3000} closeButton={false} closeOnClick={false} />

        <Navbar showResumeModal={showResumeModal}
          setShowResumeModal={setShowResumeModal} />

        <FloatingSocialMedia />

        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <VisibilityGuard section="home">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Homepage openResumeModal={() => setShowResumeModal(true)} />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/home" element={
              <VisibilityGuard section="home">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Homepage openResumeModal={() => setShowResumeModal(true)} />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/about" element={
              <VisibilityGuard section="about">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <About />
                </motion.div>
              </VisibilityGuard>
            } />

            <Route path="/services" element={
              <VisibilityGuard section="services">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Services />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/project" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={
              <VisibilityGuard section="project">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Projects />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/education" element={
              <VisibilityGuard section="education">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CertificationAndEducationCard />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path='/experience' element={
              <VisibilityGuard section="experience">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Experience />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/skills" element={
              <VisibilityGuard section="skills">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Skills />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/contact" element={
              <VisibilityGuard section="contact">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Contact openResumeModal={() => setShowResumeModal(true)} />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/resume-viewer" element={
              <VisibilityGuard section="resume">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResumeViewer />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/blogs" element={
              <VisibilityGuard section="blogs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogList />
                </motion.div>
              </VisibilityGuard>
            } />
            <Route path="/blog/:slug" element={
              <VisibilityGuard section="blogs">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogDetail />
                </motion.div>
              </VisibilityGuard>
            } />

            {/* Dynamic Pages */}
            <Route path="/:slug" element={
              <VisibilityGuard>
                <CustomPage />
              </VisibilityGuard>
            } />

            <Route path='/error' element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>


        <Footer openResumeModal={() => setShowResumeModal(true)} />


        </ThemeLayout>


    </>
  )
}

export default App;
