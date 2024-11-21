/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jjjWhite: "#FCFCFC",
        jjjBlue: "#628395",
        jjjBlack: "#07090F",
        jjjGreen: "#AAA95A",
        jjjYellow: "#FFBE0B",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
