/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '480px', // Définir la taille minimale pour xs (par exemple, 480px)
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

