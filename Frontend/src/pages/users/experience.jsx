/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "../../axiosRoute";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaFilter
} from "react-icons/fa";
import SEO from "../../components/SEO";

/* =========================
   Animated Counter
========================= */
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    if (end === 0) return;

    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

/* =========================
         EXPERIENCE
========================= */
const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const [typeFilter, setTypeFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/experience");
        const data = Array.isArray(res.data) ? res.data : [];
        setExperiences(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  /* =========================
     FILTER LOGIC
  ========================= */
  useEffect(() => {
    let data = [...experiences];

    if (typeFilter !== "All") {
      data = data.filter(e => e.type === typeFilter);
    }

    if (yearFilter !== "All") {
      data = data.filter(e => {
        const year =
          new Date(e.date || e.createdAt || "2020").getFullYear().toString();
        return year === yearFilter;
      });
    }

    setFiltered(data);
  }, [typeFilter, yearFilter, experiences]);

  const typeOptions = ["All", ...new Set(experiences.map(e => e.type).filter(Boolean))];
  const yearOptions = ["All", ...new Set(
    experiences.map(e =>
      new Date(e.date || e.createdAt || "2020").getFullYear().toString()
    )
  )];

  return (
    <>
      <SEO page="experience" title="Experience | Portfolio" description="My professional journey and experience." />
      <ToastContainer position="top-center" theme="colored" />

      <main className="min-h-screen bg-gray-950 text-white font-['Outfit']">

        {/* ================= HEADER + FILTER BAR ================= */}
        <section className="pt-24 pb-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 md:items-end md:justify-between">

            {/* LEFT: TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-teal-400 uppercase tracking-widest text-xs font-bold mb-2">
                My Journey
              </p>

              <h1 className="text-3xl md:text-4xl font-black">
                Professional{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                  Experience
                </span>
              </h1>

              <p className="text-gray-400 mt-2 max-w-md text-sm md:text-base">
                Internships, training and work experience timeline.
              </p>
            </motion.div>

            {/* RIGHT: FILTERS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 w-full md:w-auto"
            >
              {/* Type Filter */}
              <div className="flex items-center gap-3">
                <FaFilter className="text-teal-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                >
                  {typeOptions.map((t, i) => (
                    <option key={i} value={t} className="bg-gray-900">
                      {t === "All" ? "All Types" : t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-teal-400" />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                >
                  {yearOptions.map((y, i) => (
                    <option key={i} value={y} className="bg-gray-900">
                      {y === "All" ? "All Years" : y}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

          </div>
        </section>


        {/* ================= TIMELINE ================= */}
        <section className="max-w-6xl mx-auto px-6 pb-32">

          <div className="relative">

            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500 to-purple-600"></div>

            <div className="flex flex-col gap-16">

              {loading ? (
                <div className="flex flex-col gap-16">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className={`relative flex w-full ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-800 animate-pulse"></div>
                      <div className="w-full md:w-[45%] ml-10 md:ml-0 p-[1px] rounded-2xl bg-white/5 animate-pulse">
                        <div className="bg-gray-900/50 rounded-2xl p-6 h-48"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length > 0 ? filtered.map((exp, index) => {
                const isLeft = index % 2 === 0;
                const isOpen = expanded === index;
                const durationNumber = parseInt(exp.duration) || 0;

                return (
                  <motion.div
                    key={exp._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-teal-500 to-purple-600"></div>

                    {/* Card */}
                    <div className="w-full md:w-[45%] ml-10 md:ml-0 p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600">
                      <div className="bg-gray-900 rounded-2xl p-5 md:p-6">

                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 bg-white/5 rounded-lg">
                            <FaBriefcase className="text-teal-400" />
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 text-black">
                            {exp.type || "Experience"}
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-black mb-1">
                          {exp.title}
                        </h3>

                        <p className="text-purple-300 text-sm font-medium mb-3">
                          {exp.company}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-teal-400" />
                            {exp.duration} (<Counter value={durationNumber} />)
                          </div>
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-teal-400" />
                            {exp.location}
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                          {isOpen ? exp.description : exp.description?.slice(0, 120) + "..."}
                        </p>

                        {exp.description?.length > 120 && (
                          <button
                            onClick={() => setExpanded(isOpen ? null : index)}
                            className="mt-3 flex items-center gap-2 text-teal-400 hover:text-white font-bold text-xs"
                          >
                            {isOpen ? "Show Less" : "Read More"}
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        )}

                      </div>
                    </div>

                  </motion.div>
                );
              }) : (
                <div className="text-center text-gray-400 py-20">
                  No experience found.
                </div>
              )}

            </div>
          </div>

        </section>

      </main>
    </>
  );
};

export default ExperienceSection;
