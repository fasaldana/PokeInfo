/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        backgd: "#d2d2d2",
        backSec: "#424242",
        primary: "#4dad5b",
        secondary: "#FFAD1F",
        accent: "#657786",
        titles: "#111928",
        success: "#17BF63",
        error: "#F12E2E",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
