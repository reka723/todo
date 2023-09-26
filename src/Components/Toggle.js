import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

export const DarkModeToggle = ({ isDark, setIsDark }) => {
  return (
    <IconButton onClick={() => setIsDark((old) => !old)}>
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
