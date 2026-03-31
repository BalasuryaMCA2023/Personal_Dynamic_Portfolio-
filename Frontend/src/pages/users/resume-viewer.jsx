import React, { useState, useEffect } from 'react';
import axios from '../../axiosRoute';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import SEO from '../../components/SEO';

const ResumeViewer = () => {
    const [about, setAbout] = useState({});
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [contact, setContact] = useState({});
    const [projects, setProjects] = useState([]);
    const [resumeUrl, setResumeUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aboutRes, skillsRes, expRes, eduRes, contactRes, projectsRes, resumeRes] = await Promise.all([
                    axios.get('/about'),
                    axios.get('/skills/all'),
                    axios.get('/experience'),
                    axios.get('/education'),
                    axios.get('/contact'),
                    axios.get('/project/viewall'),
                    axios.get('/resume/all'),
                ]);

                // About data is typically an array from the backend
                const aboutData = Array.isArray(aboutRes.data) ? aboutRes.data[0] : aboutRes.data;
                setAbout(aboutData || {});
                setSkills(skillsRes.data || []);
                setExperience(expRes.data || []);
                setEducation(eduRes.data || []);
                setContact(contactRes.data || {});
                setProjects(Array.isArray(projectsRes.data) ? projectsRes.data : []);

                // Get active resume
                const activeResume = Array.isArray(resumeRes.data) ? resumeRes.data.find(r => r.isActive) : null;
                if (activeResume) setResumeUrl(activeResume.downloadUrl);
            } catch (error) {
                console.error("Error fetching resume data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <SEO title="Interactive Resume | Portfolio" description="Digital version of my professional resume." />
            <main className="min-h-screen bg-gray-950 pt-24 pb-20 px-6 font-['Outfit']">
                <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <header className="bg-gray-900 text-white p-10 md:p-16">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-black mb-4"
                                >
                                    {about.name || 'Your Name'}
                                </motion.h1>
                                <motion.h2
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl md:text-2xl text-teal-400 font-bold"
                                >
                                    {about.jobTitle || 'Professional Title'}
                                </motion.h2>
                            </div>

                            {resumeUrl && (
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-black font-black rounded-xl hover:bg-teal-400 transition shadow-lg shadow-teal-500/20 w-fit"
                                >
                                    <FaDownload /> Download PDF
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                            {contact.email && <div className="flex items-center gap-2 font-medium"><FaEnvelope /> {contact.email}</div>}
                            {contact.phone && <div className="flex items-center gap-2 font-medium"><FaPhone /> {contact.phone}</div>}
                            {contact.address && <div className="flex items-center gap-2 font-medium"><FaMapMarkerAlt /> {contact.address}</div>}
                            <div className="flex items-center gap-2 font-medium"><FaGlobe /> {window.location.origin}</div>
                        </div>
                    </header>

                    <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-12">
                            {/* Summary */}
                            <section>
                                <h3 className="text-2xl font-black border-b-4 border-teal-500 inline-block mb-6 pb-1">Professional Summary</h3>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {about.description || 'Professional summary loading...'}
                                </p>
                            </section>

                            {/* Experience */}
                            <section>
                                <h3 className="text-2xl font-black border-b-4 border-teal-500 inline-block mb-8 pb-1">Work Experience</h3>
                                <div className="space-y-8">
                                    {experience.map((exp, i) => (
                                        <div key={i} className="relative pl-6 border-l-2 border-gray-200">
                                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-teal-500"></div>
                                            <h4 className="text-xl font-bold">{exp.role}</h4>
                                            <p className="text-teal-600 font-bold mb-2">{exp.company} | {exp.duration}</p>
                                            <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h3 className="text-2xl font-black border-b-4 border-teal-500 inline-block mb-8 pb-1">Education</h3>
                                <div className="space-y-8">
                                    {education.map((edu, i) => (
                                        <div key={i} className="relative pl-6 border-l-2 border-gray-200">
                                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500"></div>
                                            <h4 className="text-xl font-bold">{edu.degree}</h4>
                                            <p className="text-purple-600 font-bold mb-2">{edu.institution} | {edu.duration}</p>
                                            <p className="text-gray-600 leading-relaxed">{edu.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            {projects.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-black border-b-4 border-teal-500 inline-block mb-8 pb-1">Key Projects</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {projects.slice(0, 4).map((project, i) => (
                                            <div key={i} className="relative pl-6 border-l-2 border-gray-200 group">
                                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></div>
                                                <h4 className="text-xl font-bold flex items-center gap-3">
                                                    {project.title}
                                                </h4>
                                                <p className="text-gray-600 leading-relaxed mt-2">{project.description}</p>
                                                <div className="flex gap-4 mt-3">
                                                    {project.techStack && project.techStack.slice(0, 5).map((tech, j) => (
                                                        <span key={j} className="text-[10px] uppercase font-black text-teal-600 bg-teal-50 tracking-wider px-2 py-1 rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-12">
                            {/* Skills */}
                            <section>
                                <h3 className="text-xl font-black border-b-2 border-teal-500 inline-block mb-6 pb-1 uppercase tracking-wider">Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-bold border border-gray-200">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Languages or Other */}
                            <section>
                                <h3 className="text-xl font-black border-b-2 border-teal-500 inline-block mb-6 pb-1 uppercase tracking-wider">Contact Me</h3>
                                <p className="text-gray-600 text-sm mb-4">Feel free to reach out for collaborations or opportunities.</p>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="block text-center py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition shadow-lg shadow-teal-500/20"
                                >
                                    Email Me
                                </a>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ResumeViewer;
