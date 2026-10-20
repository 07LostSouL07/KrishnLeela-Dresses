/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        ams: ['"oeinakla paI oI Fsa"', '"AMS Prashant"', '"Ams Tushar"', 'serif'],
      },
      colors: {
        luxury: {
          gold: '#C5A880',
          'gold-light': '#E5D5C0',
          'gold-dark': '#9A7B4F',
          champagne: '#F8F5F0',
          sand: '#EDE8E1',
          obsidian: '#0C0C0E',
          charcoal: '#141417',
          card: '#18181D',
          border: '#272730',
        }
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

