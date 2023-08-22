/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  theme: {
    extend: {},
    screens: {
      sm: '375px',
      md: '480px',
      lg: '768px'
    },
    color: {
      desaturatedDarkCyan: 'hsl(180, 29%, 50%)',
      lightGreyishCyanBg: 'hsl(180, 52%, 96%)',
      lightGrayishCyanFilter: 'hsl(180, 31%, 95%)',
      darkGrayishCyan: 'hsl(180, 8%, 52%)',
      veryDarkGrayishCyan: 'hsl(180, 14%, 20%)'
    },
    fontFamily: {
      sans: ['League Spartan', "sans-serif"]
    }
  },
  plugins: [],
}

