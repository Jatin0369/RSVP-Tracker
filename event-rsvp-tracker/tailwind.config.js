/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fancy: ['Great Vibes', 'cursive'], // Add custom font
      },
      colors: {
        'rose-gold': '#b76e79',  // Rose gold color
        'gold': '#ffd700',  // Gold color
      },
    },
  },
  plugins: [],
};


