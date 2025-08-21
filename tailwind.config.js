/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        custom: '3px 3px 8px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const shadows = theme('textShadow')
      const utilities = Object.entries(shadows).map(([key, value]) => {
        return [`.text-shadow-${key}`, { textShadow: value }]
      })
      addUtilities(Object.fromEntries(utilities))
    }
  ]
}
