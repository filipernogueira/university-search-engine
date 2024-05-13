const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#FBFBFB",
                primary: "#282828",
                secondary: "#AAAAAA",
            },
        },
    },
    plugins: [],
});
