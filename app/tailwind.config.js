/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0a1a2f", // Dark Blue for background and buttons
        lightBrown: "#d6b38a", // Light Brown for buttons and accents
      },
    },
  },
  plugins: [],
};
