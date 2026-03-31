import React, { useEffect, useState } from "react";
import axios from "../../axiosRoute";
import TypingHeading from "../../utills/TypingHeading";
import "../../App.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import * as FaIcons from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { useSiteConfig } from "../../context/SiteConfigContext";

/* =========================
   Animated Progress Bar
========================= */
const StyledLinearProgress = ({ value }) => {
  return (
    <div className="w-full mt-2">
      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-purple-600"
        />
      </div>
    </div>
  );
};

export default function Homepage({ openResumeModal }) {
  const [homeData, setHomeData] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [commits, setCommits] = useState(0);
  const { visibleSections } = useSiteConfig();

  const isVisible = (sectionName) => {
    const section = visibleSections.find(s => s.section === sectionName.toLowerCase());
    return section ? section.visible : true;
  };

  useEffect(() => {
    const fetchCriticalData = async () => {
      try {
        const homeRes = await axios.get("/home/");
        setHomeData(homeRes.data || {});
      } catch (error) {
        console.error("Error fetching critical home data:", error);
      }
    };

    const fetchOtherData = async () => {
      try {
        const results = await Promise.allSettled([
          axios.get("/skills/all"),
          axios.get("/project/viewall"),
          axios.get("/certification"),
          axios.get("/education"),
          axios.get("/services"),
          axios.get("/blogs"),
          axios.get("/github/total-commits")
        ]);

        results.forEach((res, index) => {
          if (res.status === 'fulfilled') {
            const data = res.value.data;
            switch (index) {
              case 0: setSkills(Array.isArray(data) ? data : []); break;
              case 1: setProjects(Array.isArray(data) ? data : []); break;
              case 2: setCertifications(Array.isArray(data) ? data : []); break;
              case 3: /* education */ break;
              case 4: setServices(Array.isArray(data) ? data : []); break;
              case 5: setBlogs(Array.isArray(data) ? data.slice(0, 3) : []); break;
              case 6: setCommits(data.totalCommits || 0); break;
            }
          }
        });
      } catch (error) {
        console.error("Error fetching secondary homepage data:", error);
      }
    };

    fetchCriticalData();
    fetchOtherData();
  }, []);

  const projectCount = projects.length;
  const certificationCount = certifications.length;
  const technologiesCount = skills.length;
  const commitsCount = commits;
  const experienceLabel = homeData.experienceLevel || "Fresher";

  return (
    <>
      <SEO
        page="home"
        title="Home | My Portfolio"
        description={homeData.description || "My personal portfolio"}
      />

      <main className="relative min-h-screen w-full bg-gray-950 text-white font-['Outfit'] overflow-hidden">

        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-20 min-h-[95vh] flex items-center mt-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-black">
                Hey, I'm{" "}
                <span className="text-teal-400">{homeData.fullName}</span>
              </h2>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <TypingHeading text={homeData.role || "Software Developer"} />
                <span className="block text-gray-400 text-xl md:text-2xl mt-2">
                  from {homeData.tagline || "India"}
                </span>
              </h1>

              <p className="text-gray-400 max-w-xl text-base md:text-lg">
                {homeData.description}
              </p>

              <div className="inline-flex items-center gap-3 font-mono text-green-400 bg-white/5 py-2 px-4 rounded-lg border border-white/10">
                <span className="opacity-50">#</span>
                {homeData.headingline || "i build digital products"}
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                <button
                  onClick={openResumeModal}
                  className="px-8 py-4 bg-teal-500 hover:bg-teal-400 transition text-black font-black rounded-xl border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center gap-2 group"
                >
                  Hire Me
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={openResumeModal}
                  className="bg-transparent text-gray-400 hover:text-teal-400 underline decoration-teal-400/30 underline-offset-8 font-black transition-all hover:decoration-teal-400"
                >
                  View My CV
                </button>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mt-12 lg:mt-0"
            >
              {homeData.heroImageUrl && isVisible('home') && (
                <div className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:max-w-sm xl:max-w-md aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-purple-500/20 rounded-[2.5rem] blur-3xl"></div>

                  <div className="relative h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                    <img
                      src={homeData.heroImageUrl}
                      alt="Hero"
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        {isVisible('services') && services.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-black">Our Services</h2>
                <p className="text-gray-500 mt-2">What I can do for you</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <motion.div
                  key={service._id}
                  whileHover={{ y: -8 }}
                  className="p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600"
                >
                  <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col justify-between transition hover:bg-white/5">
                    <div>
                      <div className="text-teal-400 mb-4 text-4xl">
                        <i className={service.icon || "ri-function-line"}></i>
                      </div>
                      <h4 className="font-black text-xl mb-2">{service.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SKILLS PREVIEW ================= */}
        {isVisible('skills') && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">

            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-black">Technical Expertise</h2>
                <p className="text-gray-500 mt-2">My go-to tech stack</p>
              </div>
              <Link
                to="/skills"
                className="flex items-center gap-2 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5"
              >
                View All <ChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...skills]
                .sort((a, b) => Number(b.level) - Number(a.level))
                .slice(0, 6)
                .map((skill) => {
                  const Icon = FaIcons[skill.icon] || FaIcons.FaCode;
                  const percent = Number(skill.level) || 0;

                  return (
                    <motion.div
                      key={skill._id}
                      whileHover={{ y: -8 }}
                      className="p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600"
                    >
                      <div className="bg-gray-900 rounded-2xl p-6 h-full">

                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl text-teal-400">
                              <Icon size={24} />
                            </div>
                            <div>
                              <h4 className="font-black">{skill.name}</h4>
                              <p className="text-xs text-gray-400">
                                {skill.category}
                              </p>
                            </div>
                          </div>

                          <span className="px-3 py-1 text-xs font-black rounded-full bg-gradient-to-r from-teal-500 to-purple-600">
                            {percent}%
                          </span>
                        </div>

                        <StyledLinearProgress value={percent} />
                      </div>
                    </motion.div>
                  );
                })}
            </div>

          </section>
        )}

        {/* ================= BLOG PREVIEW ================= */}
        {isVisible('blogs') && blogs.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-black">Latest Insights</h2>
                <p className="text-gray-500 mt-2">Thoughts and tutorials</p>
              </div>
              <Link
                to="/blogs"
                className="flex items-center gap-2 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5"
              >
                View Blog <ChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <motion.article
                  key={blog._id}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all"
                >
                  <Link to={`/blog/${blog.slug}`}>
                    <div className="h-48 overflow-hidden">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-purple-600/20" />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span>{blog.views} views</span>
                      </div>
                      <h4 className="font-black text-xl mb-3 line-clamp-2">{blog.title}</h4>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                        {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                      </p>
                      <span className="text-teal-400 text-sm font-bold flex items-center gap-1 group">
                        Read More <FaIcons.FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* ================= STATS SECTION ================= */}
        {isVisible('stats') && (
          <section className="max-w-[1400px] mx-auto px-6 mb-24">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-black">Career Highlights</h2>
                <p className="text-gray-500 mt-2">Key achievements & milestones</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">

              <div>
                <p className="text-3xl font-black text-teal-400">{projectCount}+</p>
                <p className="text-xs uppercase text-gray-400">Projects Completed</p>
              </div>

              <div>
                <p className="text-3xl font-black text-purple-400">{certificationCount}+</p>
                <p className="text-xs uppercase text-gray-400">Certifications</p>
              </div>

              <div>
                <p className="text-3xl font-black text-teal-400">{technologiesCount}+</p>
                <p className="text-xs uppercase text-gray-400">Technologies Mastered</p>
              </div>

              <div>
                <p className="text-2xl font-black text-purple-400">{experienceLabel}</p>
                <p className="text-xs uppercase text-gray-400">Experience</p>
              </div>

              <div>
                <p className="text-3xl font-black text-teal-400">{commitsCount}+</p>
                <p className="text-xs uppercase text-gray-400">Commits</p>
              </div>

            </div>
          </section>
        )}

      </main>
    </>
  );
}
