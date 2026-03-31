import {
  FaExternalLinkAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const getPlatformKey = (platform) => {
  if (!platform) return "other";

  return platform
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()]/g, ""); // remove spaces & brackets
};

export const getIconComponent = (platform) => {
  const key = getPlatformKey(platform);

  const map = {
    github: FaGithub,
    whatsapp: FaWhatsapp,
    telegram: FaTelegram,
    linkedin: FaLinkedin,
    twitter: FaXTwitter, 
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
    discord: FaDiscord,
    website: FaGlobe,
    other: FaExternalLinkAlt,
    stackoverflow: FaExternalLinkAlt,
    leetcode: FaExternalLinkAlt,
    hackerrank: FaExternalLinkAlt,
    startup: FaExternalLinkAlt,
    medium: FaExternalLinkAlt,
    dribbble: FaExternalLinkAlt,
    behance: FaExternalLinkAlt,
    twitch: FaExternalLinkAlt,
  };

  return map[key] || FaExternalLinkAlt;
};
