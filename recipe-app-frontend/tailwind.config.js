/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  important: '#app',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: colors.stone,
      orange: colors.amber,
      yellow: colors.yellow,
      green: colors.emerald,
      purple: colors.purple,
      blue: colors.blue,
      red: colors.red,
      black: '#402410',
      focus: {
        outline: 'var(--focus-outline-color)',
      },
    },
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
