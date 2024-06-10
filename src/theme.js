import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F27227",
      50: "#FCE3D4",
      100: "#FAC7A9",
      200: "#F7AA7D",
      300: "#F69C68",
      400: "#F3803D",
      500: "#DA6723",
      600: "#C25B1F",
      700: "#A9501B",
      800: "#914417",
      900: "#793914",
    },
    secondary: {
      main: "#262525",
      light: "#F9F9F9",
    },
    text: {
      light: "#FFFFFF",
      secondary: "#737373",
      dark: "#000000",
      neutral: "#EAEAEA"
    },
    state: {
      success: "#00C851",
      export: "#3A9E29",
      warning: "#FF5858",
      error: "#FF4444",
      info: "#33B5E5",
    },
    backgroundImage: {
      'bg-sidebar': 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(252,227,212,1) 59%, rgba(247,170,125,1) 100%)',
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});

export default theme;
