/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        myblue: "#009DFF",
        myblack: "#2A2A2A",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "#83C4FF",
        brown:  '#8B4513',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        'nav-sm': '50px',
        'nav-md': '100px',
        'nav-lg': '150px',
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};