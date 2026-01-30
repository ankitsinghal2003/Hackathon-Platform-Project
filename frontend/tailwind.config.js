/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            100: '#e0e7ff',
            300: '#a5b4fc',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            900: '#312e81',
          },
          secondary: {
            600: '#9333ea',
          },
        },
        fontFamily: {
          display: ['system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  