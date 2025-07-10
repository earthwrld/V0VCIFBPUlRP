/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  
  // FIX: Daftarkan class yang dibuat oleh JS agar tidak dihapus saat build
  safelist: [
    'slider-button',
    'slider-button-left',
    'slider-button-right'
  ],

  theme: {
    extend: {
      fontFamily: {
        cardo: ['Cardo', 'serif'],
      },
      // FIX: Daftarkan animasi kustom Anda di sini
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.3)', opacity: '0.6' },
        }
      },
      // FIX: Terapkan animasi tersebut ke class utility
      animation: {
        blink: 'blink 1s step-start infinite',
        'pulse-slow-1': 'pulseScale 6s ease-in-out infinite',
        'pulse-slow-2': 'pulseScale 6s ease-in-out infinite 2s',
        'pulse-slow-3': 'pulseScale 6s ease-in-out infinite 4s',
      }
    },
  },
  plugins: [],
}