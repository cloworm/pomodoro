/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Kumbh Sans', 'sans-serif'],
      'serif': ['Roboto Slab', 'serif'],
      'mono': ['Space Mono', 'monospace']
    },
    letterSpacing: {
      normal: '0',
      wide: '1px',
      wider: '5px',
      widest: '15px'
    },
    extend: {
      colors: {
        theme_red: '#F87070',
        theme_green: '#70F3F8',
        theme_purple: '#D881F8',
        theme_lightPurpleGray: '#D7E0FF',
        theme_darkBlue: '#1E213F',
        theme_darkBlue2: '#161932',
        theme_gray: '#EFF1FA',
      },
      fontSize: {
        '80px': '80px'
      },
      height: {
        '90': '90%',
        '300px': '300px',
        '410px': '410px'
      },
      width: {
        '30': '7.5rem',
        '90': '90%',
        '105px': '105px',
        '300px': '300px',
        '410px': '410px'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      outline: ['hover', 'active']
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.timer-shadow': {
          boxShadow: '-50px -50px 100px #272C5A, 50px 50px 100px #121530'
        },
        '.stroke-round': {
          strokeLinecap: 'round'
        },
        '.option-outline': {
          boxShadow: '0 0 0 1px #EFF1FA'
        }
      }, ['hover'])
    })
  ],
}
