/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0B0E',
        surface: '#15171C',
        surface2: '#1D2026',
        surface3: '#262A32',
        line: '#272A31',
        line2: '#33373F',
        ink: '#F5F5F7',
        muted: '#9497A3',
        faint: '#5E6270',
        accent: '#7C5CFC',
        accentSoft: '#A78BFA',
        accent2: '#C8FF4D',
        danger: '#FF5470',
        gold: '#F2C879'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      borderRadius: {
        xl2: '18px',
        card: '22px',
        sheet: '28px',
        pill: '999px'
      },
      boxShadow: {
        soft: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.55)',
        glow: '0 0 0 1px rgba(124,92,252,0.35), 0 8px 28px -8px rgba(124,92,252,0.45)',
        lift: '0 16px 40px -16px rgba(0,0,0,0.6)'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        sheetUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        popIn: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '60%': { opacity: 1, transform: 'scale(1.06)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        floatGlow: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-2%, 3%) scale(1.05)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.35s ease-out both',
        fadeInUp: 'fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        scaleIn: 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        sheetUp: 'sheetUp 0.32s cubic-bezier(0.16,1,0.3,1) both',
        popIn: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        floatGlow: 'floatGlow 8s ease-in-out infinite'
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16,1,0.3,1)'
      }
    }
  },
  plugins: []
}
