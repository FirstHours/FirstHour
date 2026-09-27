/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          sage: '#8B9A6E',
          cream: '#F7F2EB',
          sand: '#EAE2D6',
          grey: '#EEEEEE',
        },
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated: 'var(--bg-elevated)',
          grey: 'var(--bg-grey)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
          warm: 'var(--accent-warm)',
          olive: 'var(--accent-olive)',
          tint: 'var(--accent-tint)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          subtle: 'var(--border-subtle)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 24px -2px rgba(28, 34, 22, 0.06), 0 0 0 1px rgba(139, 154, 110, 0.18)',
        'glow-accent': '0 0 35px rgba(139, 154, 110, 0.25)',
        'soft': '0 8px 30px rgba(28, 34, 22, 0.08)',
      }
    },
  },
  plugins: [],
}
