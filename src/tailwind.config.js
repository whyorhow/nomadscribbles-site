/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'art-gallery': "url('/images/ArtGalleryBackground.jpg')",
        'carnival': "url('/images/CarnivalBackground.jpg')",
        'murals': "url('/images/muralbackground.jpg')",
        'parks': "url('/images/ParkBackdrop.jpg')",
        'beach': "url('/images/beach.jpg')",
         "brazil-tiles": "url('/images/BrazilFlag2.jpg')",
      },
    },
  },
  plugins: [],
}
