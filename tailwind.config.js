/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      'condensed': ['Roboto Condensed', 'sans-serif'],
    },
    screens: {
      lg1: "1536px", // Custom large 1 screen size
      lg: "1280px", // Custom large screen size
      md1: "1024px", // Custom medium 1 screen size
      md: "768px", // Custom medium screen size
      sm: "640px", // Custom small screen size
      xsm: "455px", // Custom extra-small screen size
      xxsm: "0px", // Custom extra-extra-small screen size
    },
  },
  },
  plugins: [],
}