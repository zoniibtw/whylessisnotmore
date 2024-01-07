/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'strong-purple': '#AF979E',
      'light-purple': '#F4EAE6',

      'strong-blue': '#2C6481',
      'light-blue': '#D8E1E4',

      'strong-gold': '#AFA16E',
      'light-gold': '#F4E9CB',

      'strong-pink': '#D0948C',
      'light-pink': '#FAEEED',

      'black': '#222',
      'white': '#fff',
    },
    fontFamily: {
      gothic: ['franklin-gothic-atf', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}