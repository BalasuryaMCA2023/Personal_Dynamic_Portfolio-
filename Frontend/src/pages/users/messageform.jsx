/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "../../axiosRoute";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../context/NotificationContext";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPen,
  FaCommentAlt,
  FaCheckCircle
} from "react-icons/fa";

const MessageForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { notify } = useNotification();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, email, content } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      notify("Please enter your name.", { type: "warning" });
      return false;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      notify("Please enter a valid email address.", { type: "warning" });
      return false;
    }
    if (!content.trim()) {
      notify("Please enter your message.", { type: "warning" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Direct submission to Admin Panel Backend to trigger real-time notifications
      await axios.post("http://localhost:3000/api/admin/messages/send", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", content: "" });
    } catch (error) {
      notify("Failed to send message!", { type: "error" });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>

      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600">
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8">

          <AnimatePresence mode="wait">

            {/* ================= SUCCESS SCREEN ================= */}
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <FaCheckCircle className="text-green-400 text-6xl mb-4" />
                <h2 className="text-2xl font-black mb-2">Message Sent!</h2>
                <p className="text-gray-400 mb-6">
                  Thank you for contacting me. I’ll reply very soon 🙂
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 text-black font-bold"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              /* ================= FORM ================= */
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
              >
                <h3 className="text-xl font-black mb-6">Send me a message 🚀</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative mb-6">
                  <FaPen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                {/* Message */}
                <div className="relative mb-8">
                  <FaCommentAlt className="absolute left-3 top-4 text-gray-400" />
                  <textarea
                    name="content"
                    rows="5"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-teal-400 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 text-black font-bold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </motion.form>
            )}

          </AnimatePresence>

        </div>
      </div>
    </>
  );
};

export default MessageForm;
