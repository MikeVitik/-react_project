/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"SF UI Display"', '"sans"'],
    },
    extend: {
      gridTemplateColumns: {
        home: "1fr minmax(733px, 1fr)",
      },
      colors: {
        "light-green": "#A8B64F",
        green: "#899441",
        "light-red": "#DC3E22",
        red: "#B7280F",
        "light-gray": "#F4F4F4",
        gray: "#C4C4C4",
        text: "#333333",
        "light-text": "#999999",
      },
    },
  },
  plugins: [],
};
