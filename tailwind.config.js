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
      height: {
        '90': '90%'
      },
      width: {
        '90': '90%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.timer-shadow': {
          boxShadow: '-50px -50px 100px #272C5A, 50px 50px 100px #121530'
        },
        '.stroke-round': {
          strokeLinecap: 'round'
        }
      }, [])
    })
  ],
}
