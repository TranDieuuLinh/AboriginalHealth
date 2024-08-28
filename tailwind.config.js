/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridColumn: {
        'span-2': 'span 2 / span 2',
      },
    },
  },
  plugins: [],
}

