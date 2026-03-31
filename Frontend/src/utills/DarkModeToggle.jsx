import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const ThemeToggle = () => {
  const { themeName, setThemeName } = useContext(ThemeContext);

  const toggleTheme = () => {
    setThemeName(prev =>
      prev === "light" ? "dark" : prev === "dark" ? "project" : "light"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 text-black"
      title="Change theme"
    >
      {themeName === "light" && "🌞"}
      {themeName === "dark" && "🌚"}
      {themeName === "project" && "🎨"}
    </button>
  );
};

export default ThemeToggle;
