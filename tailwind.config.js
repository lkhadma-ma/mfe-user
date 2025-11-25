/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'mfe-user-',
  content: ["./projects/user/src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        'max-424': { 'max': '424px' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

