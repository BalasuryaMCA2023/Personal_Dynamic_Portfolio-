/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import axios from "../../axiosRoute";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  FaGraduationCap,
  FaCertificate,
  FaUniversity,
  FaCalendarAlt,
  FaAward,
  FaExternalLinkAlt,
  FaFilter,
} from "react-icons/fa";
import SEO from "../../components/SEO";
import { formatCredentialUrl } from "../../utills/url_helper";

const ITEMS_PER_PAGE = 6;

const EducationCertificationTabs = () => {
  const [activeTab, setActiveTab] = useState("education");
  const [certifications, setCertifications] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduRes, certRes] = await Promise.all([
          axios.get("/education"),
          axios.get("/certification"),
        ]);
        setEducation(Array.isArray(eduRes.data) ? eduRes.data : []);
        setCertifications(Array.isArray(certRes.data) ? certRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ================= FILTERED DATA ================= */
  const filteredEducation = useMemo(() => {
    if (!filterValue) return education;
    return education.filter((e) => e.institution === filterValue);
  }, [education, filterValue]);

  const filteredCertifications = useMemo(() => {
    if (!filterValue) return certifications;
    return certifications.filter((c) => c.issuer === filterValue);
  }, [certifications, filterValue]);

  const data = activeTab === "education" ? filteredEducation : filteredCertifications;

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterValue]);

  /* ================= OPTIONS ================= */
  const filterOptions =
    activeTab === "education"
      ? ["All", ...new Set(education.map((e) => e.institution))]
      : ["All", ...new Set(certifications.map((c) => c.issuer))];

  return (
    <>
      <SEO page="education" title="Education & Certifications | Portfolio" />
      <ToastContainer position="top-center" theme="colored" />

      <main className="min-h-screen bg-gray-950 text-white font-['Outfit']">

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-24">

          <h2 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">
            {activeTab === "education" ? "Education" : "Certifications"}
          </h2>



          {/* ===== HEADER + FILTER ROW ===== */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-16">

            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl font-black leading-tight"> 
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                  {activeTab === "education" ? "Education" : "Certifications"}
                </span>
              </h1>
              <p className="text-gray-400 max-w-xl mt-4 text-base md:text-lg mx-auto lg:mx-0">
                Academic background & professional achievements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full lg:w-auto">

              {/* TAB SWITCH */}
              <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("education")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition ${activeTab === "education"
                    ? "bg-teal-500 text-black shadow-lg shadow-teal-500/20"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  <FaGraduationCap className="text-lg" />
                  <span className="inline">Education</span>
                </button>
                <button
                  onClick={() => setActiveTab("certifications")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition ${activeTab === "certifications"
                    ? "bg-purple-500 text-black shadow-lg shadow-purple-500/20"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  <FaCertificate className="text-lg" />
                  <span className="inline">Certifications</span>
                </button>
              </div>

              {/* FILTER */}
              <div className="relative w-full sm:w-64">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" />
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value === "All" ? "" : e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                >
                  {filterOptions.map((opt, i) => (
                    <option key={i} value={opt} className="bg-gray-900">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* ===== GRID ===== */}
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading...</div>
          ) : paginatedData.length === 0 ? (
            <div className="text-center text-gray-400 py-20 border border-white/10 rounded-xl">
              No records found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              <AnimatePresence>
                {paginatedData.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    whileHover={{ y: -6 }}
                    className="p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600"
                  >
                    <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col">

                      {activeTab === "education" ? (
                        <>
                          <FaUniversity className="text-2xl text-teal-400 mb-4" />
                          <h3 className="font-black text-lg">{item.degree}</h3>
                          <p className="text-teal-400 text-sm">{item.fieldOfStudy}</p>
                          <p className="text-gray-400 text-sm mt-1">{item.institution}</p>
                          <p className="text-xs text-gray-500 mt-4">
                            {item.graduationYear}
                          </p>
                        </>
                      ) : (
                        <>
                          <FaAward className="text-2xl text-purple-400 mb-4" />
                          <h3 className="font-black text-lg">{item.title}</h3>
                          <p className="text-purple-400 text-sm">{item.issuer}</p>
                          <p className="text-xs text-gray-500 mt-4 flex items-center gap-2">
                            <FaCalendarAlt /> {new Date(item.issueDate).toLocaleDateString()}
                          </p>

                          {item.credentialURL && (
                            <a
                              href={formatCredentialUrl(item.credentialURL, item.urlType)}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-auto pt-4 text-sm text-gray-400 hover:text-white flex items-center gap-2"
                            >
                              View Certificate <FaExternalLinkAlt />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

            </div>
          )}

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-16">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition ${currentPage === i + 1
                    ? "bg-gradient-to-r from-teal-500 to-purple-600 text-black"
                    : "border border-white/10 hover:bg-white/5"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default EducationCertificationTabs;
