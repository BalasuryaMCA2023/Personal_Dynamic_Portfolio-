/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables manual dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: '#8b5cf6', // Indigo/Purple
        secondary: '#ec4899', // Pink
      }
    },
  },
  plugins: [],
}

