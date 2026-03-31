/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../axiosRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLinks from "../users/SocialMedia";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaBriefcase, FaTrophy } from "react-icons/fa";

import { useSocket } from "../../context/SocketContext";

const About = () => {
  const { lastUpdate } = useSocket();
  const [aboutData, setAboutData] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          aboutRes,
          projectRes,
          skillsRes,
          certRes,
          eduRes,
        ] = await Promise.all([
          axios.get("/about"),
          axios.get("/project/viewall"),
          axios.get("/skills/all"),
          axios.get("/certification"),
          axios.get("/education"),
        ]);

        const about = Array.isArray(aboutRes.data)
          ? aboutRes.data[0]
          : aboutRes.data;

        setAboutData(about || {});
        setProjects(projectRes.data || []);
        setSkills(skillsRes.data || []);
        setCertifications(certRes.data || []);
        setEducation(eduRes.data || []);
      } catch (err) {
        console.error("About fetch error:", err);
      }
    };

    fetchAll();
  }, [lastUpdate]);

  return (
    <>
      <SEO page="about" title="About Me | Portfolio" description="Know more about my journey and experience" />

      <main className="relative w-full min-h-screen bg-gray-950 text-white font-['Outfit'] overflow-hidden pt-24 pb-24">

        <ToastContainer position="top-center" theme="colored" />

        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">
              My Story
            </h2>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {aboutData?.name}
            </h1>

            <h3 className="text-xl text-purple-300 mb-6">
              {aboutData?.jobTitle}
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8 border-l-4 border-teal-500 pl-4 bg-white/5 py-3 rounded-r-xl">
              {aboutData?.description}
            </p>

            {/* ===== STATS ===== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

              <StatBox value={`${projects.length}+`} label="Projects" />
              <StatBox value={`${skills.length}+`} label="Skills" />
              <StatBox value={`${certifications.length}+`} label="Certifications" />
              <StatBox value="Fresher" label="Experience" small />

            </div>



            {/* CTA */}
            <div className="flex gap-6 mt-8">
              <Link to="/contact" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-xl">
                Hire Me
              </Link>
              <Link to="/skills" className="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-xl">
                View Skills
              </Link>
            </div>

          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-[260px] sm:w-[300px] md:w-[360px] lg:w-[420px] aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-purple-600 rounded-[2rem] blur-3xl opacity-40"></div>
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                <img
                  src={aboutData?.ImageUrl || aboutData?.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </motion.div>

        </section>

        {/* ================= TIMELINE ================= */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <h2 className="text-3xl font-black mb-12">Journey Timeline</h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Education */}
            <TimelineCard title="Education" icon={<FaGraduationCap />}>
              {education.map((edu, i) => (
                <TimelineItem
                  key={i}
                  title={edu.degree}
                  subtitle={edu.institution}
                  year={edu.graduationYear}
                />
              ))}
            </TimelineCard>

            {/* Experience */}
            <TimelineCard title="Experience" icon={<FaBriefcase />}>
              <TimelineItem
                title="Fresher"
                subtitle="Looking for Opportunities"
                year="2025"
              />
            </TimelineCard>

          </div>
        </section>

        {/* ================= ACHIEVEMENTS ================= */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <h2 className="text-3xl font-black mb-12">Achievements</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition">
                <FaTrophy className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold">{cert.title || "Certification"}</h4>
                <p className="text-sm text-gray-400">{cert.platform || "Platform"}</p>
              </div>
            ))}
          </div>
        </section>


      </main>
    </>
  );
};

/* ================= SMALL COMPONENTS ================= */

const StatBox = ({ value, label, small }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
    <p className={`font-black ${small ? "text-lg" : "text-2xl"} text-teal-400`}>{value}</p>
    <p className="text-xs text-gray-400 uppercase">{label}</p>
  </div>
);

const TimelineCard = ({ title, icon, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-6 text-teal-400">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const TimelineItem = ({ title, subtitle, year }) => (
  <div className="border-l-2 border-teal-500 pl-4">
    <h4 className="font-bold">{title}</h4>
    <p className="text-sm text-gray-400">{subtitle}</p>
    <span className="text-xs text-purple-400">{year}</span>
  </div>
);

export default About;
