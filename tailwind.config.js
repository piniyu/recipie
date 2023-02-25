/** @type {import('tailwindcss').Config} */
// @ts-ignore
const colors = require('tailwindcss/colors')
module.exports = {
  important: true,
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // backgroundColor: ['dark'],
      // textColor: ['dark'],
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: colors.amber['400'],
          dark: '#916e12',
        },
        secondary: { DEFAULT: '#171717', dark: colors.neutral['100'] },
        black: '#171717',
        white: colors.white,
        'dark-gray': '#333333',
        gray: colors.neutral,

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
