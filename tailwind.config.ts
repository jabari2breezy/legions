import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'fluid-ease': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'spring-ease': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      colors: {
        'glass-base': 'rgba(255,255,255,0.05)',
        'glass-base-hover': 'rgba(255,255,255,0.08)',
        'glass-border': 'rgba(255,255,255,0.15)',
        'glass-border-strong': 'rgba(255,255,255,0.28)',
        'cyan-glow': '#00F0FF',
        'blue-deep': '#0A84FF',
        'ink-void': '#050507',
        'text-primary': 'rgba(255,255,255,0.96)',
        'text-secondary': 'rgba(255,255,255,0.62)',
        'text-tertiary': 'rgba(255,255,255,0.38)',
      },
      fontSize: {
        hero: 'clamp(2.5rem, 8vw, 4rem)',
        display: 'clamp(2rem, 6vw, 3.5rem)',
        h2: 'clamp(1.5rem, 4vw, 2.5rem)',
        'body-lg': 'clamp(1rem, 1.2vw, 1.25rem)',
      },
      boxShadow: {
        'glass-inset':
          'inset 0 1px 1px rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.5)',
        'glass-deep': '0 16px 64px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        card: '28px',
      },
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
