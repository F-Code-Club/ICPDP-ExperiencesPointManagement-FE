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
    },
    text: {
      light: "#FFFFFF",
      secondary: "#F737373",
      dark: "#000000",
    },
    states: {
      success: "#00C851",
      warning: "#FFBB33",
      error: "#FF4444",
      info: "#33B5E5",
    },
  },
  typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
  }
});

export default theme;
