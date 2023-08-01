/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      text: {
        DEFAULT: '#FFFFFF',
        primary: '#D1D1D1',
        secondary: '#868686',
      },
      primary: {
        DEFAULT: '#242424',
        dark: '#333333',
        light: '#494949',
      },
      accent: {
        DEFAULT: '#DCEDF3',
      },
      error: {
        DEFAULT: '#F7AC85',
      },
      warning: {
        DEFAULT: '#FFE9B3',
      },
      success: {
        DEFAULT: '#EDFEBE',
      }
    },
  },
  plugins: [],
}

