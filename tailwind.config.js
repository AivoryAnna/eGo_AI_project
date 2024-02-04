/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': {'min': '200px', 'max': '575px'},
      'md': {'min': '576px', 'max': '959px'},
      'lg': {'min': '960px', 'max': '1439px'},
      'xl': {'min': '1440px'},
    },
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
    },
    colors: {
      'custom-blue': '#1ea7fd',
      'light-blue': "#d3eaf2",
      'light-gray': '#909191',
      'main': '#FBFBF8',
      'btn-background': '#C3A27A',
      'font': '#222222',
    }
  },
  plugins: [],
}


