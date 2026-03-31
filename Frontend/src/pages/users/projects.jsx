/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import axios from "../../axiosRoute";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import SEO from "../../components/SEO";
import SkeletonCard from "../../components/SkeletonCard";

import { useSocket } from "../../context/SocketContext";

/* =========================
        PROJECTS PAGE
========================= */
const Projects = () => {
  const { lastUpdate } = useSocket();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/project/viewall");
        const list = Array.isArray(res.data) ? res.data : [];
        setProjects(list);
        setFilteredProjects(list);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [lastUpdate]);

  /* ================= FILTERING ================= */
  useEffect(() => {
    const timeout = setTimeout(() => {
      let result = [...projects];

      if (searchTerm.trim()) {
        result = result.filter(
          (p) =>
            p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedTech && selectedTech !== "All") {
        result = result.filter((p) => p.techStack?.includes(selectedTech));
      }

      if (selectedType && selectedType !== "All") {
        result = result.filter((p) => (p.type || p.category) === selectedType);
      }



      setFilteredProjects(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedTech, selectedType, projects]);

  /* ================= OPTIONS ================= */
  const techOptions = useMemo(
    () => ["All", ...new Set(projects.flatMap((p) => p.techStack || []))],
    [projects]
  );

  const typeOptions = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.type || p.category).filter(Boolean))],
    [projects]
  );


  const featuredProjects = projects.filter(
    (p) => p.featured && String(p.featured).trim() !== ""
  );

  /* ================= IMAGE HELPER ================= */
  const getImageUrl = (project, type = "static") => {
    if (type === "gif" && project?.Url) return project.Url;
    return project?.imageUrl || project?.Url || project?.image || "/no-image.png";
  };

  /* ================= SUB-COMPONENT: PROJECT CARD ================= */
  const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        whileHover={{ y: -6 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600"
      >
        <div className="bg-gray-900 rounded-2xl overflow-hidden h-full flex flex-col">
          <div className="h-48 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={isHovered ? "gif" : "static"}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.8 }}
                src={getImageUrl(project, isHovered ? "gif" : "static")}
                loading="lazy"
                onError={(e) => {
                  if (e.target.src !== "/no-image.png") {
                    e.target.src = "/no-image.png";
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-500 scale-100 hover:scale-110"
                alt={project.title}
              />
            </AnimatePresence>

            {/* GIF Badge */}
            {project.Url && !isHovered && (
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-teal-400 border border-teal-500/30 uppercase">
                GIF Preview
              </span>
            )}
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-black text-lg">{project.title}</h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-3 flex-grow">
              {project.description}
            </p>

            {/* Result Highlight */}
            {project.Result && (
              <div className="mt-4 p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Result</p>
                <p className="text-sm text-gray-200 font-medium">{project.Result}</p>
              </div>
            )}

            <button
              onClick={() => setActiveProject(project)}
              className="mt-4 text-teal-400 underline text-sm font-bold text-left"
            >
              View Details →
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <SEO page="projects" />
      <ToastContainer position="top-center" theme="colored" />

      <main className="min-h-screen bg-gray-950 text-white font-['Outfit'] overflow-hidden">

        {/* ================= HEADER + FILTER BAR ================= */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">

          <h2 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">
            Projects
          </h2>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* ===== LEFT : HEADING ===== */}
            <div>
              <h1 className="text-2xl md:text-4xl font-black mb-2">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                  Projects
                </span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-xl">
                Real-world applications, experiments and production ready works.
              </p>
            </div>

            {/* ===== RIGHT : FILTERS ===== */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Tech Filter */}
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
              >
                {techOptions.map((t, i) => (
                  <option key={i} value={t} className="bg-gray-900">
                    {t === "All" ? "All Tech" : t}
                  </option>
                ))}
              </select>

            </div>



            <button
              onClick={() => {
                setSelectedTech("");
                setSelectedType("All");
                setSearchTerm("");
              }}
              className="px-4 py-2 rounded-xl text-sm font-bold border border-white/10 hover:bg-red-500"
            >
              Clear
            </button>
          </div>
        </section>


        {/* ================= CATEGORY CHIPS ================= */}
        <section className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap gap-3">
          {typeOptions.map((type, i) => (
            <button
              key={i}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition
                ${selectedType === type
                  ? "bg-gradient-to-r from-teal-500 to-purple-600 text-black border-transparent"
                  : "border-white/10 hover:bg-white/5"}
              `}
            >
              {type}
            </button>
          ))}



        </section>

        {/* ================= PROJECT GRID ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-gray-400 py-20 border border-white/10 rounded-2xl">
              No projects found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* ================= MODAL ================= */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden relative max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all border border-white/10 group"
                >
                  <FaTimes size={18} className="group-hover:rotate-90 transition-transform" />
                </button>

                <div className="relative h-48 md:h-72">
                  <img
                    src={getImageUrl(activeProject, "static")}
                    className="w-full h-full object-cover"
                    alt={activeProject.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeProject.techStack?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 rounded-full text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black">{activeProject.title}</h2>
                  <p className="text-gray-400 mt-4 leading-relaxed text-sm md:text-base">
                    {activeProject.description}
                  </p>

                  {activeProject.Result && (
                    <div className="mt-8 p-5 rounded-2xl bg-teal-500/5 border border-teal-500/10">
                      <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">Project Impact / Result</p>
                      <p className="text-gray-200 text-sm italic">"{activeProject.Result}"</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-white/10">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        <FaGithub size={20} /> Source Code
                      </a>
                    )}

                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <FaExternalLinkAlt size={18} /> Live Experience
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </>
  );
};

export default Projects;
