/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px',
        xxxl: '1600px',
        xl4: '1800px',
      },
      colors: {
        'theme-color': '#849826',
        'theme-light': '#96ab2e',
        'theme-lighter': '#a8bd42',
        'theme-dark': '#6d7f1e',
        'theme-darker': '#566617',
        'theme-muted': '#949d50',
        'header-color': '#1C1C1C',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}