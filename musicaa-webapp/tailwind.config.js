/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a0a",
          primary: "#181818",
          secondary: "#212121",
          accent: "#535353",
          text: "#b3b3b3",
        },
        green: {
          500: "#1db954",
        },
      },
    },
  },
  plugins: [],
};