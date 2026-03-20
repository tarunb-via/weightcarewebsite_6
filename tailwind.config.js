/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eefbf5',
          100: '#d6f5e4',
          200: '#b0eacb',
          300: '#7fd9aa',
          400: '#4fc487',
          500: '#2ea86a',
          600: '#1f8553',
          700: '#1b6944',
          800: '#185338',
          900: '#15442f'
        },
        accent: {
          50: '#fff8eb',
          100: '#ffefc7',
          200: '#ffe08a',
          300: '#ffcb4d',
          400: '#ffb81f',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        slatewarm: {
          50: '#f7f8f7',
          100: '#eef1ef',
          200: '#d9dfdb',
          300: '#b8c3bc',
          400: '#8d9d92',
          500: '#6b7d71',
          600: '#536257',
          700: '#434f46',
          800: '#353f38',
          900: '#242b26'
        }
      }
    },
  },
  plugins: [],
}
