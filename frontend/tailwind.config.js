/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e6f0fe',
          200: '#b0c4de',
          300: '#8fb3d8',
          400: '#5e8fc4',
          500: '#2d6faf',
          600: '#1f55a8',
          700: '#1b478f',
          800: '#163878',
          900: '#0f2859',
          DEFAULT: '#B0C4DE',
        },
        secondary: {
          50: '#fff9f8',
          100: '#fff3f0',
          200: '#ffb7b2',
          300: '#ff9d96',
          400: '#ff6b5f',
          500: '#ff3928',
          600: '#f52d1f',
          700: '#cc2618',
          800: '#a31f12',
          900: '#6b140a',
          DEFAULT: '#FFB7B2',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundColor: {
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
      },
    },
  },
  plugins: [],
}
