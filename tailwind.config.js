/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F27227",
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
        neutral: "#EAEAEA",
        secondary: "#262525",
        "light-text-color": "#FFFFFF",
        "second-text-color": "#737373",
        "dark-text-color": "#000000",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};
