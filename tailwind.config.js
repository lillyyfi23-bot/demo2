/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: { ink: '#242238', muted: '#77758a', lilac: '#7866d9', blush: '#f7e9ee' }
    },
  },
  plugins: [],
}