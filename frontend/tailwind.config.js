/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617', // Background
          900: '#0f172a', // Cards
          800: '#1e293b', // Borders
        },
        emerald: {
          500: '#10b981', // Neon Green
        }
      }
    },
  },
  plugins: [],
}