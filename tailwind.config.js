/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { brand: '#48aab7' },
      boxShadow: { 'soft': '0 10px 30px -10px rgba(0,0,0,0.2)' }
    }
  },
  plugins: []
}
