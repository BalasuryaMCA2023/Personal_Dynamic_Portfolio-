import React, { useState, useEffect } from "react";

const TypingHeading = ({
  text = "",
  typingSpeed = 100,
  deletingSpeed = 200,
  delay = 5000, // delay after typing and before deleting
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);

  const rolesArray = Array.isArray(text) ? text : [text || " "];
  const safeText = rolesArray[roleIndex] || " ";
  const characters = safeText.split("");

  // Effect to control typing and deleting behavior
  useEffect(() => {
    let timeout;
    if (!isDeleting && currentIndex < characters.length) {
      timeout = setTimeout(() => setCurrentIndex((prev) => prev + 1), typingSpeed);
    } else if (currentIndex === characters.length && !isDeleting) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentIndex > 0) {
      timeout = setTimeout(() => setCurrentIndex((prev) => prev - 1), deletingSpeed);
    } else if (isDeleting && currentIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % rolesArray.length);
      }, rolesArray.length > 1 ? delay / 5 : delay); // shorter pause between words
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, characters.length, typingSpeed, deletingSpeed, delay, rolesArray.length]);

  // Toggle cursor visibility
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-block min-h-[1.2em] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium leading-normal">
      {characters.slice(0, currentIndex).map((char, index) => (
        <span
          key={index}
          className="text-white drop-shadow-md"
        >
          {char}
        </span>
      ))}

      {/* Blinking cursor */}
      <span className={`inline-block w-1 h-[1em] bg-purple-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
    </span>
  );
};

export default TypingHeading;
