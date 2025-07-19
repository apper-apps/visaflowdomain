/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        secondary: '#00875A',
        accent: '#FF5630',
        surface: '#FFFFFF',
        background: '#F4F5F7',
        success: '#00875A',
        warning: '#FFAB00',
        error: '#DE350B',
        info: '#0065FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}