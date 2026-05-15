/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sapphire: {
          900: '#001A33',
          800: '#00264D',
          700: '#003366', // Primary Sapphire Blue
          600: '#004080',
          500: '#004C99',
        },
        gold: {
          500: '#FBBF24', // Accent Gold
          400: '#FCD34D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
