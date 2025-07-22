/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ksb-green': '#2D5016',
        'ksb-light-green': '#4A7C28',
        'ksb-yellow': '#F7DC6F',
        'ksb-brown': '#8B4513',
      }
    },
  },
  plugins: [],
}