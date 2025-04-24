/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        }
      },
      keyframes: {
        'smoke-1': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: 0 },
          '50%': { transform: 'translate(-10px, -20px) scale(1.2)', opacity: 0.3 },
          '100%': { transform: 'translate(-20px, -40px) scale(1.4)', opacity: 0 }
        },
        'smoke-2': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: 0 },
          '50%': { transform: 'translate(0, -30px) scale(1.3)', opacity: 0.3 },
          '100%': { transform: 'translate(10px, -50px) scale(1.5)', opacity: 0 }
        },
        'smoke-3': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: 0 },
          '50%': { transform: 'translate(10px, -25px) scale(1.2)', opacity: 0.3 },
          '100%': { transform: 'translate(20px, -45px) scale(1.4)', opacity: 0 }
        }
      },
      animation: {
        'smoke-1': 'smoke-1 3s ease-out infinite',
        'smoke-2': 'smoke-2 3.5s ease-out infinite 0.5s',
        'smoke-3': 'smoke-3 3s ease-out infinite 1s'
      },
      screens: {
        'xs': '480px', // Extra small screens
      }
    }
  },
  plugins: []
};