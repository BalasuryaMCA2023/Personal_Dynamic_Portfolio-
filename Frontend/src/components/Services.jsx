import { useState, useEffect } from "react";
import axios from "../axiosRoute";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "./SEO";
import { FaPaperPlane, FaArrowRight } from "react-icons/fa";

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("/services");
                setServices(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <>
            <SEO 
                page="services" 
                title="Our Services | My Portfolio" 
                description="Professional services I offer, including web development, UI/UX design, and technical consulting."
            />

            <main className="min-h-screen bg-gray-950 text-white font-['Outfit'] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* ===== HEADER ===== */}
                    <div className="text-center mb-20">
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4"
                        >
                            Expertise
                        </motion.h2>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black leading-tight mb-6"
                        >
                            Professional{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                                Digital Services
                            </span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
                        >
                            Transforming ideas into exceptional digital experiences with cutting-edge technology and clean design.
                        </motion.p>
                    </div>

                    {/* ===== SERVICES GRID ===== */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 font-bold">Loading amazing services...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {services.map((service, index) => (
                                    <motion.div
                                        key={service._id}
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="relative group p-[1px] rounded-[2rem] bg-gradient-to-br from-teal-500/20 to-purple-600/20 hover:from-teal-500 hover:to-purple-600 transition-all duration-500"
                                    >
                                        <div className="bg-gray-900/90 backdrop-blur-3xl rounded-[2rem] p-8 h-full flex flex-col border border-white/5">
                                            
                                            {/* ICON */}
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-black transition-all duration-500">
                                                <i className={`${service.icon || 'fas fa-code'} text-3xl transition-transform`}></i>
                                            </div>

                                            <h3 className="text-2xl font-black mb-4 group-hover:text-teal-400 transition-colors">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                                                {service.description}
                                            </p>

                                            <div className="pt-6 border-t border-white/10 mt-auto">
                                                <Link 
                                                    to="/contact" 
                                                    className="inline-flex items-center gap-2 text-teal-400 font-bold group/btn"
                                                >
                                                    Get Started <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* ===== CALL TO ACTION ===== */}
                    {!loading && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-32 p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-teal-500/10 to-purple-600/10 border border-white/10 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full"></div>
                            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>
                            
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Need a custom solution?</h2>
                            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>
                            
                            <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-3 px-10 py-4 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:scale-105"
                            >
                                Start a Conversation <FaPaperPlane />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Services;