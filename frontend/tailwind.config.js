const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000000', // Example primary color (coral)
        secondary: '#000000', // Example secondary color (gray)
      },
    },
  },
  plugins: [],
})