/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all React components
    "./public/index.html"          // main HTML entry
  ],
  theme: {
    extend: {},                    // leave empty for now, you can add custom colors, fonts, etc.
  },
  plugins: [],
};
