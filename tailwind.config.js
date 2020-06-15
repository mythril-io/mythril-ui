const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    minHeight: {
     '0': '0',
     '1/4': '25vh',
     '1/2': '50vh',
     '3/4': '75vh',
     'full': '100vh',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#00D1B2',
        secondary: '#00c4a7',
        info: '#209CEE',
        warning: '#FFDD57',
        'warning-secondary': '#ffdb4a;',
        success: '#23D160',
        danger: '#f14668',
        'danger-secondary': '#FF3860'
      }
    }
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'first', 'hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'even'],
    margin: ['responsive', 'first'],
    width: ['responsive', 'group-hover']
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
