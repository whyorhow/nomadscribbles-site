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
      keyframes: {
        slideBounce: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '80%': { transform: 'translateY(-10px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideBounce: 'slideBounce 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
