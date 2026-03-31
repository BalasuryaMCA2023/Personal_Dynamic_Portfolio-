/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../../axiosRoute";
import { motion } from "framer-motion";
import { getIconComponent } from "../../utills/platform_helper";
import { buildSocialLink } from "../../utills/url_helper";

const SocialLinks = ({ layout = "auto" }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("/socialmedia");
        setLinks(Array.isArray(response.data) ? response.data.filter(l => l.isActive) : []);
      } catch (error) {
        console.error("Failed to fetch social media links:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  if (loading) return null;
  if (!links.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`
        flex gap-4
        ${
          layout === "vertical" ? "flex-col" : 
          layout === "responsive" ? "flex-row md:flex-col" : 
          layout === "horizontal" ? "flex-row flex-nowrap shrink-0" : 
          "flex-row flex-wrap"
        }
        items-center
      `}
    >
      {links.map((link) => {
        const Icon = getIconComponent(link.platform);

        // ✅ ONE SINGLE SOURCE OF TRUTH FOR LINK
        const href = buildSocialLink(link);

        return (
          <a
            key={link._id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-xl bg-white/5 hover:bg-teal-500/20 border border-white/10 transition-all"
          >
            {/* ICON */}
            <Icon className="w-4 h-4 text-white group-hover:text-teal-400 transition-colors" />

            {/* TOOLTIP */}
            <span
              className="
                pointer-events-none
                absolute -top-9 left-1/2 -translate-x-1/2
                scale-0 group-hover:scale-100
                transition-transform
                bg-black text-white text-xs px-2 py-1 rounded
                whitespace-nowrap
                border border-white/10 
              "
            >
              {link.platform}
            </span>
          </a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
