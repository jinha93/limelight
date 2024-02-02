/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        'full': '100%',
        '1/2': '50%',
        '3/4': '66.666667%;',
        full: '100%',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
