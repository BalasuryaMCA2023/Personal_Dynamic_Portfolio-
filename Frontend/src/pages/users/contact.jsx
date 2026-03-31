/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import MessageForm from "../users/messageform";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaBriefcase } from "react-icons/fa";
import SEO from "../../components/SEO";
import { useSiteConfig } from "../../context/SiteConfigContext";
import TypingHeading from "../../utills/TypingHeading";
import axios from "../../axiosRoute";
import SocialLinks from "../../pages/users/SocialMedia";

function Contact({ openResumeModal }) {
  const { contactEmail } = useSiteConfig();
  const [homeData, setHomeData] = useState({});
  const [contactData, setContactData] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, contactRes] = await Promise.all([
          axios.get("/home"),
          axios.get("/contact")
        ]);
        setHomeData(homeRes.data || {});
        setContactData(contactRes.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Use dynamic data or fallbacks
  const displayEmail = contactData?.email || contactEmail || "balasuryasuryabs@gmail.com";
  const displayPhone = contactData?.phone || "+91 9629606177";
  const displayAddress = contactData?.address || "Coimbatore, Tamil Nadu, India";
  const availability = contactData?.availability || "Open to Work";

  const whatsappNumber = contactData?.whatsappNumber || "919629606177";
  const whatsappMsgText = contactData?.whatsappMessage || "Hi Bala, I saw your portfolio and I want to contact you!";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsgText)}`;

  // Availability Color Logic
  const getAvailabilityColor = (status) => {
    switch (status) {
      case "Open to Work": return "text-green-400";
      case "Busy": return "text-red-400";
      case "Holiday": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };


  return (
    <>
      <SEO
        page="contact"
        title="Contact Me | My Portfolio"
        description="Get in touch with me for collaborations or inquiries."
      />

      <main className="relative w-full min-h-screen bg-gray-950 text-white overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 min-h-[60vh]">

          <h2 className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">
            Contact
          </h2>

          {/* ================= HEADER ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-16">

            {/* LEFT SIDE - Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Get In Touch
            </h1>

            {/* RIGHT SIDE - DOWNLOAD CV BUTTON */}
            <button
              onClick={openResumeModal}
              className="group relative p-[2px] rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:scale-105 transition-transform duration-300"
            >
              <span className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-950 text-white font-black backdrop-blur-md group-hover:bg-gray-900 transition-all">
                Download CV
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
            </button>

          </div>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600">
                <div className="bg-gray-900 rounded-2xl p-6 md:p-8">

                  <h3 className="text-xl font-black mb-6 flex justify-between items-center">
                    Let's Connect
                    {contactData?.availability && (
                      <span className={`text-sm font-bold px-3 py-1 rounded-full border border-gray-700 bg-gray-800 ${getAvailabilityColor(availability)}`}>
                        {availability}
                      </span>
                    )}
                  </h3>

                  <div className="flex flex-col gap-6">

                    <div className="flex items-center gap-4">
                      <FaEnvelope className="text-teal-400 text-xl" />
                      <span>{displayEmail}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaPhoneAlt className="text-teal-400 text-xl" />
                      <span>{displayPhone}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaMapMarkerAlt className="text-teal-400 text-xl" />
                      <span>{displayAddress}</span>
                    </div>

                    <div className="mt-6">
                      <SocialLinks position="start" />
                    </div>

                    {/* EMAIL BUTTONS */}
                    <div className="flex flex-wrap gap-4 mt-6">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${displayEmail}&su=${encodeURIComponent('Collaboration/Inquiry')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold w-fit"
                      >
                        <FaEnvelope className="text-xl" />
                        Send via Gmail
                      </a>

                    

                    {/* WHATSAPP BUTTON */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold w-fit"
                    >
                      <FaWhatsapp className="text-xl" />
                      Chat on WhatsApp
                    </a>

                    </div>

                  </div>

                </div>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <MessageForm />
            </motion.div>

          </div>

        </div>
      </main>
    </>
  );
}

export default Contact;
