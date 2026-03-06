const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1D4ED8',
        accent: '#9333EA',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      screens: {
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};