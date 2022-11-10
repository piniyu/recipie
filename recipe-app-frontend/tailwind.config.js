/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  important: '#app',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: colors.amber,
        secondary: '#171717',
        black: '#171717',
        white: colors.white,
        gray: colors.stone,

        yellow: colors.yellow,
        green: colors.teal,
        purple: colors.indigo,
        blue: colors.sky,
        red: colors.red,
        focus: {
          outline: 'var(--focus-outline-color)',
        },
      },
      animation: {
        'bounce-y-down': 'bounce-y-down 1s ease infinite',
        'bounce-y-up': 'bounce-y-up 1s ease infinite',
      },
      keyframes: {
        'bounce-y-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10%)' },
        },
        'bounce-y-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
