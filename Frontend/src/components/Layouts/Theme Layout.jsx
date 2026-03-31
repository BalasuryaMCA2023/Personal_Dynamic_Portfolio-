import { useTheme } from "@mui/material/styles";

const ThemeLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

export default ThemeLayout;
