/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tropical_indigo': {
          DEFAULT: '#9381ff',
          100: '#0b004d',
          200: '#170099',
          300: '#2200e6',
          400: '#5233ff',
          500: '#9381ff',
          600: '#a899ff',
          700: '#beb3ff',
          800: '#d4ccff',
          900: '#e9e5ff'
        },
        'periwinkle': {
          DEFAULT: '#b8b8ff',
          100: '#000058',
          200: '#0000af',
          300: '#0808ff',
          400: '#6060ff',
          500: '#b8b8ff',
          600: '#c6c6ff',
          700: '#d4d4ff',
          800: '#e2e2ff',
          900: '#f1f1ff'
        },
        'ghost_white': {
          DEFAULT: '#f8f7ff',
          100: '#0d0064',
          200: '#1b00c8',
          300: '#492dff',
          400: '#a091ff',
          500: '#f8f7ff',
          600: '#f8f7ff',
          700: '#faf9ff',
          800: '#fbfbff',
          900: '#fdfdff'
        },
        'antique_white': {
          DEFAULT: '#ffeedd',
          100: '#5f2f00',
          200: '#be5f00',
          300: '#ff8e1e',
          400: '#ffbe7c',
          500: '#ffeedd',
          600: '#fff1e2',
          700: '#fff4ea',
          800: '#fff8f1',
          900: '#fffbf8'
        },
        'apricot': {
          DEFAULT: '#ffd8be',
          100: '#592300',
          200: '#b14700',
          300: '#ff6d0b',
          400: '#ffa264',
          500: '#ffd8be',
          600: '#ffdfca',
          700: '#ffe7d7',
          800: '#ffefe4',
          900: '#fff7f2'
        }
      }
    },
  },
  plugins: [],
}
