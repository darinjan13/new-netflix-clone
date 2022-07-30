const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'bgImage': "url('/public/background.jpg')"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}