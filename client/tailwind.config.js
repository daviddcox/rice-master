/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#D2E0FB",
      "secondary": "#FEF9D9",
      "gray": {
        50: "#f3f6ef",
        100: "#dee5d4",
        200: "#cdd8be",
        300: "#adbf97",
        400: "#8fa675",
        500: "#728a58",
        600: "#586d43",
        700: "#455536",
        800: "#39452f",
        900: "#333c2b",
        950: "#191f14",
      },
      "dark_blue": "#8EACCD",
    },
    extend: {},
  },
  plugins: [],
}

