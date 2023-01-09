/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns : {
        'autoFit' : 'repeat(auto-fit, minmax(230px, 1fr))'
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
