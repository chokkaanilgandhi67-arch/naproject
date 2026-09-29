/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#070b19',
          850: '#0a1026',
          800: '#0f1738',
          700: '#1b2559',
        },
        cosmic: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          violet: '#7f00ff',
          neon: '#00f0ff',
          purple: '#b800e6',
          emerald: '#10b981',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        orbit: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'floating-sm': '0 10px 30px -10px rgba(0, 240, 255, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        'floating-md': '0 20px 40px -15px rgba(127, 0, 255, 0.25), 0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        'floating-lg': '0 25px 60px -15px rgba(0, 242, 254, 0.35), 0 35px 70px -15px rgba(0, 0, 0, 0.8)',
        'neon-cyan': '0 0 20px rgba(0, 242, 254, 0.4), inset 0 0 15px rgba(0, 242, 254, 0.1)',
        'neon-violet': '0 0 25px rgba(184, 0, 230, 0.4), inset 0 0 15px rgba(184, 0, 230, 0.1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'orbit-spin': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-0.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(0,242,254,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(127,0,255,0.7))' },
        }
      }
    },
  },
  plugins: [],
}
