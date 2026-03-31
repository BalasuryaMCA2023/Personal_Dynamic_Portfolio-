import React, { useEffect, useState, useMemo } from "react";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import axios from "../../axiosRoute";
import SocialLinks from "../../pages/users/SocialMedia"
import { Link } from "react-router-dom";
import { useSiteConfig } from "../../context/SiteConfigContext";

const Footer = ({ openResumeModal }) => {
  const [showScroll, setShowScroll] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const { navItems, visibleSections, siteTitle } = useSiteConfig();
  const [homeData, setHomeData] = useState({ fullName: "", role: "" });
  const [skills, setSkills] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    availability: "",
    email: ""
  });

  // ✅ SORT + FILTER NAV ITEMS (Consistency with Navbar)
  const sortedNav = useMemo(() => {
    return (navItems || [])
      .filter(item => item.isVisible !== false)
      .sort((a, b) => a.order - b.order);
  }, [navItems]);

  // ✅ SORT SKILLS (Consistency with Homepage Tech Expertise)
  const sortedSkills = useMemo(() => {
    return [...skills]
      .sort((a, b) => Number(b.level) - Number(a.level))
      .slice(0, 6);
  }, [skills]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [visitorsRes, homeRes, skillsRes] = await Promise.all([
          axios.get("/visitors/stats"),
          axios.get("/home"),
          axios.get("/skills/all")
        ]);

        setVisitorCount(visitorsRes.data.count || 0);

        setHomeData({
          fullName: homeRes.data.fullName || "",
          role: homeRes.data.role || ""
        });

        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
      } catch (err) {
        console.error("Footer general fetch error:", err);
      }
    };

    const fetchContact = async () => {
      try {
        const res = await axios.get("/contact");
        if (res.data) {
          setContactInfo({
            address: res.data.address || "",
            phone: res.data.phone || "",
            availability: res.data.availability || "Available for work",
            email: res.data.email || ""
          });
        }
      } catch (error) {
        console.error("Footer contact fetch error:", error);
      }
    };

    fetchAll();
    fetchContact();

    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-950 text-white border-t border-white/10 mt-2">

      {/* GLASS CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">

          {/* PROFILE */}
          <div>
            <h2 className="text-2xl font-black text-teal-400">
              {siteTitle || homeData.fullName || "BALASURYA"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {homeData.role || "Full Stack Developer"}
            </p>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-4 text-sm text-green-400">
              <FaCheckCircle />
              <span>{contactInfo.availability || "Available for work"}</span>
            </div>



            <div className="mt-5 text-sm text-gray-400 space-y-1">
              <h4 className="font-bold text-purple-400 mb-4">Address</h4>
              <p>{contactInfo.address}</p>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </div>

            <div className="mt-8">
              <SocialLinks position="start" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-bold text-purple-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {sortedNav.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    target={item.isExternal ? "_blank" : "_self"}
                    className="text-gray-400 hover:text-teal-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TECH STACK */}
          <div>
            <h3 className="font-bold text-purple-400 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {sortedSkills.map((skill) => {
                const Icon = FaIcons[skill.icon] || FaIcons.FaCode;
                return (
                  <span
                    key={skill._id}
                    className="flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-teal-400 transition cursor-default"
                  >
                    <Icon className="text-teal-400" />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* CONTACT / CTA */}
          <div>
            <h3 className="font-bold text-purple-400 mb-4">Let’s Work Together</h3>
            <p className="text-sm text-gray-400 mb-4">
              Have a project or idea? Let’s build something amazing.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="text-center px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold transition"
              >
                Hire Me
              </Link>

              <button
                onClick={openResumeModal}
                className="text-teal-400 hover:text-white underline underline-offset-4 font-bold transition"
              >
                Download CV
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} {siteTitle || homeData.fullName || "Your Name"}.
            Built with ❤️ using React, Node & Tailwind.
          </p>

          {/* Visitor Counter */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>
              Visits: <span className="font-bold text-teal-400">{visitorCount.toLocaleString()}</span>
            </span>
          </div>

        </div>
      </div>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-teal-500 hover:bg-teal-400 text-black shadow-xl transition"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
