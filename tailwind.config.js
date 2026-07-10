/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF8F5',
          dark: '#F3EFEA',
          light: '#FCFBF9',
        },
        champagne: {
          DEFAULT: '#F4EFE6',
          light: '#FDFBF7',
          dark: '#EBE2D3',
        },
        gold: {
          DEFAULT: '#C5A880',
          dark: '#B09066',
          light: '#D6C0A3',
        },
        charcoal: {
          DEFAULT: '#1F2421',
          light: '#3A423D',
          dark: '#111412',
        },
        stone: {
          DEFAULT: '#E6DFD5',
          light: '#FAF8F5',
          dark: '#C8BCAC',
        },
        beige: {
          DEFAULT: '#F7F4EF',
          light: '#FCFAF7',
          dark: '#EDE7DC',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-out': 'fadeOut 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'line-draw': 'lineDraw 2s cubic-bezier(0.85, 0, 0.15, 1) forwards',
        'scale-up': 'scaleUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        lineDraw: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
