/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"SF UI Display"', '"sans"'],
    },
    extend: {
      colors: {
        "nav-item": "#DC3E22",
        "focused-nav-item": "#B7280F",
      },
    },
  },
  plugins: [],
};
