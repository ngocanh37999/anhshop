/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      keyframes: {
        textAnimationKeyframesCustomOne: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '400%' }
        }
      },
      animation: {
        textAnimationCustomOne: 'textAnimationKeyframesCustomOne 10s linear infinite'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        },
        '.textAnimationOne': {
          background: 'linear-gradient(90deg, #ff0000, #ffff00, #ff00f3, #0033ff, #ff00c4, #ff0000)',
          backgroundSize: '400%',
          fontSize: '27px',
          fontWeight: '600',
          wordSpacing: '5px',
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text'
          // dùng như sau: className='textAnimationOne animate-textAnimationCustomOne'
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
