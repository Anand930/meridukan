/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "custom1":"rgb(238,174,202)"
      }
    },
  },
  plugins: [require('daisyui')],
}