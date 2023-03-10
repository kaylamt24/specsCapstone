/** @type {import('tailwindcss').Config} */





module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
  extend: {
  colors: {
  current: 'currentColor',
  hotpink: '#FF006E',
  limegreen: "#89FC00",
  navy: '#01295F',
  eggshell: "#E6EFE9",
  customgray: '#757780',
  lightblue: '#0017E1'
  }, 
  fontFamily: {
    inter:['Inter', "sans-serif"],
    quicksand:['Quicksand', 'sans-serif']
  }
  }
  },
  plugins: []
  }