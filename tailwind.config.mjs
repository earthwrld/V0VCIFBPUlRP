/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      fontFamily: {
        cardo: ['Cardo', 'serif'],
      },
    },
  },
  plugins: [],
}