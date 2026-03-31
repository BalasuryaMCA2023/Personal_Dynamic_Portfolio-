/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import axios from "../../axiosRoute";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import SEO from "../../components/SEO";

/* ================= ICONS ================= */
import {
  Layers,
  Cpu,
  Terminal,
  Wrench,
  Code,
  Filter
} from "lucide-react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaWordpress,
  FaFigma,
  FaPython,
  FaJava,
  FaPhp,
  FaDatabase,
  FaCode
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiFirebase,
  SiPostman,
  SiDocker
} from "react-icons/si";

/* =========================
   AUTO SKILL ICON
========================= */
const getSkillIcon = (skillName = "") => {
  const name = skillName.toLowerCase();

  if (name.includes("html")) return FaHtml5;
  if (name.includes("css")) return FaCss3Alt;
  if (name.includes("javascript") || name.includes("js")) return FaJs;
  if (name.includes("react")) return FaReact;
  if (name.includes("node")) return FaNodeJs;
  if (name.includes("express")) return SiExpress;
  if (name.includes("mongo")) return SiMongodb;
  if (name.includes("mysql") || name.includes("database")) return FaDatabase;
  if (name.includes("git")) return FaGitAlt;
  if (name.includes("github")) return FaGithub;
  if (name.includes("bootstrap")) return FaBootstrap;
  if (name.includes("tailwind")) return SiTailwindcss;
  if (name.includes("next")) return SiNextdotjs;
  if (name.includes("typescript")) return SiTypescript;
  if (name.includes("redux")) return SiRedux;
  if (name.includes("firebase")) return SiFirebase;
  if (name.includes("postman")) return SiPostman;
  if (name.includes("docker")) return SiDocker;
  if (name.includes("figma")) return FaFigma;
  if (name.includes("wordpress")) return FaWordpress;
  if (name.includes("python")) return FaPython;
  if (name.includes("java")) return FaJava;
  if (name.includes("php")) return FaPhp;

  return FaCode;
};

/* =========================
   CATEGORY ICON
========================= */
const getCategoryIcon = (category = "") => {
  const c = category.toLowerCase();
  if (c.includes("front")) return Layers;
  if (c.includes("back")) return Cpu;
  if (c.includes("data")) return Terminal;
  if (c.includes("tool")) return Wrench;
  return Code;
};

/* =========================
   PROGRESS BAR
========================= */
const StyledLinearProgress = ({ value }) => {
  return (
    <div className="w-full mt-3">
      <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-purple-600"
        />
      </div>
    </div>
  );
};

import { useSocket } from "../../context/SocketContext";

/* =========================
         SKILLS PAGE
========================= */
const Skills = () => {
  const { lastUpdate } = useSocket();
  const [skills, setSkills] = useState([]);
  const [groupedSkills, setGroupedSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState("All");

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const applyFilter = useCallback((list) => {
    return list.filter(skill => {
      const percent = Number(skill.level) || 0;

      if (filterLevel === "Beginner") return percent <= 50;
      if (filterLevel === "Intermediate") return percent > 50 && percent < 75;
      if (filterLevel === "Advanced") return percent >= 75;
      return true;
    });
  }, [filterLevel]);

  const groupSkillsByCategory = useCallback((list) => {
    if (!Array.isArray(list)) return;

    const filtered = applyFilter(list);

    const grouped = filtered.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    setGroupedSkills(grouped);
  }, [applyFilter]);

  const fetchSkills = useCallback(async () => {
    try {
      const res = await axios.get("/skills/all");
      if (Array.isArray(res.data)) {
        setSkills(res.data);
        groupSkillsByCategory(res.data);
      }
    } catch (err) {
      console.error("Error fetching skills", err);
    } finally {
      setLoading(false);
    }
  }, [groupSkillsByCategory, lastUpdate]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    groupSkillsByCategory(skills);
  }, [filterLevel, skills, groupSkillsByCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-['Outfit']">
      <SEO page="skills" title="Skills | Portfolio" description="My technical skills and tools" />
      <ToastContainer position="top-center" theme="colored" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-24">

        <h2 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">
          Skills
        </h2>

        {/* ===== HEADER + FILTER ROW ===== */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            {/* LEFT: TITLE */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                  Skills
                </span>
              </h1>
              <p className="text-gray-400 max-w-md text-sm md:text-base">
                Technologies and tools I use to build scalable applications.
              </p>
            </div>

            {/* RIGHT: FILTER */}
            <div className="glass border border-white/10 rounded-2xl p-3 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                <Filter className="text-teal-400" size={18} />
                <span className="text-xs uppercase tracking-wider text-gray-400">
                  Level
                </span>
              </div>

              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition
            ${filterLevel === level
                      ? "bg-gradient-to-r from-teal-500 to-purple-600 text-black"
                      : "bg-white/5 hover:bg-white/10 text-white"}
          `}
                >
                  {level}
                </button>
              ))}
            </div>

          </div>
        </div>
        {/* ===== CATEGORY SECTIONS ===== */}
        <div className="flex flex-col gap-24">
          {Object.keys(groupedSkills).map((category) => {
            const CatIcon = getCategoryIcon(category);

            return (
              <div key={category}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600">
                    <CatIcon size={22} />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-wider">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedSkills[category].map((skill) => {
                    const percent = Number(skill.level) || 0;
                    const SkillIcon = getSkillIcon(skill.name);

                    return (
                      <motion.div
                        key={skill._id}
                        whileHover={{ y: -8 }}
                        className="relative rounded-2xl p-[1px] bg-gradient-to-r from-teal-500 to-purple-600"
                      >
                        <div className="bg-gray-900 rounded-2xl p-6 h-full">

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-white/5 text-teal-400">
                                <SkillIcon size={24} />
                              </div>
                              <div>
                                <h3 className="font-black">{skill.name}</h3>
                                <p className="text-xs text-gray-400">{skill.category}</p>
                              </div>
                            </div>

                            <span className="px-3 py-1 text-xs font-black rounded-full bg-gradient-to-r from-teal-500 to-purple-600 text-black">
                              {percent}%
                            </span>
                          </div>

                          <StyledLinearProgress value={percent} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Skills;
