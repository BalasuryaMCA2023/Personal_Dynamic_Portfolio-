import React from 'react';
import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';
import MessageForm from '../pages/users/messageform';
import SEO from '../components/SEO';

const MaintenancePage = () => {
    return (
        <>
            <SEO
                title="Maintenance | Under Construction"
                description="The site is currently under maintenance. We will be back shortly."
            />
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">

                {/* Animated Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >

                    {/* Left Side: Message & Image */}
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-6">
                                {/* Placeholder Icon if image missing, or use user image if provided */}
                                <FaTools className="text-4xl text-yellow-500 animate-pulse" />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                Under <span className="text-yellow-500">Construction</span>
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We're currently making some improvements to our website.
                                We'll be back shortly! You can still reach us using the form.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-gray-800/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-semibold text-white mb-4">Contact Admin</h3>
                            <MessageForm />
                        </div>
                    </motion.div>

                </motion.div>

                {/* Footer info */}
                <div className="absolute bottom-6 text-center text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
                </div>
            </div>
        </>
    );
};

export default MaintenancePage;
