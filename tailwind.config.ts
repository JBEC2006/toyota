import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        toyota: {
          red:      '#EB0A1E',
          black:    '#0A0A0A',
          charcoal: '#1A1A1A',
          white:    '#FFFFFF',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 20px 2px rgba(235, 10, 30, 0.45)',
      },
    },
  },
  plugins: [],
}

export default config
