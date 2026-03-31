import React from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import customTheme from "./customTheme";

// Safe creation of context with a default value using React.prefix 
export const ThemeContext = React.createContext({
  themeName: 'light',
  setThemeName: () => {}
});

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = React.useState("light");

  const theme = React.useMemo(() => {
    const { palette, ...otherThemeProps } = customTheme;

    if (themeName === "dark") {
      return createTheme({
        ...otherThemeProps,
        palette: {
          ...palette,
          mode: "dark",
          background: {
            default: "#020617",
            paper: "#020617",
          },
          text: {
            primary: "#ffffff",
            secondary: "#94a3b8",
          },
        },
      });
    }

    if (themeName === "project") {
      return createTheme({
        ...otherThemeProps,
        palette: {
          ...palette,
          mode: "light",
          background: {
            default: "#020617",
            paper: "#020617",
          },
          primary: {
            main: "#8b5cf6",
            contrastText: "#ffffff",
          },
          text: {
            primary: "#ffffff",
            secondary: "#c4b5fd",
          },
        },
      });
    }

    // 🌞 LIGHT (default)
    return createTheme({
      ...otherThemeProps,
      palette: {
        ...palette,
        mode: "light",
        background: {
          default: "#ffffff",
          paper: "#ffffff",
        },
        text: {
          primary: "#020617",
          secondary: "#475569",
        },
      },
    });
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
